import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

// Helper functions to calculate Quick Stats
const calculateQuickStats = (analysisData) => {
  // 1. Keywords Matched Calculation
  const calculateKeywordsMatched = () => {
    // Count user's existing skills
    const skills = analysisData?.resumeSections?.skills || {};
    const userSkills = [
      ...(skills?.programming || []),
      ...(skills?.frameworks || []),
      ...(skills?.technical || []),
      ...(skills?.databases || []),
      ...(skills?.tools || []),
    ];

    // Count missing skills
    const missingSkills = analysisData?.optimization?.keywordGaps || [];

    // Total required = user has + missing
    const totalRequired = userSkills?.length + missingSkills?.length;

    return {
      matched: userSkills?.length,
      total: totalRequired,
      display: `${userSkills?.length}/${totalRequired}`,
    };
  };

  // 2. ATS Compatibility Calculation
  const calculateATSCompatibility = () => {
    const breakdown = analysisData?.breakdown || {};
    const scores = [
      breakdown?.structure || 0,
      breakdown?.language || 0,
      breakdown?.keywords || 0,
      breakdown?.experience || 0,
    ];

    const average =
      scores?.reduce((sum, score) => sum + score, 0) / scores?.length;

    if (average >= 80) return { level: "Excellent", variant: "emerald" };
    if (average >= 70) return { level: "Good", variant: "emerald" };
    if (average >= 60) return { level: "Fair", variant: "amber" };
    return { level: "Poor", variant: "red" };
  };

  // 3. Format Score Calculation
  const calculateFormatScore = () => {
    const structureScore = analysisData?.breakdown?.structure || 0;

    if (structureScore >= 80) return { level: "Excellent", variant: "emerald" };
    if (structureScore >= 70) return { level: "Good", variant: "amber" };
    if (structureScore >= 60) return { level: "Fair", variant: "amber" };
    return { level: "Poor", variant: "red" };
  };

  return {
    keywordsMatched: calculateKeywordsMatched(),
    atsCompatibility: calculateATSCompatibility(),
    formatScore: calculateFormatScore(),
  };
};

// Get badge styling based on variant
const getBadgeClassName = (variant) => {
  const variants = {
    emerald: "text-emerald-700 bg-emerald-50 border-emerald-200",
    amber: "text-amber-700 bg-amber-50 border-amber-200",
    red: "text-red-700 bg-red-50 border-red-200",
  };
  return variants[variant] || variants.amber;
};

// Main Quick Stats Component
const QuickStats = ({ analysisData }) => {
  const quickStats = calculateQuickStats(analysisData);

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
          <TrendingUp className="h-5 w-5 text-emerald-600" aria-hidden="true" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Keywords Matched */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Keywords Matched</span>
          <Badge
            variant="secondary"
            className={getBadgeClassName(
              quickStats?.keywordsMatched?.matched >=
                quickStats?.keywordsMatched?.total * 0.8
                ? "emerald"
                : "amber"
            )}
          >
            {quickStats?.keywordsMatched?.display}
          </Badge>
        </div>

        {/* ATS Compatibility */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">ATS Compatibility</span>
          <Badge
            variant="secondary"
            className={getBadgeClassName(quickStats?.atsCompatibility?.variant)}
          >
            {quickStats?.atsCompatibility?.level}
          </Badge>
        </div>

        {/* Format Score */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Format Score</span>
          <Badge
            variant="secondary"
            className={getBadgeClassName(quickStats?.formatScore?.variant)}
          >
            {quickStats?.formatScore?.level}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

// Usage example in your main component
const YourMainComponent = ({ analysisData }) => {
  return (
    <div className="dashboard">
      <QuickStats analysisData={analysisData} />
    </div>
  );
};

// Test with your actual data structure
const testData = {
  resumeSections: {
    skills: {
      programming: ["JavaScript", "Node.js"],
      frameworks: ["React.js", "Express.js"],
      technical: ["Next.js", "Prisma", "MERN stack"],
      databases: ["MongoDB", "PostgreSQL"],
      tools: ["Git", "Github", "AWS", "Cloudinary"],
    },
  },
  optimization: {
    keywordGaps: ["RESTful APIs", "Docker", "TypeScript"],
  },
  breakdown: {
    structure: 70,
    language: 80,
    keywords: 75,
    experience: 70,
  },
};

// Test the calculation

calculateQuickStats(testData);

export default QuickStats;
