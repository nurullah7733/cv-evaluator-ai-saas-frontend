"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  Users,
  Target,
  Eye,
  Info,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  RefreshCcwDot,
  BookOpenCheck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SkillsCoverageBenchmarkChart from "../components/dashboardComponents/skillsCoverageBenchmarkChart";
import SalaryBandChart from "../components/dashboardComponents/salaryBandChart";
import QuickStats from "../components/dashboardComponents/QuickStats";
import { Link } from "react-router-dom";
import TopActionItem from "../components/dashboardComponents/topActionItem";
import ResumeDashboardLoading from "../components/loader/resumeDashboardLoading";
import ProFeatureWrapper from "../components/dashboardComponents/proFeatureWrapper";
import ComparisonBadge from "../components/dashboardComponents/comparisonBadge";
import ComparisonSummary from "../components/dashboardComponents/comparisonSummary";
import SeeSuggestions from "../components/dashboardComponents/seeSuggestions";
import ReanalysisModal from "../components/dashboardComponents/ReanalysisModal";
import {
  getIsProUser,
  setResumeFormData,
} from "../lib/sessionHelper/sessionHelper";
import ReAnalysisLoader from "../components/loader/reAnalysisLoader";
import { useSearchParams } from "react-router-dom";
import { useGetAnalysisVersionQuery } from "../features/apiSlice";
import ViewMissingKeywordModal from "../components/dashboardComponents/viewMissingKeywordModal";
import { setCreateResumeAnalysis } from "../features/createResumeAnalysisSlice";
import DataNotFoundPage from "../components/dataNotFound/dataNotFound";

export default function ResumeDashboard() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const analysisId = searchParams.get("analysisid");
  console.log("analysisId", analysisId);
  const { data, isLoading } = useGetAnalysisVersionQuery(analysisId, {
    skip: !analysisId,
  });

  const analysisResult = useSelector(
    (state) => state.createResumeAnalysis.createResumeAnalysis
  );
  let analysis = analysisResult?.analysisResult;
  let comparison = analysisResult?.comparison;
  let actionItemsFromApiResult =
    analysis?.premiumInsights?.atsCoverage?.top3Actions || [];

  if (analysisId && comparison == null) {
    analysis = data?.data;
    dispatch(setCreateResumeAnalysis(data?.data));
    actionItemsFromApiResult =
      data?.data?.premiumInsights?.atsCoverage?.top3Actions || [];
    comparison = null;
  }

  const metaData = {
    analysisId: analysis?._id || analysisResult?.analysisId,
    actor: analysis?.actor,
    persona: analysis?.persona,
    industry: analysis?.industry,
    jdText: analysis?.jdText,
    region: analysis?.region,
    desiredSalary: analysis?.desiredSalary,
    llmName: analysis?.provider,
  };

  setResumeFormData(metaData);
  const [actionItems, setActionItems] = useState(actionItemsFromApiResult);

  useEffect(() => {
    if (analysisId && data?.data?.premiumInsights?.atsCoverage?.top3Actions) {
      setActionItems(data?.data?.premiumInsights?.atsCoverage?.top3Actions);
    } else if (analysis?.premiumInsights?.atsCoverage?.top3Actions) {
      setActionItems(analysis?.premiumInsights?.atsCoverage?.top3Actions);
    }
  }, [data, analysis, analysisId]);

  const reAnalysisLoading = useSelector(
    (state) => state.reAnalysisLoading?.reAnalysisLoading
  );

  // from localStorage
  const isProUser = getIsProUser();

  const toggleActionItem = (id) => {
    setActionItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (score >= 60) return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-red-700 bg-red-50 border-red-200";
  };

  const getScoreIcon = (score) => {
    if (score >= 80)
      return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-amber-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  const getMatchLevel = (score) => {
    if (score >= 80) return "Excellent Match";
    if (score >= 70) return "Good Match";
    if (score >= 60) return "Fair Match";
    return "Needs Improvement";
  };

  // Helper function to get comparison data
  const getComparisonChange = (field) => {
    if (!comparison) return null;

    // For overall score
    if (field === "overall") {
      return comparison?.scoreChanges?.overall?.change || null;
    }

    // For breakdown fields (structure, language, keywords, experience)
    if (comparison?.breakdownChanges?.[field]) {
      return comparison?.breakdownChanges[field].change;
    }

    return null;
  };

  return (
    <>
      {isLoading ? (
        <ResumeDashboardLoading />
      ) : (
        <>
          <ReAnalysisLoader isLoading={reAnalysisLoading} />
          <>
            {analysis ? (
              <TooltipProvider>
                <div className="min-h-screen bg-gray-50 font-sans">
                  <main className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* left panel */}
                      <section className="lg:col-span-4 space-y-6">
                        {/* Overall Score Card*/}
                        <Card className="shadow-sm border-gray-200">
                          <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
                              <Target className="h-5 w-5 !text-blue-600" />
                              Overall Job Fit Score
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 ml-auto"
                                  >
                                    <Info className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-gray-700">
                                    Calculated based on skills match,
                                    experience, and requirements alignment
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="text-center">
                              <div
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getScoreColor(
                                  analysis?.scores?.overall || 0
                                )}`}
                              >
                                {getScoreIcon(analysis?.scores?.overall || 0)}
                                <span className="text-3xl font-bold">
                                  {analysis?.scores?.overall || 0}
                                </span>
                                <span className="text-sm font-medium">
                                  / 100
                                </span>
                              </div>

                              {/* ✅ COMPARISON BADGE for Overall Score */}
                              {getComparisonChange("overall") !== null && (
                                <div className="mt-3">
                                  <ComparisonBadge
                                    change={getComparisonChange("overall")}
                                    size="md"
                                  />
                                </div>
                              )}

                              <p className="text-sm text-gray-600 mt-2">
                                {getMatchLevel(analysis?.scores?.overall)}
                              </p>
                            </div>

                            <div className="space-y-4">
                              {/* Skills Match */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium text-gray-700">
                                    Skills Match
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                      {analysis?.jobFit?.keywordMatch || 0}%
                                    </span>
                                    {getComparisonChange("keywords") !==
                                      null && (
                                      <ComparisonBadge
                                        change={getComparisonChange("keywords")}
                                      />
                                    )}
                                  </div>
                                </div>
                                <Progress
                                  value={analysis?.jobFit?.keywordMatch || 0}
                                  className="h-2 bg-secondary-blue"
                                />
                              </div>

                              {/* Experience Level */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium text-gray-700">
                                    Experience Level
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                      {analysis?.breakdown?.experience || 0}%
                                    </span>
                                    {getComparisonChange("experience") !==
                                      null && (
                                      <ComparisonBadge
                                        change={getComparisonChange(
                                          "experience"
                                        )}
                                      />
                                    )}
                                  </div>
                                </div>
                                <Progress
                                  value={analysis?.breakdown?.experience || 0}
                                  className="h-2 bg-secondary-green"
                                />
                              </div>

                              {/* Requirements Met */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium text-gray-700">
                                    Requirements Met
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                      {analysis?.breakdown?.keywords || 0}%
                                    </span>
                                    {getComparisonChange("keywords") !==
                                      null && (
                                      <ComparisonBadge
                                        change={getComparisonChange("keywords")}
                                      />
                                    )}
                                  </div>
                                </div>
                                <Progress
                                  value={analysis?.breakdown?.keywords || 0}
                                  className="h-2 bg-secondary-yellow"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* ATS Breakdown Card  */}
                        <Card className="shadow-sm border-gray-200">
                          <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
                              <BarChart3 className="h-5 w-5 !text-blue-600" />
                              ATS Breakdown
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 ml-auto"
                                  >
                                    <Info className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-gray-700">
                                    ATS Breakdown provides insights into how
                                    well your resume matches
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </CardTitle>
                            <p className="text-sm text-gray-600">
                              Matches Schema: structure / language / keywords /
                              experience
                            </p>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="space-y-4">
                              {/* Structure */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium text-gray-700">
                                    Structure
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                      {analysis?.breakdown?.structure || 0}%
                                    </span>
                                    {getComparisonChange("structure") !==
                                      null && (
                                      <ComparisonBadge
                                        change={getComparisonChange(
                                          "structure"
                                        )}
                                      />
                                    )}
                                  </div>
                                </div>
                                <Progress
                                  value={analysis?.breakdown?.structure || 0}
                                  className="h-2 bg-secondary-blue"
                                />
                              </div>

                              {/* Language */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium text-gray-700">
                                    Language
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                      {analysis?.breakdown?.language || 0}%
                                    </span>
                                    {getComparisonChange("language") !==
                                      null && (
                                      <ComparisonBadge
                                        change={getComparisonChange("language")}
                                      />
                                    )}
                                  </div>
                                </div>
                                <Progress
                                  value={analysis?.breakdown?.language || 0}
                                  className="h-2 bg-secondary-green"
                                />
                              </div>

                              {/* Keywords */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium text-gray-700">
                                    Keywords
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                      {analysis?.breakdown?.keywords || 0}%
                                    </span>
                                    {getComparisonChange("keywords") !==
                                      null && (
                                      <ComparisonBadge
                                        change={getComparisonChange("keywords")}
                                      />
                                    )}
                                  </div>
                                </div>
                                <Progress
                                  value={analysis?.breakdown?.keywords || 0}
                                  className="h-2 bg-secondary-yellow"
                                />
                              </div>

                              {/* Experience */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium text-gray-700">
                                    Experience
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                      {analysis?.breakdown?.experience || 0}%
                                    </span>
                                    {getComparisonChange("experience") !==
                                      null && (
                                      <ComparisonBadge
                                        change={getComparisonChange(
                                          "experience"
                                        )}
                                      />
                                    )}
                                  </div>
                                </div>
                                <Progress
                                  value={analysis?.breakdown?.experience || 0}
                                  className="h-2 bg-secondary-blue"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* ✅ Comparison Summary - Show only when comparison exists */}
                        {comparison && (
                          <ComparisonSummary comparison={comparison} />
                        )}

                        {/* Quick Stats */}
                        <QuickStats analysisData={analysis} />

                        {/* ATS Coverage - PRO Feature */}
                        <ProFeatureWrapper
                          isProUser={isProUser}
                          featureName="ATS Coverage"
                        >
                          <Card className="shadow-sm border-gray-200">
                            <CardHeader className="pb-4">
                              <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
                                <ShieldCheck
                                  className="h-5 w-5 !text-blue-600"
                                  aria-hidden="true"
                                />
                                ATS Coverage
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 ml-auto"
                                    >
                                      <Info className="h-4 w-4" />
                                      <span className="sr-only">
                                        ATS Coverage
                                      </span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-gray-700">
                                      ATS Coverage represents the percentage of
                                      job requirements that are met by the
                                      candidate&apos;s resume.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </CardTitle>
                              <p className="text-sm text-gray-600">
                                Exact vs Partial vs Stem Matches
                              </p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">
                                      Exact Match
                                    </span>
                                    <span className="text-sm text-gray-600">
                                      {analysis?.premiumInsights?.atsCoverage
                                        ?.exactPct
                                        ? analysis?.premiumInsights?.atsCoverage
                                            ?.exactPct
                                        : 0}
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      analysis?.premiumInsights?.atsCoverage
                                        ?.exactPct
                                        ? analysis?.premiumInsights?.atsCoverage
                                            ?.exactPct
                                        : 0
                                    }
                                    className="h-2 bg-secondary-blue"
                                    aria-label="Exact Match: 82%"
                                  />
                                </div>

                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">
                                      Partial Match
                                    </span>
                                    <span className="text-sm text-gray-600">
                                      {analysis?.premiumInsights?.atsCoverage
                                        ?.partialPct
                                        ? analysis?.premiumInsights?.atsCoverage
                                            ?.partialPct
                                        : 0}
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      analysis?.premiumInsights?.atsCoverage
                                        ?.partialPct
                                        ? analysis?.premiumInsights?.atsCoverage
                                            ?.partialPct
                                        : 0
                                    }
                                    className="h-2 bg-secondary-green"
                                    aria-label="Partial Match: 75%"
                                  />
                                </div>

                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">
                                      Stem Match
                                    </span>
                                    <span className="text-sm text-gray-600">
                                      {analysis?.premiumInsights?.atsCoverage
                                        ?.stemPct
                                        ? analysis?.premiumInsights?.atsCoverage
                                            ?.stemPct
                                        : 0}
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      analysis?.premiumInsights?.atsCoverage
                                        ?.stemPct
                                        ? analysis?.premiumInsights?.atsCoverage
                                            ?.stemPct
                                        : 0
                                    }
                                    className="h-2 bg-secondary-yellow"
                                    aria-label="Stem Match: 77%"
                                  />
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <ViewMissingKeywordModal
                                missingKeyword={
                                  analysis?.premiumInsights?.atsCoverage
                                    ?.missing
                                }
                              />
                            </CardFooter>
                          </Card>
                        </ProFeatureWrapper>
                      </section>

                      {/* Center Panel - Charts */}
                      <section className="lg:col-span-5 space-y-6">
                        <ProFeatureWrapper
                          isProUser={isProUser}
                          featureName="Skills Coverage"
                        >
                          <Card className="shadow-sm border-gray-200">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                Skills Coverage vs Benchmark
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <SkillsCoverageBenchmarkChart
                                apiData={analysis}
                              />
                            </CardContent>
                          </Card>
                        </ProFeatureWrapper>

                        <ProFeatureWrapper
                          isProUser={isProUser}
                          featureName="Salary Band"
                        >
                          <SalaryBandChart apiData={analysis} />
                        </ProFeatureWrapper>
                      </section>

                      {/* Right Panel - Action Items */}
                      <section className="lg:col-span-3 space-y-6">
                        {/* TopActionItem component */}
                        <TopActionItem
                          toggleActionItem={toggleActionItem}
                          actionItems={actionItems}
                        />

                        <Card className="shadow-sm border-gray-200">
                          <CardHeader>
                            <CardTitle className="text-lg text-gray-700">
                              Resume Preview
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <SeeSuggestions
                              isUserPro={isProUser}
                              suggestions={analysis?.suggestions}
                            />

                            <Link
                              to={
                                analysisId
                                  ? `/report?analysisid=${analysisId}`
                                  : "/report"
                              }
                            >
                              <Button
                                variant="outline"
                                className="w-full text-gray-700 hover:bg-gray-100"
                              >
                                <BookOpenCheck className="h-4 w-4 mr-2" />
                                View Full Report
                              </Button>
                            </Link>

                            <ReanalysisModal analysis={analysis} />
                          </CardContent>
                        </Card>
                      </section>
                    </div>
                  </main>
                </div>
              </TooltipProvider>
            ) : (
              <DataNotFoundPage />
            )}
          </>
        </>
      )}
    </>
  );
}
