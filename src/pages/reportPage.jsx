import { useState } from "react";
import {
  Lock,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Briefcase,
  Target,
  Award,
  AlertCircle,
  ArrowRight,
  Download,
  Share2,
  Bell,
  Mail,
  Phone,
  MapPin,
  Globe,
  Zap,
  Users,
  Calendar,
  Star,
  AlertTriangle,
  MessageSquare,
  FileText,
  Lightbulb,
  Eye,
  Shield,
  Loader,
  Loader2,
} from "lucide-react";
import { getIsProUser } from "../lib/sessionHelper/sessionHelper";
import { Button } from "../components/ui/button";
import { getCurrencySymbol } from "@/lib/countryUtils";

import { useSelector } from "react-redux";
import LockedCard from "../components/reportPageComponents/lockCard";
import { ResumeReportPageLoading } from "../components/loader/resumeReportLoading";
import { Card } from "../components/ui/card";
import { useAuth } from "@clerk/clerk-react";
import { exportPdfRequest } from "../APIRequest/exportPdfApi";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useGetAnalysisVersionQuery } from "../features/apiSlice";
import UserTierBadge from "../components/userTierBadge/userTierBadge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../components/ui/tooltip";
import DataNotFoundPage from "../components/dataNotFound/dataNotFound";
const ResumeReportPage = () => {
  const [searchParams] = useSearchParams();
  const analysisId = searchParams.get("analysisid");
  const isProUser = getIsProUser();
  const [copySuccess, setCopySuccess] = useState(false);
  const [exportPdfLoading, setExportPdfLoading] = useState(false);
  const isPro = getIsProUser();

  const analysisResult = useSelector(
    (state) => state.createResumeAnalysis.createResumeAnalysis
  );
  const { data, isLoading } = useGetAnalysisVersionQuery(analysisId, {
    skip: !analysisId,
  });
  let analysis = analysisResult?.analysisResult || analysisResult;
  console.log("analysis analysis  ", analysis);

  if (analysisId) {
    analysis = data?.data;
  }

  const { getToken } = useAuth();
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getSeverityColor = (severity) => {
    if (severity >= 75) return "text-red-600 bg-red-50";
    if (severity >= 50) return "text-orange-600 bg-orange-50";
    return "text-yellow-600 bg-yellow-50";
  };

  const handleCopyPitch = async () => {
    if (analysis.premiumInsights?.recruiterPitch) {
      const pitchText = analysis?.premiumInsights?.recruiterPitch?.join("\n• ");
      const fullText = `Recruiter Pitch:\n\n• ${pitchText}`;

      try {
        await navigator.clipboard.writeText(fullText);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleExport = async () => {
    setExportPdfLoading(true);
    const token = await getToken();

    try {
      const targetId = analysisId || analysisResult?.analysisId;
      if (!targetId) {
        toast.error("Analysis ID not found");
        return;
      }

      const result = await exportPdfRequest(targetId, token);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      const blob = result.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resume-analysis-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("PDF downloaded successfully!");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to download PDF");
    } finally {
      setExportPdfLoading(false);
    }
  };

  const handleShare = () => {
    alert("Share not available. Comming soon!");
  };
  const handleSetReminder = () => {
    alert("Set reminder not available. Comming soon!");
  };

  return (
    <>
      {isLoading ? (
        <ResumeReportPageLoading />
      ) : analysis?.length === 0 || analysis == undefined ? (
        <DataNotFoundPage />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <UserTierBadge isPro={isPro} />

            {/* Personal Info Card with Action Buttons */}
            <Card className="bg-white border-gray-200 p-4 sm:p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {analysis?.resumeSections?.personalInfo?.fullName
                      ? analysis?.resumeSections?.personalInfo?.fullName
                      : "N/A"}
                  </h1>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      <span className="truncate">
                        {analysis?.resumeSections?.personalInfo?.email
                          ? analysis?.resumeSections?.personalInfo?.email
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" />
                      <span className="truncate">
                        {analysis?.resumeSections?.personalInfo?.phone
                          ? analysis?.resumeSections?.personalInfo?.phone
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="truncate">
                        {analysis?.resumeSections?.personalInfo?.location
                          ? analysis?.resumeSections?.personalInfo?.location
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe size={16} className="text-gray-400" />
                      <a
                        href={
                          analysis?.resumeSections?.personalInfo?.portfolio
                            ? analysis?.resumeSections?.personalInfo?.portfolio
                            : "#"
                        }
                        className="text-blue-600 hover:underline truncate"
                      >
                        {analysis?.resumeSections?.personalInfo?.portfolio
                          ? analysis?.resumeSections?.personalInfo?.portfolio
                          : "N/A"}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4">
                  {/* Persona and Industry */}
                  <div className="flex flex-row sm:flex-row lg:flex-col gap-4 sm:gap-6 lg:gap-0 lg:text-right">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Persona</div>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                        {analysis?.persona?.replace("_", " ")}
                      </span>
                    </div>
                    <div className="lg:mt-2">
                      <div className="text-sm text-gray-500 mb-1 lg:mt-2">
                        Industry
                      </div>
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium capitalize">
                        {analysis?.industry}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons - Responsive Layout */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="w-full sm:w-auto">
                            <Button
                              onClick={handleExport}
                              disabled={exportPdfLoading || !isPro}
                              type="button"
                              className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              {exportPdfLoading ? (
                                <Loader2 size={18} className="animate-spin" />
                              ) : (
                                <Download size={18} />
                              )}
                              <span className="sm:inline">Export PDF</span>
                            </Button>
                          </span>
                        </TooltipTrigger>
                        {!isPro && (
                          <TooltipContent side="top">
                            <p className="text-gray-700 mb-1">
                              Please upgrade to Pro to export PDF
                            </p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>

                    <div className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="flex-1 sm:flex-initial">
                              <Button
                                disabled={!isPro}
                                onClick={handleShare}
                                type="button"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
                              >
                                <Share2 size={18} />
                                <span className="sm:inline">Share</span>
                              </Button>
                            </span>
                          </TooltipTrigger>
                          {!isPro && (
                            <TooltipContent side="bottom">
                              <p className="text-gray-700 mb-1">
                                Please upgrade to Pro to share
                              </p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="flex-1 sm:flex-initial">
                              <Button
                                disabled={!isPro}
                                onClick={handleSetReminder}
                                type="button"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
                              >
                                <Bell size={18} />
                                <span className="hidden sm:inline">
                                  Set Reminder
                                </span>
                                <span className="sm:hidden">Reminder</span>
                              </Button>
                            </span>
                          </TooltipTrigger>
                          {!isPro && (
                            <TooltipContent side="bottom">
                              <p className="text-gray-700 mb-1">
                                Please upgrade to Pro to set reminder
                              </p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT COLUMN - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Overall Score */}
                <Card className="bg-white  border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Overall Score
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Based on comprehensive analysis
                      </p>
                    </div>
                    <div
                      className={`text-5xl font-bold ${getScoreColor(
                        analysis?.scores?.overall
                      )} px-6 py-3 rounded-xl`}
                    >
                      {analysis?.scores?.overall}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(analysis?.breakdown || {}).map(
                      ([key, value]) => (
                        <div key={key}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="capitalize text-gray-700 font-medium">
                              {key}
                            </span>
                            <span className="font-semibold text-gray-900">
                              {value}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${getScoreBgColor(
                                value
                              )} transition-all duration-500`}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </Card>

                {/* Job Fit Analysis */}
                <Card className="bg-white border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="text-blue-600" size={24} />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Job Fit Analysis
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {analysis?.jobFit?.score}%
                      </div>
                      <div className="text-xs text-gray-600">Overall Fit</div>
                    </div>
                    <div className="text-center p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {analysis?.jobFit?.keywordMatch}%
                      </div>
                      <div className="text-xs text-gray-600">
                        Keywords Match
                      </div>
                    </div>
                    <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                      <div className="text-3xl font-bold text-purple-600 mb-1">
                        {analysis?.jobFit?.skillsAlignment}%
                      </div>
                      <div className="text-xs text-gray-600">
                        Skills Alignment
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-blue-600 flex-shrink-0 mt-0.5"
                      />
                      {analysis?.jobFit?.benchmark}
                    </p>
                  </div>
                </Card>

                {/* Interview Probability - Pro Only */}
                {isProUser && analysis?.interview ? (
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50   border-green-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="text-green-600" size={24} />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Interview Probability
                      </h2>
                      <span className="ml-auto px-3 py-1 bg-green-600 text-white text-xs rounded-full font-semibold">
                        PRO
                      </span>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="flex-shrink-0">
                        <div className="relative w-40 h-40">
                          <svg className="w-40 h-40 transform -rotate-90">
                            <circle
                              cx="80"
                              cy="80"
                              r="70"
                              stroke="#e5e7eb"
                              strokeWidth="14"
                              fill="none"
                            />
                            <circle
                              cx="80"
                              cy="80"
                              r="70"
                              stroke="#10b981"
                              strokeWidth="14"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 70}`}
                              strokeDashoffset={`${
                                2 *
                                Math.PI *
                                70 *
                                (1 - analysis?.interview?.probability / 100)
                              }`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-green-600">
                              {analysis?.interview?.probability}%
                            </span>
                            <span className="text-xs text-gray-600">
                              Likely
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <p className="text-gray-700 mb-3 text-lg">
                          {analysis?.interview?.rationale}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">
                              Confidence:{" "}
                              <strong>
                                {(
                                  analysis?.interview?.confidence * 100
                                ).toFixed(0)}
                                %
                              </strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users size={14} className="text-gray-400" />
                            <span className="text-gray-600">
                              {analysis?.interview?.benchmark}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  !isProUser && (
                    <LockedCard
                      icon={<Briefcase size={24} />}
                      title="Interview Probability"
                      description="See your chances of getting an interview call based on 850+ similar profiles in your region"
                    />
                  )
                )}

                {/* Salary Benchmark - Pro Only */}
                {isProUser && analysis?.salary ? (
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50   border-blue-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign className="text-blue-600" size={24} />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Salary Benchmark
                      </h2>
                      <span className="ml-auto px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-semibold">
                        PRO
                      </span>
                    </div>

                    {(() => {
                      // ✅ Dynamic currency symbol
                      const currencySymbol = getCurrencySymbol(
                        analysis?.salary?.currency || "USD"
                      );

                      return (
                        <>
                          <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                              <div className="text-sm text-gray-600 mb-2">
                                Expected Range
                              </div>
                              <div className="text-3xl font-bold text-blue-600">
                                {currencySymbol}
                                {analysis?.salary?.min
                                  ? analysis?.salary?.min?.toLocaleString()
                                  : 0}{" "}
                                - {currencySymbol}
                                {analysis?.salary?.max
                                  ? analysis?.salary?.max?.toLocaleString()
                                  : 0}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {analysis?.salary?.currency} per month
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600 mb-2">
                                Your Ask
                              </div>
                              <div className="text-3xl font-bold text-gray-900">
                                {currencySymbol}
                                {analysis?.salary?.desired?.toLocaleString()}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                                <CheckCircle size={14} />
                                Within range
                              </div>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <div className="text-xs text-gray-600 mb-3 flex items-center justify-between">
                              <span>Salary Percentiles</span>
                              <span className="text-blue-600 font-medium">
                                Confidence: {analysis?.salary?.confidence}%
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  25th Percentile
                                </span>
                                <span className="font-semibold">
                                  {currencySymbol}
                                  {analysis?.premiumInsights?.salaryPercentiles?.p25?.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  50th Percentile (Median)
                                </span>
                                <span className="font-semibold text-blue-600">
                                  {currencySymbol}
                                  {analysis?.premiumInsights?.salaryPercentiles?.p50?.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  75th Percentile
                                </span>
                                <span className="font-semibold">
                                  {currencySymbol}
                                  {analysis?.premiumInsights?.salaryPercentiles?.p75?.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </Card>
                ) : (
                  !isProUser && (
                    <LockedCard
                      icon={<DollarSign size={24} />}
                      title="Salary Benchmark"
                      description="Get personalized salary ranges with percentile breakdowns and negotiation insights"
                    />
                  )
                )}

                {/* Market Insights - Pro Only */}
                {isProUser && analysis?.marketInsights ? (
                  <Card className="bg-white  border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="text-purple-600" size={24} />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Market Insights
                      </h2>
                      <span className="ml-auto px-3 py-1 bg-purple-600 text-white text-xs rounded-full font-semibold">
                        PRO
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="text-green-600" size={20} />
                          <span className="text-xs text-gray-600">
                            Demand Trend
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          {analysis?.trends?.monthlyGrowth}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Monthly growth
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="text-orange-600" size={20} />
                          <span className="text-xs text-gray-600">
                            Competition
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-orange-600">
                          {analysis?.marketInsights?.competitionLevel}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Market saturation
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="text-blue-600" size={20} />
                          <span className="text-xs text-gray-600">
                            Best Timing
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          {analysis?.marketInsights?.optimalTiming}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          To apply
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="text-purple-600" size={20} />
                          <span className="text-xs text-gray-600">
                            Regional Demand
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">
                          High
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          In {analysis?.region}
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        Demand Drivers
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {analysis?.marketInsights?.demandDrivers?.map(
                          (driver, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white border border-purple-200 rounded-full text-sm text-gray-700"
                            >
                              {driver}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Trend Sparkline */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900 mb-3">
                        12-Month Trend
                      </div>
                      <div className="h-16 flex items-end gap-1">
                        {analysis?.premiumInsights?.trendDrilldown?.sparkline?.map(
                          (value, idx) => (
                            <div
                              key={idx}
                              className="flex-1 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t"
                              style={{ height: `${(value / 3) * 100}%` }}
                            />
                          )
                        )}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Jan</span>
                        <span>Dec</span>
                      </div>
                    </div>
                  </Card>
                ) : (
                  !isProUser && (
                    <LockedCard
                      icon={<TrendingUp size={24} />}
                      title="Market Insights"
                      description="Access detailed market trends, competition analysis, demand drivers, and optimal timing strategies"
                    />
                  )
                )}

                {/* ATS Coverage - Pro Only */}
                {isProUser && analysis?.premiumInsights?.atsCoverage && (
                  <Card className="bg-white  border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="text-yellow-600" size={24} />
                      <h2 className="text-xl font-semibold text-gray-900">
                        ATS Coverage Analysis
                      </h2>
                      <span className="ml-auto px-3 py-1 bg-yellow-600 text-white text-xs rounded-full font-semibold">
                        PRO
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-3xl font-bold text-green-600">
                          {analysis?.premiumInsights?.atsCoverage?.exactPct}%
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Exact Match
                        </div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-3xl font-bold text-blue-600">
                          {analysis?.premiumInsights?.atsCoverage?.partialPct}%
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Partial Match
                        </div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-3xl font-bold text-purple-600">
                          {analysis?.premiumInsights?.atsCoverage?.stemPct}%
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Stem Match
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-900 mb-3">
                        Missing High-Impact Keywords
                      </div>
                      <div className="space-y-2">
                        {analysis?.premiumInsights?.atsCoverage?.missing?.map(
                          (item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                            >
                              <span className="font-medium text-gray-900">
                                {item.term}
                              </span>
                              <div className="flex items-center gap-2">
                                <div className="text-xs text-gray-600">
                                  Impact:
                                </div>
                                <div className="w-20 h-2 bg-gray-200 rounded-full">
                                  <div
                                    className="h-2 bg-red-500 rounded-full"
                                    style={{ width: `${item.weight * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm font-semibold text-red-600">
                                  {(item.weight * 100).toFixed(0)}%
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </Card>
                )}

                {/* Skill Gaps - Pro Only */}
                {isProUser && analysis?.premiumInsights?.skillGaps && (
                  <Card className="bg-white  border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="text-orange-600" size={24} />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Critical Skill Gaps
                      </h2>
                      <span className="ml-auto px-3 py-1 bg-orange-600 text-white text-xs rounded-full font-semibold">
                        PRO
                      </span>
                    </div>

                    <div className="space-y-3">
                      {analysis?.premiumInsights?.skillGaps?.map((gap, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">
                              {gap?.skill}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(
                                gap?.severity
                              )}`}
                            >
                              Severity: {gap?.severity}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                              style={{ width: `${gap?.severity}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Impact Analysis - Pro Only */}
                {isProUser && analysis?.premiumInsights?.impact && (
                  <Card className="bg-white  border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="text-yellow-600" size={24} />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Impact Analysis
                      </h2>
                      <span className="ml-auto px-3 py-1 bg-yellow-600 text-white text-xs rounded-full font-semibold">
                        PRO
                      </span>
                    </div>

                    <div className="space-y-4">
                      {analysis?.premiumInsights?.impact?.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900 capitalize">
                              {item?.section}
                            </span>
                            <span className="text-2xl font-bold text-yellow-600">
                              {item?.score}%
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 flex items-start gap-2">
                            <CheckCircle
                              size={16}
                              className="text-yellow-600 flex-shrink-0 mt-0.5"
                            />
                            {item?.evidence}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          Your Competitiveness Percentile
                        </span>
                        <span className="text-3xl font-bold text-blue-600">
                          {analysis?.premiumInsights?.compPercentile}th
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        You're ahead of{" "}
                        {analysis?.premiumInsights?.compPercentile}% of
                        candidates in your category
                      </p>
                    </div>
                  </Card>
                )}

                {/* Recruiter Pitch - Pro Only */}
                {isProUser && analysis?.premiumInsights?.recruiterPitch && (
                  <Card className="bg-gradient-to-br from-indigo-50 to-purple-50   border-indigo-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageSquare className="text-indigo-600" size={24} />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Recruiter Pitch
                      </h2>
                      <span className="ml-auto px-3 py-1 bg-indigo-600 text-white text-xs rounded-full font-semibold">
                        PRO
                      </span>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-indigo-200">
                      <ul className="space-y-2">
                        {analysis?.premiumInsights?.recruiterPitch?.length >
                        0 ? (
                          <>
                            {analysis?.premiumInsights?.recruiterPitch?.map(
                              (point, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-sm text-gray-700"
                                >
                                  <CheckCircle
                                    size={16}
                                    className="text-indigo-600 flex-shrink-0 mt-0.5"
                                  />
                                  {point}
                                </li>
                              )
                            )}
                          </>
                        ) : (
                          <li className="flex items-start gap-2 text-sm text-gray-700">
                            N/A
                          </li>
                        )}
                      </ul>
                    </div>

                    <button
                      onClick={handleCopyPitch}
                      disabled={
                        analysis?.premiumInsights?.recruiterPitch?.length < 1
                      }
                      className={`w-full mt-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-copy disabled:bg-indigo-600/60 ${
                        copySuccess
                          ? "bg-green-600 text-white"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {copySuccess ? (
                        <>
                          <CheckCircle size={18} />
                          Copied to Clipboard!
                        </>
                      ) : (
                        <>
                          <Download size={18} />
                          Copy Pitch to Clipboard
                        </>
                      )}
                    </button>
                  </Card>
                )}

                {/* Job Shortlist - Pro Only */}
                {isProUser && analysis?.premiumInsights?.shortlist && (
                  <Card className="bg-white  border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="text-green-600" size={24} />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Recommended Job Matches
                      </h2>
                      <span className="ml-auto px-3 py-1 bg-green-600 text-white text-xs rounded-full font-semibold">
                        PRO
                      </span>
                    </div>

                    <div className="space-y-3">
                      {analysis?.premiumInsights?.shortlist?.map((job, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-green-50 rounded-lg border border-green-200"
                        >
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {job.title}
                          </h3>
                          <div className="text-sm text-gray-600 mb-2">
                            Requirements:
                          </div>
                          <ul className="space-y-1">
                            {job?.requirements?.map((req, reqIdx) => (
                              <li
                                key={reqIdx}
                                className="flex items-center gap-2 text-sm text-gray-700"
                              >
                                <CheckCircle
                                  size={14}
                                  className="text-green-600 flex-shrink-0"
                                />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Red Flags - Pro Only */}
                {isProUser &&
                  analysis?.premiumInsights?.redFlags &&
                  analysis?.premiumInsights?.redFlags?.length > 0 && (
                    <Card className="bg-red-50  border-red-200 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="text-red-600" size={24} />
                        <h2 className="text-xl font-semibold text-gray-900">
                          Areas of Concern
                        </h2>
                        <span className="ml-auto px-3 py-1 bg-red-600 text-white text-xs rounded-full font-semibold">
                          PRO
                        </span>
                      </div>

                      <div className="space-y-2">
                        {analysis?.premiumInsights?.redFlags?.map(
                          (flag, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 p-3 bg-white rounded-lg border border-red-200"
                            >
                              <AlertCircle
                                size={18}
                                className="text-red-600 flex-shrink-0 mt-0.5"
                              />
                              <span className="text-sm text-gray-700">
                                {flag}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </Card>
                  )}

                {/* Manager View - Pro Only */}
                {isProUser && analysis?.managerView ? (
                  <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-slate-300 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="text-slate-700" size={24} />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Manager View
                      </h2>
                      <span className="ml-auto px-3 py-1 bg-slate-700 text-white text-xs rounded-full font-semibold">
                        PRO
                      </span>
                    </div>

                    {/* Executive Summary */}
                    <div className="bg-white rounded-lg p-4 border border-slate-300 mb-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Eye size={16} className="text-slate-600" />
                        Executive Summary
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {analysis?.managerView?.summary}
                      </p>
                    </div>

                    {/* Must-Have Coverage */}
                    <div className="bg-white rounded-lg p-4 border border-slate-300 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Must-Have Requirements Coverage
                        </h3>
                        <span
                          className={`text-2xl font-bold ${
                            analysis?.managerView?.mustHaveCoverage >= 80
                              ? "text-green-600"
                              : analysis?.managerView?.mustHaveCoverage >= 60
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {analysis?.managerView?.mustHaveCoverage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${
                            analysis?.managerView?.mustHaveCoverage >= 80
                              ? "bg-green-500"
                              : analysis?.managerView?.mustHaveCoverage >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${analysis?.managerView?.mustHaveCoverage}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>Minimum Required: 60%</span>
                        <span>Ideal: 80%+</span>
                      </div>
                    </div>

                    {/* Manager's Red Flags */}
                    {analysis?.managerView?.redFlags &&
                      analysis?.managerView?.redFlags?.length > 0 && (
                        <div className="bg-white rounded-lg p-4 border border-slate-300 mb-4">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <AlertTriangle
                              size={16}
                              className="text-orange-600"
                            />
                            Hiring Manager Concerns
                          </h3>
                          <div className="space-y-2">
                            {analysis?.managerView?.redFlags?.map(
                              (flag, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2 p-2 bg-orange-50 rounded border border-orange-200"
                                >
                                  <div className="flex-shrink-0 w-5 h-5 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    !
                                  </div>
                                  <span className="text-sm text-gray-700">
                                    {flag}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Quick Decision Aid */}
                    <div className="p-4 bg-slate-700 text-white rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-slate-300 mb-1">
                            Recommendation
                          </div>
                          <div className="font-semibold">
                            {analysis?.managerView?.mustHaveCoverage >= 75
                              ? "✅ Strong Candidate - Move to Interview"
                              : analysis?.managerView?.mustHaveCoverage >= 60
                              ? "⚠️ Consider - Review with Team"
                              : "❌ Below Threshold - May Need Upskilling"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-300">
                            Interview Priority
                          </div>
                          <div className="text-lg font-bold">
                            {analysis?.managerView?.mustHaveCoverage >= 75
                              ? "High"
                              : analysis?.managerView?.mustHaveCoverage >= 60
                              ? "Medium"
                              : "Low"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  !isProUser && (
                    <LockedCard
                      icon={<Shield size={24} />}
                      title="Manager View"
                      description="Get hiring manager perspective with executive summary, must-have requirements coverage score, and decision-making insights for screening candidates effectively"
                      hints={[
                        "Executive summary for quick candidate assessment",
                        "Must-have requirements coverage percentage",
                        "Hiring manager specific red flags and concerns",
                        "Interview priority recommendation",
                      ]}
                    />
                  )
                )}
              </div>

              {/* RIGHT COLUMN - Sidebar */}
              <div className="space-y-6">
                {/* Top Priority Actions */}
                <Card className="bg-white   border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="text-orange-600" size={20} />
                    <h3 className="font-semibold text-gray-900">
                      Top Priority Actions
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {analysis?.suggestions
                      .filter((s) => s.priority === 1)
                      .slice(0, 3)
                      .map((suggestion, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200"
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 mb-1">
                              {suggestion?.text}
                            </p>
                            <span className="text-xs text-orange-600 font-medium px-2 py-1 bg-orange-100 rounded">
                              {suggestion?.targetSection}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>

                  {!isProUser && (
                    <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                      <Lock
                        className="mx-auto text-purple-600 mb-2"
                        size={24}
                      />
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        More Suggestions Available
                      </p>
                      <button className="text-sm text-purple-600 font-medium hover:underline">
                        Upgrade to Pro
                      </button>
                    </div>
                  )}
                </Card>

                {/* ATS Quick Actions */}
                {(Array.isArray(analysis?.premiumInsights)
                  ? analysis?.premiumInsights
                  : analysis?.premiumInsights?.atsCoverage?.top3Actions) && (
                  <Card className="bg-gradient-to-br from-green-50 to-teal-50   border-green-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="text-green-600" size={20} />
                      <h3 className="font-semibold text-gray-900">
                        ATS Quick Wins
                      </h3>
                    </div>

                    <ul className="space-y-2">
                      {(Array.isArray(analysis?.premiumInsights)
                        ? analysis.premiumInsights
                        : analysis.premiumInsights.atsCoverage.top3Actions
                      ).map((action, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-700 p-2 bg-white rounded border border-green-200"
                        >
                          <ArrowRight
                            size={16}
                            className="text-green-600 flex-shrink-0 mt-0.5"
                          />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Skills Overview */}
                <Card className="bg-white   border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Skills Overview
                  </h3>

                  <div className="mb-4">
                    <div className="text-xs text-gray-600 mb-2 font-medium">
                      Current Skills ({analysis?.optimization?.skills?.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysis?.optimization?.skills?.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-600 mb-2 font-medium">
                      Missing Keywords (
                      {analysis?.optimization?.keywordGaps?.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysis?.optimization?.keywordGaps?.map((gap, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium"
                        >
                          + {gap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {isProUser &&
                    analysis?.premiumInsights?.trendDrilldown?.risingSkills && (
                      <div>
                        <div className="text-xs text-gray-600 mb-2 font-medium">
                          Rising Skills
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysis?.premiumInsights?.trendDrilldown?.risingSkills?.map(
                            (skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1"
                              >
                                <TrendingUp size={12} />
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </Card>

                {/* Career Paths */}
                <Card className="bg-white border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Career Paths
                  </h3>

                  {analysis?.careerPaths?.map((path, idx) => (
                    <div key={idx} className="mb-4">
                      <div className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Briefcase size={16} className="text-blue-600" />
                        {path.industry}
                      </div>
                      <div className="space-y-1 ml-6">
                        {path?.roles?.map((role, roleIdx) => (
                          <div
                            key={roleIdx}
                            className="flex items-center gap-2 text-sm text-gray-600 py-1"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            {role}
                          </div>
                        ))}
                      </div>

                      {isProUser && path?.accelerators && (
                        <div className="mt-3 ml-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-xs font-medium text-gray-700 mb-2">
                            Career Accelerators:
                          </div>
                          {path?.accelerators.map((acc, accIdx) => (
                            <div
                              key={accIdx}
                              className="flex items-center gap-2 text-xs text-gray-600"
                            >
                              <Zap size={12} className="text-blue-600" />
                              {acc}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </Card>

                {/* Certifications & Courses - Pro */}
                {isProUser && analysis?.premiumInsights?.certsAndCourses && (
                  <Card className="bg-gradient-to-br from-yellow-50 to-orange-50    border-yellow-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="text-yellow-600" size={20} />
                      <h3 className="font-semibold text-gray-900">
                        Recommended Certificates
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {analysis?.premiumInsights?.certsAndCourses?.map(
                        (cert, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-white rounded-lg border border-yellow-200 flex items-start gap-2"
                          >
                            <Star
                              size={16}
                              className="text-yellow-600 flex-shrink-0 mt-0.5"
                            />
                            <span className="text-sm text-gray-700">
                              {cert}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </Card>
                )}

                {/* Optimization Summary - Free users only see limited */}
                {!isProUser &&
                  analysis?.optimization?.certifications &&
                  analysis?.optimization?.certifications?.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <Lock className="text-purple-600 mb-2" size={20} />
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Recommended Certifications
                        </p>
                        <button className="text-sm text-purple-600 font-medium hover:underline">
                          Upgrade to see details
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Resume Sections - Full Width */}
            <Card className="mt-6 bg-white border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={24} className="text-blue-600" />
                Resume Content Analysis
              </h2>

              {/* Summary */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Professional Summary
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  {analysis?.resumeSections?.summary?.content}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {analysis?.resumeSections?.summary?.experienceYears} years
                    experience
                  </span>
                  {analysis?.resumeSections?.summary?.keyPoints
                    .slice(0, 3)
                    .map((point, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded"
                      >
                        {point}
                      </span>
                    ))}
                </div>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Work Experience
                </h3>
                <div className="space-y-4">
                  {analysis?.resumeSections?.experience?.map((exp, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {exp?.jobTitle}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {exp?.company}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {exp?.duration || "Present"}
                        </span>
                      </div>
                      {exp?.responsibilities?.length > 0 && (
                        <ul className="space-y-1 mt-2">
                          {exp?.responsibilities?.map((resp, respIdx) => (
                            <li
                              key={respIdx}
                              className="text-sm text-gray-700 flex items-start gap-2"
                            >
                              <span className="text-gray-400 mt-1">•</span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis?.resumeSections?.projects?.map((project, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                    >
                      <h4 className="font-medium text-gray-900 mb-2">
                        {project?.name}
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        {project?.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project?.technologies?.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project?.keyFeatures &&
                        project?.keyFeatures?.length > 0 && (
                          <details className="mt-2">
                            <summary className="text-xs text-blue-600 cursor-pointer hover:underline">
                              Key Features
                            </summary>
                            <ul className="mt-2 space-y-1">
                              {project?.keyFeatures?.map((feature, featIdx) => (
                                <li
                                  key={featIdx}
                                  className="text-xs text-gray-600 flex items-start gap-1"
                                >
                                  <CheckCircle
                                    size={12}
                                    className="text-blue-600 flex-shrink-0 mt-0.5"
                                  />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </details>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Education</h3>
                <div className="space-y-3">
                  {analysis?.resumeSections?.education?.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-purple-50 rounded-lg border border-purple-200"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {edu?.degree}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {edu?.institution}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {edu?.graduationYear}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Breakdown */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Complete Skills Inventory
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(analysis?.resumeSections?.skills || {}).map(
                    ([category, skills]) =>
                      skills &&
                      skills?.length > 0 && (
                        <div
                          key={category}
                          className="p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="text-xs font-medium text-gray-600 mb-2 capitalize">
                            {category}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {skills?.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-700"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </Card>

            {/* Improvements Section */}
            {analysis?.improvements && (
              <Card className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Lightbulb size={24} className="text-green-600" />
                  AI-Powered Improvements
                </h2>

                {analysis?.improvements?.summary && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Improved Summary
                    </h3>
                    <div className="p-4 bg-white rounded-lg border border-green-200">
                      <p className="text-sm text-gray-700 mb-3">
                        {analysis?.improvements?.summary?.after}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-green-600 font-medium">
                          Keywords Added:
                        </span>
                        {analysis?.improvements?.summary?.keywordsAdded?.map(
                          (keyword, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium"
                            >
                              + {keyword}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {analysis?.improvements?.skills && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Optimized Skills Grouping
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(
                        analysis?.improvements?.skills?.afterGrouped
                      ).map(([category, skills]) => (
                        <div
                          key={category}
                          className="p-3 bg-white rounded-lg border border-green-200"
                        >
                          <div className="text-xs font-medium text-gray-700 mb-2">
                            {category}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {skills?.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeReportPage;
