// ComparisonBadge.jsx
// Copy this entire file to: src/components/dashboardComponents/ComparisonBadge.jsx

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const ComparisonBadge = ({ change, size = "sm" }) => {
  // If no change data, don't show anything
  if (change === undefined || change === null) return null;

  const isPositive = change > 0;
  const isNegative = change < 0;
  const isNeutral = change === 0;

  // Size variants
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-1",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
  };

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-md font-semibold ${
        sizeClasses[size]
      } ${
        isPositive
          ? "bg-green-50 text-green-700 border border-green-200"
          : isNegative
          ? "bg-red-50 text-red-700 border border-red-200"
          : "bg-gray-100 text-gray-600 border border-gray-200"
      }`}
    >
      {isPositive && <TrendingUp className={iconSizes[size]} />}
      {isNegative && <TrendingDown className={iconSizes[size]} />}
      {isNeutral && <Minus className={iconSizes[size]} />}
      <span>
        {isPositive ? "+" : ""}
        {change}
      </span>
    </div>
  );
};

export default ComparisonBadge;
