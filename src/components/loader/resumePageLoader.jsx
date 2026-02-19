import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const LoadingResumesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header Loading Skeleton */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
            <div className="flex-shrink-0 w-48">
              <div className="h-8 bg-gray-200 rounded-md animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-24"></div>
            </div>

            <div className="max-w-xl hidden md:block flex-grow">
              <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            <div className="h-10 md:w-48 bg-gray-200 rounded-md animate-pulse  w-full"></div>

            <div className=" md:hidden block flex-grow w-full">
              <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Resume Cards Loading Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="relative">
              {/* PDF Preview Skeleton */}
              <div className="h-64 bg-gray-200 rounded-t-lg animate-pulse"></div>

              {/* Card Header Skeleton */}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              </CardHeader>

              {/* Card Content Skeleton */}
              <CardContent className="space-y-3">
                {/* Date and Region Skeleton */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
                  </div>
                </div>

                {/* Buttons Skeleton */}
                <div className="flex gap-2 pt-2">
                  <div className="h-9 bg-gray-200 rounded animate-pulse flex-1"></div>
                  <div className="h-9 bg-gray-200 rounded animate-pulse flex-1"></div>
                  <div className="h-9 w-9 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Analysis History Skeleton */}
                <div className="border py-2 rounded-md">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingResumesPage;
