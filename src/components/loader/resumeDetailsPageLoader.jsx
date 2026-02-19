import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";

export default function ResumeDetailsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics Skeleton */}
        <Card className="mb-8 p-7">
          {/* title */}
          <div className="flex flex-wrap gap-3 items-center justify-between mb-5">
            <div className="flex flex-row items-center gap-4">
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-80" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-2 animate-pulse">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-12 w-16 mb-2" />
                  <Skeleton className="h-4 w-32 mb-3" />
                  <Skeleton className="h-2 w-full rounded-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </Card>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          {/* Tab List Skeleton */}
          <div className="bg-white border-gray-200 p-1 rounded-lg">
            <div className="grid grid-cols-5 gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-10 rounded-md" />
              ))}
            </div>
          </div>

          {/* Tab Content Skeleton - Overview */}
          <div className="space-y-6">
            {/* Contact Information Card */}
            <Card className="border-2 animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-6 w-48" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-3 w-16 mb-2" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary Card */}
            <Card className="border-2 animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-6 w-56" />
                </div>
                <Skeleton className="h-4 w-72 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-6 w-24 rounded-full" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience Card */}
            <Card className="border-2 animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-6 w-40" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="relative pl-6 border-l-2 border-gray-200"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-300" />
                    <div className="mb-3">
                      <Skeleton className="h-5 w-48 mb-2" />
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-5 w-24 rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="flex items-start gap-2">
                          <Skeleton className="h-4 w-4 rounded-full mt-0.5 flex-shrink-0" />
                          <Skeleton className="h-4 flex-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education & Certifications Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Education Card */}
              <Card className="border-2 animate-pulse">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <Skeleton className="h-5 w-full mb-2" />
                      <Skeleton className="h-4 w-48 mb-2" />
                      <div className="flex items-center gap-2 mt-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications Card */}
              <Card className="border-2 animate-pulse">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-5 w-5 rounded-full mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-full mb-2" />
                          <Skeleton className="h-4 w-40" />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Skills Card */}
            <Card className="border-2 animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-6 w-48" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i}>
                      <Skeleton className="h-5 w-40 mb-2" />
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5].map((j) => (
                          <Skeleton key={j} className="h-6 w-20 rounded-full" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md border-2 border-blue-200">
            <div className="relative">
              <div className="h-5 w-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Loading resume details...
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
