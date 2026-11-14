import {
  fetchLeetCodeData,
  fetchGitHubData,
  getUnifiedCodingSummary
} from '../services/codingService.js';

export const getLeetCodeStats = async (req, res, next) => {
  try {
    const force = req.query.refresh === 'true';
    const data = await fetchLeetCodeData(force);
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'Unavailable',
      message: 'Failed to retrieve LeetCode statistics',
      error: error.message
    });
  }
};

export const getLeetCodeHeatmap = async (req, res, next) => {
  try {
    const force = req.query.refresh === 'true';
    const data = await fetchLeetCodeData(force);
    res.status(200).json({
      success: true,
      data: {
        username: data.username,
        totalSubmissionsLastYear: data.heatmap.totalSubmissionsLastYear,
        days: data.heatmap.days,
        status: data.status,
        isCached: data.isCached,
        lastUpdated: data.lastUpdated
      }
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'Unavailable',
      message: 'Failed to retrieve LeetCode submission heatmap',
      error: error.message
    });
  }
};

export const getGitHubStats = async (req, res, next) => {
  try {
    const force = req.query.refresh === 'true';
    const data = await fetchGitHubData(force);
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'Unavailable',
      message: 'Failed to retrieve GitHub statistics',
      error: error.message
    });
  }
};

export const getGitHubHeatmap = async (req, res, next) => {
  try {
    const force = req.query.refresh === 'true';
    const data = await fetchGitHubData(force);
    res.status(200).json({
      success: true,
      data: {
        username: data.username,
        totalContributions: data.totalContributions,
        days: data.heatmap.days,
        status: data.status,
        isCached: data.isCached,
        lastUpdated: data.lastUpdated
      }
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'Unavailable',
      message: 'Failed to retrieve GitHub contribution heatmap',
      error: error.message
    });
  }
};

export const getCodingSummary = async (req, res, next) => {
  try {
    const force = req.query.refresh === 'true';
    const summary = await getUnifiedCodingSummary(force);
    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

