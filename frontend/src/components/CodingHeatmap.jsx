import React, { useState } from 'react';

/**
 * Group flat days array into weeks for GitHub / LeetCode style contribution grids
 */
function organizeWeeks(days) {
  if (!days || days.length === 0) return [];

  const weeks = [];
  let currentWeek = [];

  // Pad first week if it doesn't start on Sunday (dayOfWeek 0)
  const firstDay = days[0];
  const firstDow = firstDay.dayOfWeek ?? new Date(firstDay.date).getDay();
  for (let i = 0; i < firstDow; i++) {
    currentWeek.push(null);
  }

  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return weeks;
}

export default function CodingHeatmap({
  days = [],
  totalCount = 0,
  countLabel = 'submissions',
  platform = 'LeetCode'
}) {
  const [hoveredCell, setHoveredCell] = useState(null);
  const weeks = organizeWeeks(days);

  // Month labels generator across weeks
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthLabels = [];
  let lastMonth = -1;

  weeks.forEach((week, weekIdx) => {
    const validDay = week.find((d) => d !== null);
    if (validDay) {
      const month = new Date(validDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ weekIdx, name: monthNames[month] });
        lastMonth = month;
      }
    }
  });

  const getCellColor = (level, count) => {
    if (!count || level === 0) return 'bg-[#161B22] border border-white/[0.04]';
    if (level === 1) return 'bg-[#0E4429] border border-[#0E4429]/60';
    if (level === 2) return 'bg-[#006D32] border border-[#006D32]/70';
    if (level === 3) return 'bg-[#26A641] border border-[#26A641]/80';
    return 'bg-[#39D353] border border-[#39D353] shadow-[0_0_6px_rgba(57,211,83,0.45)]';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full select-none">
      {/* Scrollable Heatmap Grid Container */}
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="inline-block min-w-full">
          
          {/* Month Headers */}
          <div className="flex text-[10px] text-[#A1A1AA] font-medium mb-1.5 h-4 relative">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                style={{ marginLeft: idx === 0 ? `${m.weekIdx * 14}px` : `${Math.max(14, (m.weekIdx - monthLabels[idx - 1].weekIdx) * 14 - 20)}px` }}
                className="whitespace-nowrap"
              >
                {m.name}
              </span>
            ))}
          </div>

          {/* Days Grid: 7 rows x N weeks */}
          <div className="flex gap-[3.5px] relative">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3.5px]">
                {week.map((day, dIdx) => {
                  if (!day) {
                    return <div key={dIdx} className="w-[11px] h-[11px] rounded-[2.5px] opacity-0" />;
                  }

                  const isHovered = hoveredCell?.date === day.date;
                  return (
                    <div
                      key={day.date}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredCell({
                          ...day,
                          x: rect.left + rect.width / 2,
                          y: rect.top
                        });
                      }}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`w-[11px] h-[11px] rounded-[2.5px] cursor-pointer transition-transform duration-150 hover:scale-125 ${getCellColor(
                        day.level,
                        day.count
                      )}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredCell && (
        <div
          style={{
            position: 'fixed',
            left: `${hoveredCell.x}px`,
            top: `${hoveredCell.y - 36}px`,
            transform: 'translateX(-50%)'
          }}
          className="z-50 pointer-events-none bg-[#101014] border border-[#26A641]/40 text-white text-[11px] px-2.5 py-1 rounded-md shadow-2xl whitespace-nowrap"
        >
          <span className="font-bold text-[#39D353]">
            {hoveredCell.count} {countLabel}
          </span>{' '}
          <span className="text-[#A1A1AA]">on {formatDate(hoveredCell.date)}</span>
        </div>
      )}

      {/* Heatmap Footer Legend & Total */}
      <div className="flex items-center justify-between text-xs text-[#A1A1AA] mt-4 pt-3 border-t border-white/[0.06]">
        <span>
          <strong className="text-white font-semibold">{totalCount}</strong> {countLabel} in the last year
        </span>

        {/* Less ... More Green Scale */}
        <div className="flex items-center gap-1.5 text-[11px]">
          <span>Less</span>
          <div className="flex gap-1 items-center">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#161B22] border border-white/[0.05]" title="No activity (#161B22)" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0E4429] border border-[#0E4429]" title="Low activity (#0E4429)" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#006D32] border border-[#006D32]" title="Medium-low activity (#006D32)" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#26A641] border border-[#26A641]" title="Medium-high activity (#26A641)" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#39D353] border border-[#39D353] shadow-[0_0_6px_rgba(57,211,83,0.5)]" title="High activity (#39D353)" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

