"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";

export default function ResumeDashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel - Score Overview Skeleton */}
          <section className="lg:col-span-4 space-y-6">
            {/* Overall Score Card Skeleton */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-6 w-6 rounded ml-auto" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score Display */}
                <div className="flex flex-col items-center gap-3">
                  <Skeleton className="h-20 w-32 rounded-lg" />
                  <Skeleton className="h-4 w-28" />
                </div>

                {/* Progress Bars */}
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                      <Skeleton className="h-2 w-full rounded-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ATS Breakdown Skeleton */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-6 w-6 rounded ml-auto" />
                </div>
                <Skeleton className="h-4 w-64 mt-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats Skeleton */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-28" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ATS Coverage Skeleton */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-6 w-6 rounded ml-auto" />
                </div>
                <Skeleton className="h-4 w-48 mt-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                ))}
                <Skeleton className="h-10 w-full rounded-md mt-4" />
              </CardContent>
            </Card>
          </section>

          {/* Center Panel - Charts Skeleton */}
          <section className="lg:col-span-5 space-y-6">
            {/* Skills Coverage Chart Skeleton */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <Skeleton className="h-4 w-64 mt-2" />
              </CardHeader>
              <CardContent>
                {/* Chart Area */}
                <div className="space-y-4">
                  <Skeleton className="h-80 w-full rounded-lg" />

                  {/* Legend */}
                  <div className="flex flex-wrap justify-center gap-6 mt-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3 rounded" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Salary Band Chart Skeleton */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-6 w-6 rounded ml-auto" />
                </div>
                <Skeleton className="h-4 w-56 mt-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Region Selector */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Confidence Badge */}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-40 rounded-full" />
                  <Skeleton className="h-6 w-32 rounded" />
                </div>

                {/* Salary Display */}
                <div className="text-center space-y-3">
                  <Skeleton className="h-12 w-64 mx-auto" />
                  <Skeleton className="h-6 w-48 mx-auto" />
                  <Skeleton className="h-5 w-40 mx-auto" />
                </div>

                {/* Range Visualization */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-3 w-20" />
                    ))}
                  </div>
                  <Skeleton className="h-10 w-full rounded-full" />
                  <div className="flex justify-between">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-4 w-16" />
                    ))}
                  </div>
                </div>

                {/* Market Info */}
                <Skeleton className="h-20 w-full rounded-lg" />
              </CardContent>
            </Card>
          </section>

          {/* Right Panel - Actions Skeleton */}
          <section className="lg:col-span-3 space-y-6">
            {/* Action Items Skeleton */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48 mt-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="h-5 w-5 rounded mt-1" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Resume Preview Skeleton */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
