import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";
import {
  Target,
  Briefcase,
  DollarSign,
  TrendingUp,
  Zap,
  AlertTriangle,
  Star,
  MessageSquare,
  Shield,
  AlertCircle,
  CheckCircle,
  FileText,
  Lightbulb,
  Icon,
} from "lucide-react";

// Personal Info Card Skeleton
export const PersonalInfoSkeleton = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="text-right">
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-6 w-24 rounded-full mb-3" />
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>

            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-32 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Overall Score Loading Skeleton
export const OverallScoreSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-20 w-20 rounded-xl" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="w-full h-3 rounded-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Job Fit Analysis Loading Skeleton
export const JobFitSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="text-gray-300" size={24} />
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="text-center p-5 bg-gray-50 rounded-xl border border-gray-200"
            >
              <Skeleton className="h-9 w-16 mx-auto mb-2" />
              <Skeleton className="h-3 w-20 mx-auto" />
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

// Locked Card Skeleton (for premium features)
export const LockedCardSkeleton = () => {
  return (
    <Card className="border-2 border-dashed border-gray-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="h-6 w-6" />
        </div>

        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <Skeleton className="h-10 w-full rounded-lg" />
      </CardContent>
    </Card>
  );
};

// Top Priority Actions Skeleton
export const PriorityActionsSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="text-gray-300" size={20} />
          <Skeleton className="h-5 w-40" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <Skeleton className="flex-shrink-0 w-6 h-6 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <Skeleton className="h-6 w-6 mx-auto mb-2" />
          <Skeleton className="h-4 w-48 mx-auto mb-1" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </CardContent>
    </Card>
  );
};

// ATS Quick Wins Skeleton
export const ATSQuickWinsSkeleton = () => {
  return (
    <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="text-green-300" size={20} />
          <Skeleton className="h-5 w-32 bg-green-200" />
        </div>

        <ul className="space-y-2">
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className="flex items-start gap-2 p-2 bg-white rounded border border-green-200"
            >
              <Skeleton className="h-4 w-4 bg-green-200 flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-full bg-green-200" />
                <Skeleton className="h-3 w-4/5 bg-green-200" />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

// Skills Overview Skeleton
export const SkillsOverviewSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <Skeleton className="h-5 w-32 mb-4" />

        <div className="mb-4">
          <Skeleton className="h-3 w-40 mb-2" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
        </div>

        <div>
          <Skeleton className="h-3 w-40 mb-2" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-6 w-24 rounded-full" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Career Paths Skeleton
export const CareerPathsSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <Skeleton className="h-5 w-32 mb-4" />

        {[1, 2].map((i) => (
          <div key={i} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="space-y-1 ml-6">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-center gap-2 py-1">
                  <Skeleton className="w-1.5 h-1.5 rounded-full" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Resume Sections Skeleton
export const ResumeSectionsSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-gray-300" size={24} />
          <Skeleton className="h-6 w-48" />
        </div>

        {/* Summary */}
        <div className="mb-6">
          <Skeleton className="h-5 w-40 mb-2" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-5 w-20" />
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <Skeleton className="h-5 w-40 mb-3" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="space-y-2 mt-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-6">
          <Skeleton className="h-5 w-32 mb-3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <Skeleton className="h-4 w-40 mb-2" />
                <div className="space-y-2 mb-3">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
                <div className="flex flex-wrap gap-1">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-5 w-16" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <Skeleton className="h-5 w-32 mb-3" />
          <div className="space-y-3">
            {[1].map((i) => (
              <div
                key={i}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <Skeleton className="h-5 w-48 mb-3" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <Skeleton className="h-3 w-20 mb-2" />
                <div className="flex flex-wrap gap-1">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-5 w-16" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Improvements Section Skeleton
export const ImprovementsSkeleton = () => {
  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="text-green-300" size={24} />
          <Skeleton className="h-6 w-48 bg-green-200" />
        </div>

        <div className="mb-6">
          <Skeleton className="h-5 w-40 bg-green-200 mb-2" />
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <div className="space-y-2 mb-3">
              <Skeleton className="h-4 w-full bg-green-200" />
              <Skeleton className="h-4 w-full bg-green-200" />
              <Skeleton className="h-4 w-3/4 bg-green-200" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-4 w-24 bg-green-200" />
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-20 bg-green-200" />
              ))}
            </div>
          </div>
        </div>

        <div>
          <Skeleton className="h-5 w-48 bg-green-200 mb-2" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-3 bg-white rounded-lg border border-green-200"
              >
                <Skeleton className="h-3 w-20 bg-green-200 mb-2" />
                <div className="flex flex-wrap gap-1">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-5 w-16 bg-green-200" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ResumeReportPageLoading Loading Skeleton
export const ResumeReportPageLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Personal Info Skeleton */}
        <PersonalInfoSkeleton />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <OverallScoreSkeleton />
            <JobFitSkeleton />
            <LockedCardSkeleton icon={Briefcase} />
            <LockedCardSkeleton icon={DollarSign} />
            <LockedCardSkeleton icon={TrendingUp} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <PriorityActionsSkeleton />
            <ATSQuickWinsSkeleton />
            <SkillsOverviewSkeleton />
            <CareerPathsSkeleton />
          </div>
        </div>

        {/* Resume Sections Skeleton */}
        <div className="mt-6">
          <ResumeSectionsSkeleton />
        </div>

        {/* Improvements Skeleton */}
        <ImprovementsSkeleton />
      </div>
    </div>
  );
};
