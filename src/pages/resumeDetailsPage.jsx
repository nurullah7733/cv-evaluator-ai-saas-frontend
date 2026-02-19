import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { getCurrencySymbol } from "../lib/countryUtils";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  TrendingUp,
  DollarSign,
  FileText,
  CheckCircle2,
  AlertCircle,
  Download,
  Share2,
  Clock,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  Star,
  Zap,
  BarChart3,
  Users,
  Lightbulb,
  ArrowRight,
  Calendar,
  Building,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetResumeDetailsQuery } from "../features/apiSlice";
import ResumeDetailsLoading from "../components/loader/resumeDetailsPageLoader";
import DataNotFoundPage from "../components/dataNotFound/dataNotFound";
import {
  LockedMetricCard,
  UpgradeCard,
} from "../components/upgradeCards/upgradeCTAComponents";
import { getIsProUser } from "../lib/sessionHelper/sessionHelper";
import UserTierBadge from "../components/userTierBadge/userTierBadge";
// Utility function to get score color
const getScoreColor = (score) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
};

const getPriorityColor = (priority) => {
  if (priority === 1) return "bg-red-600";
  if (priority === 2) return "bg-amber-600";
  return "bg-blue-600";
};

export default function ResumeDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetResumeDetailsQuery(id);

  const [activeTab, setActiveTab] = useState("overview");
  const analysis = data?.data?.[0]?.analysesData?.[0];
  const personal = data?.data?.[0]?.resumeSections?.personalInfo;
  const summary = data?.data?.[0]?.resumeSections?.summary;
  const experience = data?.data?.[0]?.resumeSections?.experience;
  const education = data?.data?.[0]?.resumeSections?.education;
  const skills = data?.data?.[0]?.resumeSections?.skills;
  const certifications = data?.data?.[0]?.resumeSections?.certifications;
  const currencySymbol = getCurrencySymbol(analysis?.salary?.currency || "USD");

  const isPro = getIsProUser();

  const handleDownload = () => {
    window.open(data?.data[0]?.fileUrl, "_blank");
  };

  const handleShare = () => {
    alert("Share functionality to be implemented");
  };

  return (
    <>
      {isLoading ? (
        <ResumeDetailsLoading />
      ) : data?.status === "fail" ||
        data == undefined ||
        data?.data?.length === 0 ? (
        <DataNotFoundPage />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-6 py-8">
            {/* free user tier badge in header */}
            <UserTierBadge isPro={isPro} />
            {/* Key Metrics Overview */}
            <Card className="mb-8 bg-white p-7">
              {/* Header */}
              <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
                <div className="flex  items-center gap-4">
                  <div className="">
                    <h1 className="text-2xl font-bold  !break-words text-gray-900">
                      {personal?.fullName}
                    </h1>
                    <p className="text-sm text-gray-600 mt-1 text-wrap">
                      {data?.data?.[0]?.originalFilename}
                      <span className="hidden sm:inline">
                        {" "}
                        • Latest Analyzed on
                      </span>
                      <span className="font-medium ml-1 hidden sm:inline">
                        {new Date(
                          data?.data?.[0]?.createdAt
                        )?.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                    <p className=" text-sm block sm:hidden text-gray-600">
                      • Latest Analyzed on
                      <span className="font-medium ml-1">
                        {" "}
                        {new Date(
                          data?.data?.[0]?.createdAt
                        )?.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                  <Button
                    variant="outline"
                    className="border-2 border-gray-200 hover:bg-gray-200 text-gray-700"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Link to={`/dashboard?analysisid=${analysis?._id}`}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Analysis dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={handleDownload}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
              </div>

              {/* Overview items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Overall Score */}
                <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <Target className="h-8 w-8 text-blue-600" />
                      <Badge className="bg-blue-600 text-white">Overall</Badge>
                    </div>
                    <div
                      className={`text-5xl font-bold mb-2 ${getScoreColor(
                        analysis?.scores?.overall
                      )}`}
                    >
                      {analysis?.scores?.overall}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Overall Score</p>
                    <Progress
                      value={analysis?.scores?.overall}
                      className="h-2"
                    />
                  </CardContent>
                </Card>

                {/* Job Fit */}
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                      <Badge className="bg-green-600 text-white">Job Fit</Badge>
                    </div>
                    <div
                      className={`text-5xl font-bold mb-2 ${getScoreColor(
                        analysis?.jobFit?.score
                      )}`}
                    >
                      {analysis?.jobFit?.score}%
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Match Score</p>
                    <Progress value={analysis?.jobFit?.score} className="h-2" />
                  </CardContent>
                </Card>

                {/* Interview Probability */}
                {isPro ? (
                  <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <Users className="h-8 w-8 text-purple-600" />
                        <Badge className="bg-purple-600 text-white">
                          Interview
                        </Badge>
                      </div>
                      <div
                        className={`text-5xl font-bold mb-2 ${getScoreColor(
                          analysis?.interview?.probability
                        )}`}
                      >
                        {analysis?.interview?.probability}%
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Probability</p>
                      <Progress
                        value={analysis?.interview?.probability}
                        className="h-2"
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <LockedMetricCard
                    title="Interview Probability"
                    icon={Users}
                  />
                )}

                {/* Salary Range */}
                {isPro ? (
                  <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <DollarSign className="h-8 w-8 text-amber-600" />
                        <Badge className="bg-amber-600 text-white">
                          Salary
                        </Badge>
                      </div>
                      {console.log(analysis?.salary, "analysis?.salary")}
                      <div className="text-3xl font-bold text-amber-600 mb-2">
                        {currencySymbol}
                        {(analysis?.salary?.min / 1000).toFixed(0)}k -{" "}
                        {currencySymbol}
                        {(analysis?.salary?.max / 1000).toFixed(0)}k
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Expected Range
                      </p>
                      <p className="text-xs text-gray-500">
                        {analysis?.salary?.confidence}% confidence
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <LockedMetricCard title="Expected Range" icon={Users} />
                )}
              </div>
            </Card>

            {/* Tabbed Content */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-2 gap-3 sm:grid-cols-5 rounded-lg sm:!mb-0 !mb-28">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 bg-gray-200  cursor-pointer "
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="analysis"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 bg-gray-200 cursor-pointer"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analysis
                </TabsTrigger>
                <TabsTrigger
                  value="suggestions"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 bg-gray-200  cursor-pointer "
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Suggestions
                </TabsTrigger>
                <TabsTrigger
                  value="improvements"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 bg-gray-200 cursor-pointer "
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Improvements
                </TabsTrigger>
                <TabsTrigger
                  value="market"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 bg-gray-200 cursor-pointer"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Market
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Personal Information */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium text-gray-900">
                            {personal?.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium text-gray-900">
                            {personal?.phone}
                          </p>
                        </div>
                      </div>
                      {personal?.location && (
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Location</p>
                            <p className="font-medium text-gray-900">
                              {personal?.location}
                            </p>
                          </div>
                        </div>
                      )}
                      {personal?.linkedin && (
                        <div className="flex items-center gap-3">
                          <Linkedin className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">LinkedIn</p>
                            <a
                              href={personal?.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:underline"
                            >
                              View Profile
                            </a>
                          </div>
                        </div>
                      )}
                      {personal?.github && (
                        <div className="flex items-center gap-3">
                          <Github className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">GitHub</p>
                            <a
                              href={personal?.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:underline"
                            >
                              View Profile
                            </a>
                          </div>
                        </div>
                      )}
                      {personal?.portfolio && (
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Portfolio</p>
                            <a
                              href={personal?.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:underline"
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Summary */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Professional Summary
                    </CardTitle>
                    <CardDescription>
                      {summary?.experienceYears} years of experience •{" "}
                      {data?.data[0]?.target?.industry}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {summary?.content}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {summary?.keyPoints?.map((point, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-blue-600 border-blue-300"
                        >
                          {point}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                      Work Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experience?.map((job, idx) => (
                      <div
                        key={idx}
                        className="relative pl-6 border-l-2 border-blue-200"
                      >
                        <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-600" />
                        <div className="mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {job?.jobTitle}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              {job?.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job?.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {job?.startDate} -{" "}
                              {job?.current ? "Present" : job?.endDate}
                            </span>
                            <Badge variant="outline">{job?.duration}</Badge>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {job?.responsibilities?.map((resp, respIdx) => (
                            <li
                              key={respIdx}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Education & Skills Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Education */}
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {education?.map((edu, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {edu?.degree}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {edu?.institution}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>Graduated {edu?.graduationYear}</span>
                            {edu?.location && (
                              <>
                                <span>•</span>
                                <MapPin className="h-4 w-4" />
                                <span>{edu?.location}</span>
                              </>
                            )}
                          </div>
                          {edu?.gpa && (
                            <Badge className="mt-2 bg-blue-600 text-white">
                              GPA: {edu?.gpa}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Certifications */}
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-blue-600" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {certifications?.map((cert, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200"
                        >
                          <div className="flex items-start gap-3">
                            <Award className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {cert?.name}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {Array.isArray(cert?.issuer)
                                  ? cert?.issuer.join(", ")
                                  : cert?.issuer}
                              </p>
                              {cert.dateIssued && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Issued: {cert?.dateIssued}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Skills */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-blue-600" />
                      Skills & Competencies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skills?.programming?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Programming Languages
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skills?.programming?.map((skill, idx) => (
                              <Badge
                                key={idx}
                                className="bg-blue-600 text-white"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {skills?.databases?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Databases
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skills?.databases?.map((skill, idx) => (
                              <Badge
                                key={idx}
                                className="bg-green-600 text-white"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {skills?.tools?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Tools & Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skills?.tools?.map((skill, idx) => (
                              <Badge
                                key={idx}
                                className="bg-purple-600 text-white"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {skills?.technical?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Technical Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skills?.technical?.map((skill, idx) => (
                              <Badge
                                key={idx}
                                className="bg-amber-600 text-white"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {skills?.soft?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Soft Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skills?.soft?.map((skill, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-gray-700 border-gray-300"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analysis Tab */}
              <TabsContent value="analysis" className="space-y-6">
                {/* Score Breakdown */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      Detailed Score Breakdown
                    </CardTitle>
                    <CardDescription>
                      Performance across different resume dimensions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(analysis?.breakdown || {}).map(
                        ([key, value]) => (
                          <div key={key}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700 capitalize">
                                {key}
                              </span>
                              <span
                                className={`text-lg font-bold ${getScoreColor(
                                  value
                                )}`}
                              >
                                {value}%
                              </span>
                            </div>
                            <Progress value={value} className="h-2" />
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Job Fit Analysis */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      Job Fit Analysis
                    </CardTitle>
                    <CardDescription>
                      Target: {data?.data[0]?.target?.lastJdText}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-1">
                          {analysis?.jobFit?.keywordMatch}%
                        </div>
                        <p className="text-sm text-gray-600">Keyword Match</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-1">
                          {analysis?.jobFit?.skillsAlignment}%
                        </div>
                        <p className="text-sm text-gray-600">
                          Skills Alignment
                        </p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-1">
                          {analysis?.jobFit?.score}%
                        </div>
                        <p className="text-sm text-gray-600">Overall Fit</p>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700">
                        <strong>Benchmark:</strong>{" "}
                        {analysis?.jobFit?.benchmark}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Interview Insights */}
                {isPro ? (
                  <Card className="border-2 border-purple-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-600" />
                        Interview Probability Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-5xl font-bold text-purple-600 mb-2">
                            {analysis?.interview?.probability}%
                          </div>
                          <p className="text-sm text-gray-600">
                            Likelihood of getting an interview
                          </p>
                          <Badge className="mt-2 bg-purple-600 text-white">
                            {analysis?.interview?.confidence * 100}% confidence
                          </Badge>
                        </div>
                        <div className="w-32 h-32 relative">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              className="text-gray-200"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={`${
                                (analysis?.interview?.probability / 100) * 352
                              } 352`}
                              className="text-purple-600"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-purple-600">
                              {analysis?.interview?.probability}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Rationale
                          </h4>
                          <p className="text-sm text-gray-700">
                            {analysis?.interview?.rationale}
                          </p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Benchmark:</strong>{" "}
                            {analysis?.interview?.benchmark}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <UpgradeCard
                    feature="Interview Probability Analysis"
                    description="Get AI-powered insights on your interview chances with detailed rationale and benchmarks"
                  />
                )}

                {/* Salary Analysis */}
                {isPro ? (
                  <Card className="border-2 border-amber-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-amber-600" />
                        Salary Analysis
                      </CardTitle>
                      <CardDescription>
                        Based on {analysis?.salary?.region} market •{" "}
                        {analysis?.salary?.confidence}% confidence
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="text-center p-4 bg-amber-50 rounded-lg">
                          <div className="text-3xl font-bold text-amber-600 mb-1">
                            {analysis?.salary?.currency}{" "}
                            {(analysis?.salary?.min / 1000).toFixed(0)}k
                          </div>
                          <p className="text-sm text-gray-600">Minimum</p>
                        </div>
                        <div className="text-center p-4 bg-amber-100 rounded-lg">
                          <div className="text-3xl font-bold text-amber-600 mb-1">
                            {analysis?.salary?.currency}{" "}
                            {(analysis?.salary?.desired / 1000).toFixed(0)}k
                          </div>
                          <p className="text-sm text-gray-600">Your Target</p>
                        </div>
                        <div className="text-center p-4 bg-amber-50 rounded-lg">
                          <div className="text-3xl font-bold text-amber-600 mb-1">
                            {analysis?.salary?.currency}{" "}
                            {(analysis?.salary?.max / 1000).toFixed(0)}k
                          </div>
                          <p className="text-sm text-gray-600">Maximum</p>
                        </div>
                      </div>

                      {analysis?.premiumInsights?.salaryPercentiles && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Market Percentiles
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 bg-gray-50 rounded text-center">
                              <div className="text-xl font-bold text-gray-700">
                                {
                                  analysis?.premiumInsights?.salaryPercentiles
                                    ?.currency
                                }{" "}
                                {(
                                  analysis?.premiumInsights?.salaryPercentiles
                                    ?.p25 / 1000
                                ).toFixed(0)}
                                k
                              </div>
                              <p className="text-xs text-gray-600">
                                25th Percentile
                              </p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded text-center">
                              <div className="text-xl font-bold text-blue-700">
                                {
                                  analysis?.premiumInsights?.salaryPercentiles
                                    ?.currency
                                }{" "}
                                {(
                                  analysis?.premiumInsights?.salaryPercentiles
                                    ?.p50 / 1000
                                ).toFixed(0)}
                                k
                              </div>
                              <p className="text-xs text-gray-600">
                                50th Percentile (Median)
                              </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded text-center">
                              <div className="text-xl font-bold text-gray-700">
                                {
                                  analysis?.premiumInsights?.salaryPercentiles
                                    ?.currency
                                }{" "}
                                {(
                                  analysis?.premiumInsights?.salaryPercentiles
                                    ?.p75 / 1000
                                ).toFixed(0)}
                                k
                              </div>
                              <p className="text-xs text-gray-600">
                                75th Percentile
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <UpgradeCard
                    feature="Salary Benchmarking"
                    description="Get accurate salary ranges, market percentiles, and recommended ask based on your experience and location"
                  />
                )}

                {/* ATS Coverage (Premium) */}
                {analysis?.premiumInsights?.atsCoverage && (
                  <>
                    {/* pro user only  */}
                    <div className={isPro ? "" : "hidden"}>
                      <Card className="border-2 border-blue-200">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-600" />
                            ATS Keyword Coverage
                          </CardTitle>
                          <CardDescription>
                            How well your resume matches with ATS systems
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <div className="text-3xl font-bold text-green-600 mb-1">
                                {
                                  analysis?.premiumInsights?.atsCoverage
                                    ?.exactPct
                                }
                                %
                              </div>
                              <p className="text-sm text-gray-600">
                                Exact Match
                              </p>
                            </div>
                            <div className="text-center p-4 bg-amber-50 rounded-lg">
                              <div className="text-3xl font-bold text-amber-600 mb-1">
                                {
                                  analysis?.premiumInsights?.atsCoverage
                                    ?.partialPct
                                }
                                %
                              </div>
                              <p className="text-sm text-gray-600">
                                Partial Match
                              </p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-3xl font-bold text-blue-600 mb-1">
                                {
                                  analysis?.premiumInsights?.atsCoverage
                                    ?.stemPct
                                }
                                %
                              </div>
                              <p className="text-sm text-gray-600">
                                Stem Match
                              </p>
                            </div>
                          </div>

                          {analysis?.premiumInsights?.atsCoverage?.missing
                            ?.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">
                                Missing High-Value Keywords
                              </h4>
                              <div className="space-y-2">
                                {analysis?.premiumInsights?.atsCoverage?.missing?.map(
                                  (keyword, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                                    >
                                      <span className="font-medium text-gray-900">
                                        {keyword?.term}
                                      </span>
                                      <Badge className="bg-red-600 text-white">
                                        Weight:{" "}
                                        {(keyword?.weight * 100).toFixed(0)}%
                                      </Badge>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    {/* free user only */}
                    <div className={isPro ? "hidden" : ""}>
                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-600" />
                            ATS Quick Tips
                            {!isPro && (
                              <Badge className="ml-2 bg-amber-500">
                                Limited
                              </Badge>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {analysis?.premiumInsights?.atsCoverage
                            ?.top3Actions ? (
                            <div className="space-y-3">
                              {analysis?.premiumInsights?.atsCoverage?.top3Actions?.map(
                                (action, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                                  >
                                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <p className="text-sm text-gray-700">
                                      {action}
                                    </p>
                                  </div>
                                )
                              )}
                              {!isPro && (
                                <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                  <p className="text-sm text-amber-800 font-medium">
                                    🔒 Upgrade to see detailed ATS coverage,
                                    missing keywords, and match percentages
                                  </p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-gray-600">
                              No ATS tips available
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </TabsContent>

              {/* Suggestions Tab */}
              <TabsContent value="suggestions" className="space-y-6">
                <Card className="border-2 border-amber-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-amber-600" />
                      Actionable Recommendations
                    </CardTitle>
                    <CardDescription>
                      Prioritized suggestions to improve your resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis?.suggestions?.map((suggestion, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200"
                        >
                          <div className="flex-shrink-0">
                            <Badge
                              className={`${getPriorityColor(
                                suggestion?.priority
                              )} text-white`}
                            >
                              Priority {suggestion?.priority}
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900  sm:text-base text-sm sm:font-medium mb-1">
                              {suggestion?.text}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                variant="outline"
                                className="text-gray-600 border-gray-300 text-xs"
                              >
                                {suggestion?.targetSection}
                              </Badge>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
                        </div>
                      ))}
                      {!isPro && (
                        <UpgradeCard
                          feature="Complete Suggestions List"
                          description="Get all priority suggestions with detailed implementation guides and examples"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Optimization Tips */}
                {isPro ? (
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-blue-600" />
                        Optimization Checklist
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Keyword Gaps */}
                        {analysis?.optimization?.keywordGaps?.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <AlertCircle className="h-5 w-5 text-red-600" />
                              Missing Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {analysis?.optimization?.keywordGaps?.map(
                                (keyword, idx) => (
                                  <Badge
                                    key={idx}
                                    className="bg-red-600 text-white"
                                  >
                                    {keyword}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* Recommended Certifications */}
                        {analysis?.optimization?.certifications?.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Award className="h-5 w-5 text-amber-600" />
                              Recommended Certifications
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {analysis?.optimization?.certifications?.map(
                                (cert, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3 bg-amber-50 rounded-lg border border-amber-200"
                                  >
                                    <p className="font-medium text-gray-900">
                                      {cert}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* Skills to Highlight */}
                        {analysis?.optimization?.skills?.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Star className="h-5 w-5 text-blue-600" />
                              Skills to Highlight
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {analysis?.optimization?.skills?.map(
                                (skill, idx) => (
                                  <Badge
                                    key={idx}
                                    className="bg-blue-600 text-white"
                                  >
                                    {skill}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <UpgradeCard
                    feature="Optimization Checklist & Insights."
                    description="Get all Optimization Insights with Skill Gap Analysis"
                  />
                )}

                {/* Skill Gaps */}
                {isPro ? (
                  <>
                    {analysis?.premiumInsights?.skillGaps &&
                      analysis?.premiumInsights?.skillGaps?.length > 0 && (
                        <Card className="border-2 border-red-200">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <AlertCircle className="h-5 w-5 text-red-600" />
                              Skill Gap Analysis
                            </CardTitle>
                            <CardDescription>
                              Skills that would significantly improve your
                              profile
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {analysis?.premiumInsights?.skillGaps?.map(
                                (gap, idx) => (
                                  <div
                                    key={idx}
                                    className="p-4 bg-red-50 rounded-lg border border-red-200"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-semibold text-gray-900">
                                        {gap?.skill}
                                      </span>
                                      <Badge className="bg-red-600 text-white">
                                        Severity: {gap?.severity}%
                                      </Badge>
                                    </div>
                                    <Progress
                                      value={gap?.severity}
                                      className="h-2"
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                  </>
                ) : (
                  <UpgradeCard
                    feature="Skill Gap Analysis"
                    description="Identify critical skills missing from your resume that could enhance your job prospects"
                  />
                )}
              </TabsContent>

              {/* Improvements Tab */}
              <TabsContent value="improvements" className="space-y-6">
                {/* Summary Improvement */}
                {analysis?.improvements?.summary && (
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Improved Professional Summary
                      </CardTitle>
                      <CardDescription>
                        {analysis?.improvements?.summary.why}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Original:
                          </p>
                          <p className="text-gray-700 line-through opacity-60">
                            {summary?.content}
                          </p>
                        </div>
                        <ArrowRight className="h-6 w-6 text-green-600 mx-auto" />
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                          <p className="text-sm font-medium text-green-600 mb-2">
                            Improved:
                          </p>
                          <p className="text-gray-900 font-medium">
                            {analysis?.improvements?.summary?.after}
                          </p>
                        </div>
                        {analysis?.improvements?.summary?.keywordsAdded && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              Keywords Added:
                            </span>
                            {analysis?.improvements?.summary?.keywordsAdded?.map(
                              (keyword, idx) => (
                                <Badge
                                  key={idx}
                                  className="bg-green-600 text-white"
                                >
                                  +{keyword}
                                </Badge>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Experience Improvements */}
                {analysis?.improvements?.experience &&
                  analysis?.improvements?.experience?.length > 0 && (
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                          Enhanced Work Experience
                        </CardTitle>
                        <CardDescription>
                          Optimized descriptions with metrics and impact
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {analysis?.improvements?.experience?.map(
                          (improvement, idx) => {
                            const originalJob =
                              experience[improvement?.jobIndex];
                            return (
                              <div key={idx} className="space-y-4">
                                <div>
                                  <h3 className="font-semibold text-gray-900 mb-1">
                                    {originalJob?.jobTitle}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {originalJob?.company} •{" "}
                                    {originalJob?.duration}
                                  </p>
                                </div>

                                <div className="space-y-4">
                                  {improvement?.afterBullets?.map(
                                    (bullet, bulletIdx) => {
                                      const original =
                                        originalJob?.responsibilities[
                                          bulletIdx
                                        ];
                                      const hasChanged = original !== bullet;

                                      return (
                                        <div
                                          key={bulletIdx}
                                          className="space-y-3"
                                        >
                                          {hasChanged ? (
                                            <>
                                              <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                                                <p className="text-xs text-red-600 font-medium mb-1">
                                                  Before:
                                                </p>
                                                <p className="text-sm text-gray-700 line-through opacity-60">
                                                  {original}
                                                </p>
                                              </div>
                                              <div className="flex items-center justify-center">
                                                <ArrowRight className="h-5 w-5 text-green-600" />
                                              </div>
                                              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-600">
                                                <p className="text-xs text-green-600 font-medium mb-1">
                                                  After:
                                                </p>
                                                <p className="text-sm text-gray-900 font-medium">
                                                  {bullet}
                                                </p>
                                              </div>
                                            </>
                                          ) : (
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                              <p className="text-sm text-gray-700 flex items-start gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                {bullet}
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                                </div>

                                {idx <
                                  analysis?.improvements?.experience?.length -
                                    1 && <Separator className="my-6" />}
                              </div>
                            );
                          }
                        )}
                      </CardContent>
                    </Card>
                  )}

                {/* Recruiter Pitch */}

                {isPro ? (
                  <>
                    {analysis?.premiumInsights?.recruiterPitch && (
                      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-purple-600" />
                            AI-Generated Recruiter Pitch
                          </CardTitle>
                          <CardDescription>
                            Ready-to-use elevator pitch for your profile
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {analysis?.premiumInsights?.recruiterPitch?.map(
                              (pitch, idx) => (
                                <div
                                  key={idx}
                                  className="p-4 bg-white rounded-lg border-2 border-purple-200"
                                >
                                  <p className="text-gray-900 leading-relaxed">
                                    {pitch}
                                  </p>
                                </div>
                              )
                            )}
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                              <FileText className="h-4 w-4 mr-2" />
                              Copy Pitch to Clipboard
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <UpgradeCard
                    feature="AI-Generated Recruiter Pitch"
                    description="Get ready-to-use elevator pitches customized for your profile with copy-to-clipboard functionality"
                  />
                )}
              </TabsContent>

              {/* Market Tab */}
              <TabsContent value="market" className="space-y-6">
                {/* Market Trends */}
                {isPro ? (
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        Market Demand Trends
                      </CardTitle>
                      <CardDescription>
                        {analysis?.trends?.direction === "up"
                          ? "Increasing"
                          : "Decreasing"}{" "}
                        demand • {analysis?.trends?.monthlyGrowth} monthly
                        growth
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <div className="text-3xl font-bold text-green-600 mb-1">
                            {analysis?.trends?.monthlyGrowth}
                          </div>
                          <p className="text-sm text-gray-600">
                            Monthly Growth
                          </p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <div className="text-xl font-bold text-blue-600 mb-1">
                            {analysis?.marketInsights?.regionalDemand}
                          </div>
                          <p className="text-sm text-gray-600">
                            Regional Demand
                          </p>
                        </div>
                        <div className="text-center p-4 bg-amber-50 rounded-lg">
                          <Clock className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                          <div className="text-xl font-bold text-amber-600 mb-1">
                            {analysis?.marketInsights?.optimalTiming}
                          </div>
                          <p className="text-sm text-gray-600">
                            Best Time to Apply
                          </p>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Key Insights
                        </h4>
                        <p className="text-gray-700 mb-4">
                          {analysis?.trends?.note}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">
                              Competition Level
                            </span>
                            <Badge variant="outline">
                              {analysis?.marketInsights?.competitionLevel}
                            </Badge>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700 mb-2">
                              <strong>Demand Drivers:</strong>
                            </p>
                            <ul className="space-y-1">
                              {analysis?.marketInsights?.demandDrivers?.map(
                                (driver, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm text-gray-600 flex items-start gap-2"
                                  >
                                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    {driver}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        Market Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center p-6 bg-green-50 rounded-lg">
                        <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-3" />
                        <p className="text-lg font-semibold text-gray-900 capitalize">
                          {analysis?.trends?.direction} Trend
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          {analysis?.trends?.note}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Rising Skills */}
                {isPro ? (
                  <>
                    {analysis?.premiumInsights?.trendDrilldown
                      ?.risingSkills && (
                      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-orange-600" />
                            Hottest Rising Skills
                          </CardTitle>
                          <CardDescription>
                            In-demand skills in your industry right now
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {analysis?.premiumInsights?.trendDrilldown?.risingSkills?.map(
                              (skill, idx) => (
                                <div
                                  key={idx}
                                  className="p-4 bg-white rounded-lg border-2 border-orange-200 text-center hover:shadow-lg transition-shadow"
                                >
                                  <div className="text-2xl font-bold text-orange-600 mb-1">
                                    #{idx + 1}
                                  </div>
                                  <p className="font-semibold text-gray-900">
                                    {skill}
                                  </p>
                                  <Badge className="mt-2 bg-orange-600 text-white">
                                    Trending
                                  </Badge>
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <UpgradeCard
                    feature="Rising Skills Tracker"
                    description="Stay ahead with real-time data on hottest skills in your industry with 12-month trend analysis"
                  />
                )}

                {/* Market Insights - Pro Only */}
                {!isPro && (
                  <>
                    <UpgradeCard
                      feature="Detailed Market Insights"
                      description="Get regional demand data, competition levels, optimal timing, and demand drivers for your role"
                    />
                  </>
                )}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      )}
    </>
  );
}
