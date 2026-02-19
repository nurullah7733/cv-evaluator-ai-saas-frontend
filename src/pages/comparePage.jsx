import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import DataNotFoundPage from "../components/dataNotFound/dataNotFound";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Minus,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  Target,
  BarChart3,
  Activity,
  Clock,
  Zap,
  Info,
  ArrowRight,
} from "lucide-react";
import ScoreComparisonCard from "../components/comparePageComponents/scoreComparisonCard";
import ChangeBadge from "../components/comparePageComponents/changeBadge";
import BreakdownRow from "../components/comparePageComponents/breakdownRow";
import { useGetComparisonQuery } from "../features/apiSlice";
import ComparePageLoader from "../components/loader/comparePageLoader";

// Main Component
export default function CompareVersionsPage() {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeid");
  const analysisId = searchParams.get("analysisid");
  const { data, isLoading } = useGetComparisonQuery({
    resumeId,
    analysisId,
  });
  console.log(data == undefined, "comparison data");
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const getTrendBadge = (trend) => {
    if (trend === "up" || trend === "improved") {
      return (
        <Badge className="bg-green-600 text-white">
          <TrendingUp className="h-4 w-4 mr-1" />
          Improved
        </Badge>
      );
    }
    if (trend === "down" || trend === "declined") {
      return (
        <Badge className="bg-red-600 text-white">
          <TrendingDown className="h-4 w-4 mr-1" />
          Declined
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-white">
        <Minus className="h-4 w-4 mr-1" />
        No Change
      </Badge>
    );
  };

  return (
    <>
      {isLoading ? (
        <ComparePageLoader />
      ) : data?.status === "fail" ||
        data == undefined ||
        data?.data?.length === 0 ? (
        <DataNotFoundPage />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
          <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            {/* Timeline Card */}
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
              <CardContent className="pt-6">
                {/* Title */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h1 className="sm:text-3xl text-lg font-bold text-white mb-1">
                      Resume Version Comparison
                    </h1>
                    <p className="text-white flex items-center gap-2">
                      <FileText className="h-4 w-4 hidden sm:block" />
                      Comparing version {data?.previous?.version} with version{" "}
                      {data?.current?.version} (current)
                    </p>
                  </div>
                  {getTrendBadge(data?.comparison?.summary?.overallTrend)}
                </div>

                {/* timeline */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Previous Version</p>
                      <p className="font-semibold text-lg">
                        {formatDate(data?.previous?.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center md:justify-center gap-3">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Time Span</p>
                      <p className="font-semibold text-lg">
                        {data?.comparison?.timespan?.days} days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Activity className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Current Version</p>
                      <p className="font-semibold text-lg">
                        {formatDate(data?.current?.date)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overall Score Comparison */}
            <section>
              <h2 className=" font-bold text-gray-900 mb-4 flex items-center gap-2 text-base sm:text-2xl">
                <Target className="h-6 w-6 text-blue-600 " />
                Overall Score Comparison
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ScoreComparisonCard
                  title="Overall Score"
                  previous={data?.comparison?.scoreChanges?.overall?.previous}
                  current={data?.comparison?.scoreChanges?.overall?.current}
                  change={data?.comparison?.scoreChanges?.overall?.change}
                  icon={Target}
                  data={data}
                />

                {/* Stats Cards */}
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Zap className="h-5 w-5 text-green-600" />
                      Total Changes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-green-600 mb-2">
                        {data?.comparison?.summary?.totalChanges}
                      </div>
                      <p className="text-sm text-green-700">
                        improvements detected
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* action item */}
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      Action Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-3xl font-bold text-gray-400 line-through">
                          {data?.comparison?.suggestionsChanges?.previousCount}
                        </span>
                        <ArrowRight className="h-6 w-6 text-gray-400" />
                        <span className="text-3xl font-bold text-amber-600">
                          {data?.comparison?.suggestionsChanges?.currentCount}
                        </span>
                      </div>
                      <ChangeBadge
                        change={data?.comparison?.suggestionsChanges?.change}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            {/* Detailed Breakdown Comparison */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                Detailed Score Breakdown
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-0 divide-y">
                    {Object.entries(
                      data?.comparison?.breakdownChanges || {}
                    )?.map(([key, values]) => (
                      <BreakdownRow
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        previous={values.previous}
                        current={values.current}
                        change={values.change}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Skills Changes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-blue-600" />
                Skills Changes
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Added Skills */}
                <Card className="border-2 border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Skills Added (
                      {data?.comparison?.skillsChanges?.added?.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {data?.comparison?.skillsChanges?.added?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {data?.comparison?.skillsChanges?.added?.map(
                          (skill, idx) => (
                            <Badge
                              key={idx}
                              className="bg-green-600 text-white px-3 py-1"
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              {skill}
                            </Badge>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Info className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No skills added</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Removed Skills */}
                <Card className="border-2 border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <XCircle className="h-5 w-5 text-red-600" />
                      Skills Removed (
                      {data?.comparison?.skillsChanges?.removed?.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {data?.comparison?.skillsChanges?.removed?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {data?.comparison?.skillsChanges?.removed?.map(
                          (skill, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-red-700 border-red-300 px-3 py-1"
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              {skill}
                            </Badge>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Info className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No skills removed</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            {/* Summary & Insights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Summary & Insights
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Key Improvements */}
                <Card className="border-2 border-green-200">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="flex items-center gap-2 text-lg text-green-900">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Key Improvements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {data?.comparison?.summary?.keyImprovements?.map(
                        (improvement, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              {idx + 1}
                            </div>
                            <p className="text-sm text-gray-700 flex-1">
                              {improvement}
                            </p>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>

                {/* Areas Needing Work */}
                <Card className="border-2 border-amber-200">
                  <CardHeader className="bg-amber-50">
                    <CardTitle className="flex items-center gap-2 text-lg text-amber-900">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {data?.comparison?.summary?.areasNeedingWork?.map(
                        (area, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              {idx + 1}
                            </div>
                            <p className="text-sm text-gray-700 flex-1">
                              {area}
                            </p>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-center flex-wrap gap-4 pt-6">
              <Link
                to={`/report?analysisid=${analysisId}`}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center px-4 py-2 rounded-md"
              >
                <FileText className="h-5 w-5 mr-2" />
                View Previus Version ({data?.previous?.version}) Report
              </Link>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
