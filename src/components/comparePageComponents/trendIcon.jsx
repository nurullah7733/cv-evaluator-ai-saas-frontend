import { ArrowDown, ArrowUp, Minus } from "lucide-react";

const TrendIcon = ({ change, size = "default" }) => {
  const iconSize =
    size === "large" ? "h-8 w-8" : size === "small" ? "h-4 w-4" : "h-5 w-5";

  if (change > 0) {
    return <ArrowUp className={`${iconSize} text-green-600`} />;
  } else if (change < 0) {
    return <ArrowDown className={`${iconSize} text-red-600`} />;
  }
  return <Minus className={`${iconSize} text-gray-400`} />;
};

export default TrendIcon;
