import React from "react";
import { Badge } from "../ui/badge";
import TrendIcon from "./trendIcon";

const ChangeBadge = ({ change, showIcon = true }) => {
  const getColor = () => {
    if (change > 0) return "bg-green-100 text-green-700 border-green-300";
    if (change < 0) return "bg-red-100 text-red-700 border-red-300";
    return "bg-gray-100 text-gray-700 border-gray-300";
  };

  const getSign = () => {
    if (change > 0) return "+";
    return "";
  };

  return (
    <Badge variant="outline" className={`${getColor()} font-semibold`}>
      {showIcon && <TrendIcon change={change} size="small" />}
      <span className="ml-1">
        {getSign()}
        {change}
      </span>
    </Badge>
  );
};

export default ChangeBadge;
