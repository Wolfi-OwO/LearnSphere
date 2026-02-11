import React from "react";
import "./ActivityBoard.css";

const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function ActivityBoard({activity}) {
  const totalWeeks = Math.max(...activity.map((row) => row.length));

  // Month labels
  const monthLabels = [];
  let lastMonth = null;
  let lastLabelPosition = -Infinity;
  const minLabelSpacing = 40; // px, adjust as needed

  for (let w = 0; w < totalWeeks; w++) {
    const firstRowDate = activity[0][w]?.date;
    if (!firstRowDate) continue;
    const month = new Date(firstRowDate).getMonth();
    if (month !== lastMonth) {
      const position = w * 18;
      if (position - lastLabelPosition >= minLabelSpacing) {
        monthLabels.push({ month: MONTHS[month], weekIndex: w });
        lastMonth = month;
        lastLabelPosition = position;
      }
    }
  }

  return (
    <div className="activity-board-container">
      {/* Month labels */}
      <div className="month-labels">
        {monthLabels.map(({ month, weekIndex }) => (
          <div
            key={`${month}-${weekIndex}`}
            className="month-label"
            style={{ left: `${weekIndex * 20}px` }}
          >
            {month}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="activity-grid">
        {activity.map((weekdayRow, rowIndex) => (
          <div key={`${weekdayRow}-${rowIndex}`} className="activity-row">
            {weekdayRow.map((activity, colIndex) => (
              <ActivityBox key={`${weekdayRow}-${rowIndex}-${colIndex}`} activity={activity} />
            ))}
          </div>
        ))}
      </div>

      {/* Weekday labels on left */}
      <div className="day-labels">
        {DAYS_SHORT.map((day) => (
          <div key={day} className="day-label">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityBox({ activity }) {
  // eslint-disable-next-line react-hooks/purity
  const calc_intensity = Math.random() < 0.3 ? 0 : Math.ceil(Math.random() * 5); // Random intensity for demo
  const intensity = calc_intensity > 5 || calc_intensity < 1 ? 1 : calc_intensity;
  const colors = {
    1: "#ebedf0",
    2: "#c6e48b",
    3: "#7bc96f",
    4: "#239a3b",
    5: "#196127",
  };
  return (
    <div
      className={"activity-box intensity-" + intensity}
      title={activity.description}
      style={{ backgroundColor: colors[intensity] }}
    />
  );
}
