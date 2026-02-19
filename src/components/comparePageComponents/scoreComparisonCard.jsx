import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Target } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "@/components/ui/progress";
import TrendIcon from "./trendIcon";
import ChangeBadge from "./changeBadge";

const ScoreComparisonCard = ({ title, previous, current, change, data }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };
  return (
    <div>
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-5 w-5 text-blue-600" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Previous Score */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-600 mb-1">Previous</p>
                <p className={`text-3xl font-bold ${getScoreColor(previous)}`}>
                  {previous}%
                </p>
              </div>
              <Badge variant="outline" className="text-gray-600">
                v{data?.previous?.version}
              </Badge>
            </div>

            {/* Arrow & Change */}
            <div className="flex items-center justify-center">
              <TrendIcon change={change} size="large" />
              <ChangeBadge change={change} showIcon={false} />
            </div>

            {/* Current Score */}
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
              <div>
                <p className="text-xs text-blue-700 font-medium mb-1">
                  Current
                </p>
                <p className={`text-3xl font-bold ${getScoreColor(current)}`}>
                  {current}%
                </p>
              </div>
              <Badge className="bg-blue-600 text-white">
                v{data?.current?.version}
              </Badge>
            </div>

            {/* Progress Comparison */}
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Previous</span>
                  <span>{previous}%</span>
                </div>
                <Progress value={previous} className="h-2 bg-green-600" />
              </div>
              <div>
                <div className="flex justify-between text-xs text-blue-700 mb-1">
                  <span>Current</span>
                  <span>{current}%</span>
                </div>
                <Progress value={current} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>

        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent opacity-30 rounded-full -mr-16 -mt-16" />
      </Card>
      );
    </div>
  );
};

export default ScoreComparisonCard;
