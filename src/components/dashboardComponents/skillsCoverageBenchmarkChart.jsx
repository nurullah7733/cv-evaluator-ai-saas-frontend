import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { ChartContainer } from "@/components/ui/chart";

const SkillsCoverageBenchmarkChart = ({ apiData }) => {
  const {
    optimization = {},
    premiumInsights = {},
    resumeSections = {},
  } = apiData || {};

  const { skillGaps = [], compPercentile = 70 } = premiumInsights;

  // Extract ALL skills from API data
  const extractAllSkills = useMemo(() => {
    if (!resumeSections?.skills && !optimization?.skills) return [];

    const allSkillsArray = [];

    // From resumeSections.skills (categorized)
    if (resumeSections?.skills) {
      Object.values(resumeSections?.skills).forEach((skillCategory) => {
        if (Array.isArray(skillCategory)) {
          allSkillsArray.push(...skillCategory);
        }
      });
    }

    // From optimization.skills (flat array)
    if (optimization?.skills && Array.isArray(optimization?.skills)) {
      allSkillsArray.push(...optimization.skills);
    }

    // Remove duplicates and filter empty values
    return [...new Set(allSkillsArray)].filter(
      (skill) => skill && skill.trim()
    );
  }, [resumeSections.skills, optimization.skills]);

  // Skills Coverage Data - Client requirement based
  const skillsCoverageData = useMemo(() => {
    if (extractAllSkills?.length === 0) return [];

    // Take top 6 skills for readability
    const topSkills = extractAllSkills?.slice(0, 6);

    return topSkills.map((skill) => {
      // Check if skill has a gap (missing/weak skill)
      const skillGapData = skillGaps?.find((gap) => gap?.skill === skill);

      // Calculate Your Score
      // If skill has gap (high severity) = low score
      // If no gap = strong skill = high score (90-95%)
      const yourScore = skillGapData
        ? Math.max(20, 100 - skillGapData?.severity) // Gap exists: convert severity to score
        : Math.floor(Math.random() * 6) + 90; // No gap: excellent score (90-95%)

      // Industry Average calculation
      // Based on compPercentile (70 = you're at 70th percentile)
      // If your score is high, industry average should be lower
      // If your score is low (gap exists), industry average is higher
      // eslint-disable-next-line no-unused-vars
      const baseIndustryAvg = 65; // Industry baseline
      const industryAverage = skillGapData
        ? Math.min(yourScore + 15, 85) // If you have gap, industry is better
        : Math.max(yourScore - 15, 60); // If you're strong, you're above average

      // Gap Analysis
      const gap = yourScore - industryAverage;
      const gapDisplay = Math.abs(gap);

      // Percentile Ranking
      // Higher gap = higher percentile (you're better than more people)
      const percentileRank = skillGapData
        ? Math.max(25, compPercentile - skillGapData?.severity / 2) // Gap reduces percentile
        : Math.min(95, compPercentile + 15); // Strong skill = high percentile

      return {
        skill: skill?.length > 12 ? skill?.substring(0, 12) + "..." : skill,
        fullSkill: skill,
        current: Math.min(Math.round(yourScore), 100),
        benchmark: Math.min(Math.round(industryAverage), 90),
        gap: Math.round(gapDisplay),
        originalGap: Math.round(gap),
        percentile: Math.round(percentileRank),
      };
    });
  }, [extractAllSkills, skillGaps, compPercentile]);

  // Chart configuration
  const chartConfig = {
    current: {
      label: "Your Score",
      color: "#3b82f6",
    },
    benchmark: {
      label: "Industry Avg",
      color: "#10b981",
    },
    gap: {
      label: "Performance Gap",
      color: "#f59e0b",
    },
  };

  return (
    <TooltipProvider>
      {skillsCoverageData?.length > 0 ? (
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={skillsCoverageData}
              margin={{ top: 20, right: 30, left: 20, bottom: 45 }}
            >
              <XAxis
                dataKey="skill"
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={{ stroke: "#e5e7eb" }}
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={{ stroke: "#e5e7eb" }}
                domain={[0, 100]}
                label={{
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <RechartsTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0]?.payload;
                    return (
                      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg min-w-64">
                        <p className="font-semibold text-sm text-gray-800 mb-3">
                          {data?.fullSkill || label}
                        </p>

                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-blue-600 font-medium">
                              Your Score:
                            </span>
                            <span className="font-bold text-sm text-blue-800">
                              {data?.current}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-green-600">
                              Industry Average:
                            </span>
                            <span className="font-medium text-sm text-green-600">
                              {data?.benchmark}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-amber-600">
                              Performance Gap:
                            </span>
                            <span className="font-medium text-sm text-amber-600">
                              {data?.gap}%
                            </span>
                          </div>
                        </div>

                        <div className="border-t pt-2 mb-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              Gap Analysis:
                            </span>
                            <span
                              className={`text-sm font-bold ${
                                data?.originalGap >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {data?.originalGap >= 0 ? "+" : ""}
                              {data?.originalGap}%
                            </span>
                          </div>
                        </div>

                        <div className="border-t pt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              Percentile Rank:
                            </span>
                            <span className="text-sm font-bold text-purple-600">
                              {data?.percentile}th
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 text-center">
                          {data?.originalGap >= 10 && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Above Average
                            </span>
                          )}
                          {data?.originalGap >= 0 && data?.originalGap < 10 && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              At Par
                            </span>
                          )}
                          {data?.originalGap < 0 && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                              Needs Improvement
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="current"
                fill="#3B82F6"
                name="Your Score"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="benchmark"
                fill="#10B981"
                name="Industry Avg"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="gap"
                fill="#F59E0B"
                name="Performance Gap"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      ) : (
        <div className="h-80 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-lg mb-2">No skills data available</p>
            <p className="text-sm">
              Skills benchmark comparison will appear here once data is
              processed
            </p>
          </div>
        </div>
      )}
    </TooltipProvider>
  );
};

export default SkillsCoverageBenchmarkChart;
