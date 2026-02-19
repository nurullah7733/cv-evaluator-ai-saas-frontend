import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle2, Eye, Lock } from "lucide-react";

const SeeSuggestions = ({ isUserPro, suggestions }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          {isUserPro ? (
            <Button
              variant="outline"
              className="w-full text-gray-700 hover:bg-gray-100"
            >
              <Eye className="h-4 w-4 mr-2" /> See Suggestions
            </Button>
          ) : (
            <Button
              disabled
              variant="outline"
              className="w-full text-gray-700 hover:bg-gray-100"
            >
              <div className="relative ">
                {/* Blurred Content */}
                <div className="filter flex blur-[1px] opacity-80 pointer-events-none select-none">
                  <Eye className="h-4 w-4 mr-2" /> See Suggestions
                </div>
                <div className="absolute top-3 left-1 flex">
                  <Lock className="h-4 w-4 mr-2" /> Premium Feature
                </div>
              </div>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto [&>button]:text-gray-800 [&>button]:hover:text-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 text-xl font-semibold flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              Resume Improvement Suggestions
            </DialogTitle>
            <p className="text-sm text-gray-600 mt-2">
              Prioritized recommendations to improve your resume score
            </p>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Priority 1 Suggestions */}
            {suggestions?.filter((s) => s?.priority === 1)?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-2 py-1 bg-red-100 border border-red-300 rounded-md">
                    <span className="text-xs font-bold text-red-700">
                      HIGH PRIORITY
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    Critical improvements for better ATS performance
                  </span>
                </div>
                <div className="space-y-3">
                  {suggestions
                    ?.filter((s) => s.priority === 1)
                    .map((suggestion, idx) => (
                      <div
                        key={idx}
                        className="bg-red-50 border border-red-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 font-medium mb-1">
                              {suggestion?.text}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs px-2 py-0.5 bg-white border border-red-200 rounded-md text-red-700 font-medium capitalize">
                                {suggestion?.targetSection}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Priority 2 Suggestions */}
            {suggestions?.filter((s) => s?.priority === 2)?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-2 py-1 bg-amber-100 border border-amber-300 rounded-md">
                    <span className="text-xs font-bold text-amber-700">
                      MEDIUM PRIORITY
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    Additional enhancements to strengthen your profile
                  </span>
                </div>
                <div className="space-y-3">
                  {suggestions
                    ?.filter((s) => s?.priority === 2)
                    ?.map((suggestion, idx) => (
                      <div
                        key={idx}
                        className="bg-amber-50 border border-amber-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                            {suggestions?.filter((s) => s?.priority === 1)
                              .length +
                              idx +
                              1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 font-medium mb-1">
                              {suggestion?.text}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs px-2 py-0.5 bg-white border border-amber-200 rounded-md text-amber-700 font-medium capitalize">
                                {suggestion?.targetSection}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Priority 3 Suggestions (if any) */}
            {suggestions?.filter((s) => s?.priority === 3)?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-2 py-1 bg-blue-100 border border-blue-300 rounded-md">
                    <span className="text-xs font-bold text-blue-700">
                      LOW PRIORITY
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    Nice-to-have improvements
                  </span>
                </div>
                <div className="space-y-3">
                  {suggestions
                    ?.filter((s) => s?.priority === 3)
                    ?.map((suggestion, idx) => (
                      <div
                        key={idx}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                            {suggestions?.filter(
                              (s) => s?.priority === 1 || s?.priority === 2
                            ).length +
                              idx +
                              1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 font-medium mb-1">
                              {suggestion?.text}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs px-2 py-0.5 bg-white border border-blue-200 rounded-md text-blue-700 font-medium capitalize">
                                {suggestion?.targetSection}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* No Suggestions */}
            {(!suggestions || suggestions?.length === 0) && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Great Job!
                </h3>
                <p className="text-sm text-gray-600">
                  No critical suggestions at this time. Your resume looks solid!
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SeeSuggestions;
