import React from "react";
import TrendIcon from "./trendIcon";
import ChangeBadge from "./changeBadge";

const BreakdownRow = ({ label, previous, current, change }) => {
  const getBarColor = (value) => {
    if (value >= 80) return "bg-green-600";
    if (value >= 60) return "bg-amber-600";
    return "bg-red-600";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr_80px_1fr_100px] gap-4 items-center py-4">
      <div className="font-medium text-gray-900">{label}</div>

      {/* Previous */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Previous</span>
          <span className="font-semibold">{previous}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getBarColor(previous)}`}
            style={{ width: `${previous}%` }}
          />
        </div>
      </div>

      {/* Change Arrow */}
      <div className="flex justify-center">
        <TrendIcon change={change} />
      </div>

      {/* Current */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-blue-700 font-medium">Current</span>
          <span className="font-semibold">{current}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getBarColor(current)}`}
            style={{ width: `${current}%` }}
          />
        </div>
      </div>

      {/* Change Badge */}
      <div className="flex justify-end">
        <ChangeBadge change={change} />
      </div>
    </div>
  );
};
export default BreakdownRow;
