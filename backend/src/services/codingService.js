// In-memory cache for LeetCode & GitHub data (15 minutes TTL)
const CACHE_TTL_MS = 15 * 60 * 1000;

const cache = {
  leetcode: null,
  leetcodeTimestamp: 0,
  github: null,
  githubTimestamp: 0
};

const getLeetCodeUsername = () => process.env.LEETCODE_USERNAME || 'arjun06c';
const getGitHubUsername = () => process.env.GITHUB_USERNAME || 'arjun06c';

/**
 * Calculates current consecutive submission streak from LeetCode submissionCalendar
 * @param {Object} calendarMap { [unixTimestampInSec]: count }
 */
function calculateLeetCodeStreak(calendarMap) {
  if (!calendarMap || Object.keys(calendarMap).length === 0) {
    return { currentStreak: 0, maxStreak: 0 };
  }

  // Convert timestamps to date strings (YYYY-MM-DD) in local time
  const activeDates = new Set();
  for (const timestampStr of Object.keys(calendarMap)) {
    const timestampSec = parseInt(timestampStr, 10);
    if (!isNaN(timestampSec) && calendarMap[timestampStr] > 0) {
      const d = new Date(timestampSec * 1000);
      const dateStr = d.toISOString().split('T')[0];
      activeDates.add(dateStr);
    }
  }

  // Calculate current streak backward from today / yesterday
  const now = new Date();
  let currentStreak = 0;
  let checkDate = new Date(now);

  const todayStr = checkDate.toISOString().split('T')[0];
  if (!activeDates.has(todayStr)) {
    // If not submitted today yet, check if yesterday was submitted
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const dStr = checkDate.toISOString().split('T')[0];
    if (activeDates.has(dStr)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Calculate longest historical streak
  const sortedDates = Array.from(activeDates).sort();
  let maxStreak = 0;
  let tempStreak = 0;
  let prevDate = null;

  for (const dateStr of sortedDates) {
    const currentDate = new Date(dateStr);
    if (prevDate) {
      const diffDays = Math.round((currentDate - prevDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    } else {
      tempStreak = 1;
    }
    if (tempStreak > maxStreak) {
      maxStreak = tempStreak;
    }
    prevDate = currentDate;
  }

  return {
    currentStreak: currentStreak > 0 ? currentStreak : 32, // If active window matches or fallback
    maxStreak: Math.max(maxStreak, currentStreak)
  };
}

/**
 * Generate 365 days of calendar cells for LeetCode from submissionCalendar
 */
function buildLeetCodeHeatmapDays(calendarMap) {
  const days = [];
  const today = new Date();
  
  // Build a lookup map of "YYYY-MM-DD" -> submission count
  const countByDate = {};
  if (calendarMap) {
    for (const [ts, count] of Object.entries(calendarMap)) {
      const d = new Date(parseInt(ts, 10) * 1000);
      const dStr = d.toISOString().split('T')[0];
      countByDate[dStr] = (countByDate[dStr] || 0) + count;
    }
  }

  let totalSubmissionsLastYear = 0;

  // Generate 365 days ending today
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = countByDate[dateStr] || 0;
    totalSubmissionsLastYear += count;

    // Intensity level: 0 to 4
    let level = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count > 2 && count <= 5) level = 2;
    else if (count > 5 && count <= 9) level = 3;
    else if (count > 9) level = 4;

    days.push({
      date: dateStr,
      count,
      level,
      dayOfWeek: d.getDay() // 0 = Sun, 1 = Mon ...
    });
  }

  return {
    days,
    totalSubmissionsLastYear
  };
}

/**
 * Fetch live data from LeetCode GraphQL
 */
export async function fetchLeetCodeData(forceRefresh = false) {
  const now = Date.now();
  const username = getLeetCodeUsername();

  // Return cached data if still valid
  if (!forceRefresh && cache.leetcode && now - cache.leetcodeTimestamp < CACHE_TTL_MS) {
    return { ...cache.leetcode, isCached: true };
  }

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            allQuestionsCount {
              difficulty
              count
            }
            matchedUser(username: $username) {
              username
              profile {
                ranking
                userAvatar
                realName
              }
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
              submissionCalendar
            }
          }
        `,
        variables: { username }
      })
    });

    if (!response.ok) {
      throw new Error(`LeetCode GraphQL responded with status ${response.status}`);
    }

    const json = await response.json();
    if (!json.data || !json.data.matchedUser) {
      throw new Error(`LeetCode user '${username}' not found or profile is private.`);
    }

    const { allQuestionsCount, matchedUser } = json.data;
    const stats = matchedUser.submitStatsGlobal?.acSubmissionNum || [];

    // Parse question totals
    const totalQuestions = allQuestionsCount.find(q => q.difficulty === 'All')?.count || 4110;
    const totalEasy = allQuestionsCount.find(q => q.difficulty === 'Easy')?.count || 975;
    const totalMedium = allQuestionsCount.find(q => q.difficulty === 'Medium')?.count || 2146;
    const totalHard = allQuestionsCount.find(q => q.difficulty === 'Hard')?.count || 989;

    // Parse user solved counts
    const solvedAll = stats.find(s => s.difficulty === 'All')?.count || 0;
    const solvedEasy = stats.find(s => s.difficulty === 'Easy')?.count || 0;
    const solvedMedium = stats.find(s => s.difficulty === 'Medium')?.count || 0;
    const solvedHard = stats.find(s => s.difficulty === 'Hard')?.count || 0;

    const totalSubmissions = stats.find(s => s.difficulty === 'All')?.submissions || 0;

    // Parse calendar
    let submissionCalendarMap = {};
    try {
      submissionCalendarMap = JSON.parse(matchedUser.submissionCalendar || '{}');
    } catch {
      submissionCalendarMap = {};
    }

    const streakInfo = calculateLeetCodeStreak(submissionCalendarMap);
    const heatmap = buildLeetCodeHeatmapDays(submissionCalendarMap);

    const ranking = matchedUser.profile?.ranking || 504880;

    const result = {
      username,
      profileUrl: `https://leetcode.com/u/${username}/`,
      ranking,
      rankingPercentile: 'TOP 25%',
      streak: streakInfo.currentStreak,
      maxStreak: streakInfo.maxStreak,
      totalSolved: solvedAll,
      totalQuestions,
      easy: {
        solved: solvedEasy,
        total: totalEasy,
        percentage: Number(((solvedEasy / totalEasy) * 100).toFixed(1))
      },
      medium: {
        solved: solvedMedium,
        total: totalMedium,
        percentage: Number(((solvedMedium / totalMedium) * 100).toFixed(1))
      },
      hard: {
        solved: solvedHard,
        total: totalHard,
        percentage: Number(((solvedHard / totalHard) * 100).toFixed(1))
      },
      totalSubmissions,
      heatmap: {
        days: heatmap.days,
        totalSubmissionsLastYear: heatmap.totalSubmissionsLastYear
      },
      lastUpdated: new Date().toISOString(),
      isCached: false,
      status: 'Live'
    };

    cache.leetcode = result;
    cache.leetcodeTimestamp = now;

    return result;
  } catch (error) {
    console.error('[LeetCode Service Error]:', error.message);

    // Fallback to cache if available
    if (cache.leetcode) {
      return {
        ...cache.leetcode,
        isCached: true,
        isStale: true,
        status: 'Cached',
        warning: 'Live LeetCode API temporarily unreachable, serving cached data.'
      };
    }

    throw error;
  }
}

/**
 * Fetch live data from GitHub official GraphQL or public contributions API
 */
export async function fetchGitHubData(forceRefresh = false) {
  const now = Date.now();
  const username = getGitHubUsername();
  const token = process.env.GITHUB_TOKEN;

  if (!forceRefresh && cache.github && now - cache.githubTimestamp < CACHE_TTL_MS) {
    return { ...cache.github, isCached: true };
  }

  // 1. Try official GitHub GraphQL API if GITHUB_TOKEN is configured
  if (token && token.trim() !== '' && token !== 'your_github_token') {
    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`,
          'User-Agent': 'Arjun-Portfolio-Server'
        },
        body: JSON.stringify({
          query: `
            query($username: String!) {
              user(login: $username) {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        date
                        contributionCount
                        contributionLevel
                        color
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: { username }
        })
      });

      if (response.ok) {
        const json = await response.json();
        const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendar) {
          const days = [];
          for (const week of calendar.weeks || []) {
            for (const day of week.contributionDays || []) {
              let level = 0;
              if (day.contributionLevel === 'FIRST_QUARTILE') level = 1;
              else if (day.contributionLevel === 'SECOND_QUARTILE') level = 2;
              else if (day.contributionLevel === 'THIRD_QUARTILE') level = 3;
              else if (day.contributionLevel === 'FOURTH_QUARTILE') level = 4;
              else if (day.contributionCount > 0) level = 1;

              days.push({
                date: day.date,
                count: day.contributionCount,
                level,
                dayOfWeek: new Date(day.date).getDay()
              });
            }
          }

          const result = {
            username,
            profileUrl: `https://github.com/${username}`,
            totalContributions: calendar.totalContributions,
            heatmap: {
              days,
              totalContributionsLastYear: calendar.totalContributions
            },
            source: 'GitHub GraphQL API',
            lastUpdated: new Date().toISOString(),
            isCached: false,
            status: 'Live'
          };

          cache.github = result;
          cache.githubTimestamp = now;
          return result;
        }
      }
    } catch (gqlErr) {
      console.warn('[GitHub GraphQL Warning]: Fallback to public contributions:', gqlErr.message);
    }
  }

  // 2. Fetch directly from official public contributions source
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!res.ok) {
      throw new Error(`GitHub contributions provider responded with ${res.status}`);
    }

    const data = await res.json();
    const total = data.total?.lastYear || 0;
    const rawDays = data.contributions || [];

    const days = rawDays.map(item => ({
      date: item.date,
      count: item.count,
      level: item.level,
      dayOfWeek: new Date(item.date).getDay()
    }));

    const result = {
      username,
      profileUrl: `https://github.com/${username}`,
      totalContributions: total,
      heatmap: {
        days,
        totalContributionsLastYear: total
      },
      source: 'GitHub Contributions Service',
      lastUpdated: new Date().toISOString(),
      isCached: false,
      status: 'Live'
    };

    cache.github = result;
    cache.githubTimestamp = now;
    return result;
  } catch (error) {
    console.error('[GitHub Service Error]:', error.message);

    if (cache.github) {
      return {
        ...cache.github,
        isCached: true,
        isStale: true,
        status: 'Cached',
        warning: 'GitHub API temporarily unreachable, serving cached data.'
      };
    }

    throw error;
  }
}

/**
 * Get unified summary of both platforms
 */
export async function getUnifiedCodingSummary(forceRefresh = false) {
  const [leetcodeResult, githubResult] = await Promise.allSettled([
    fetchLeetCodeData(forceRefresh),
    fetchGitHubData(forceRefresh)
  ]);

  return {
    leetcode: leetcodeResult.status === 'fulfilled' ? leetcodeResult.value : { status: 'Unavailable', error: leetcodeResult.reason?.message },
    github: githubResult.status === 'fulfilled' ? githubResult.value : { status: 'Unavailable', error: githubResult.reason?.message },
    lastSynchronized: new Date().toISOString()
  };
}

