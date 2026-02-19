import {
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ComparisonSummary = ({ comparison }) => {
  // Don't render if no comparison data
  if (!comparison || !comparison?.summary) return null;

  const { summary } = comparison;
  const hasImprovements =
    summary?.keyImprovements && summary?.keyImprovements?.length > 0;
  const hasAreasNeedingWork =
    summary?.areasNeedingWork && summary?.areasNeedingWork?.length > 0;

  // Don't render if both arrays are empty
  if (!hasImprovements && !hasAreasNeedingWork) return null;

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
          {summary?.overallTrend === "improved" ? (
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          ) : summary?.overallTrend === "declined" ? (
            <div className="p-2 bg-red-50 rounded-lg">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
          ) : (
            <div className="p-2 bg-gray-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-gray-600" />
            </div>
          )}
          Analysis Summary
        </CardTitle>
        <p className="text-sm text-gray-600">
          Changes from your previous analysis
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Improvements */}
        {hasImprovements && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-green-900 mb-1">
                  Key Improvements
                </h4>
                <ul className="space-y-2">
                  {summary?.keyImprovements?.map((improvement, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-green-800 flex items-start gap-2"
                    >
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Areas Needing Work */}
        {hasAreasNeedingWork && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-amber-900 mb-1">
                  Areas Needing Attention
                </h4>
                <ul className="space-y-2">
                  {summary?.areasNeedingWork?.map((area, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-amber-800 flex items-start gap-2"
                    >
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComparisonSummary;
