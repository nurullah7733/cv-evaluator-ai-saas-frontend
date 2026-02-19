export default function ComparePageLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Timeline Card Skeleton */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6">
          {/* Title */}
          <div className="flex items-center justify-between mb-5">
            <div className="space-y-3 flex-1">
              <div className="h-8 w-auto sm:w-80 bg-gray-300 rounded-lg animate-pulse" />
              <div className="h-5 w-64 bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="h-8 w-32 bg-gray-300 rounded-full animate-pulse ml-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-white/20 rounded animate-pulse w-24" />
                  <div className="h-6 bg-white/30 rounded animate-pulse w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Score Section Skeleton */}
        <section>
          <div className="h-8 w-80 bg-gray-200 rounded-lg animate-pulse mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Score Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />

              {/* Previous Score */}
              <div className="p-3 bg-gray-50 rounded-lg space-y-2">
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
              </div>

              {/* Current Score */}
              <div className="p-3 bg-blue-50 rounded-lg border-2 border-blue-200 space-y-2">
                <div className="h-3 w-16 bg-blue-200 rounded animate-pulse" />
                <div className="h-10 w-20 bg-blue-200 rounded animate-pulse" />
              </div>

              {/* Progress bars */}
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-2 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="text-center space-y-3">
                  <div className="h-16 w-24 bg-gray-200 rounded-lg animate-pulse mx-auto" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Separator */}
        <div className="h-px bg-gray-200 animate-pulse" />

        {/* Detailed Breakdown Skeleton */}
        <section>
          <div className="h-8 w-72 bg-gray-200 rounded-lg animate-pulse mb-4" />
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-[150px_1fr_80px_1fr_100px] gap-4 items-center py-4 border-b last:border-b-0"
                >
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />

                  {/* Previous bar */}
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    <div className="h-2 bg-gray-200 rounded-full animate-pulse" />
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse" />
                  </div>

                  {/* Current bar */}
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    <div className="h-2 bg-blue-200 rounded-full animate-pulse" />
                  </div>

                  {/* Badge */}
                  <div className="flex justify-end">
                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="h-px bg-gray-200 animate-pulse" />

        {/* Skills Changes Skeleton */}
        <section>
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Added Skills */}
            <div className="bg-green-50 rounded-lg border-2 border-green-200 p-6">
              <div className="h-6 w-40 bg-green-200 rounded animate-pulse mb-4" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-24 bg-green-200 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Removed Skills */}
            <div className="bg-red-50 rounded-lg border-2 border-red-200 p-6">
              <div className="h-6 w-40 bg-red-200 rounded animate-pulse mb-4" />
              <div className="flex flex-wrap gap-2">
                <div className="h-8 w-20 bg-red-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="h-px bg-gray-200 animate-pulse" />

        {/* Summary & Insights Skeleton */}
        <section>
          <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Improvements */}
            <div className="bg-white rounded-lg border-2 border-green-200">
              <div className="bg-green-50 p-6 border-b">
                <div className="h-6 w-48 bg-green-200 rounded animate-pulse" />
              </div>
              <div className="p-6 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-200 rounded-full animate-pulse flex-shrink-0" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white rounded-lg border-2 border-amber-200">
              <div className="bg-amber-50 p-6 border-b">
                <div className="h-6 w-48 bg-amber-200 rounded animate-pulse" />
              </div>
              <div className="p-6 space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-200 rounded-full animate-pulse flex-shrink-0" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons Skeleton */}
        <div className="flex justify-center gap-4 pt-6">
          <div className="h-12 w-52 bg-blue-200 rounded-lg animate-pulse" />
        </div>
      </main>

      {/* Pulsing overlay for emphasis */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }
        .animate-pulse {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
