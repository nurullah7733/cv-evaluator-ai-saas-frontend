import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Eye } from "lucide-react";

const ViewMissingKeywordModal = ({ missingKeyword }) => {
  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-center gap-2   bg-transparent border-gray-700 hover:bg-gray-200 text-blue-700"
          >
            View Missing Keywords
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto [&>button]:text-gray-800 [&>button]:hover:text-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 text-xl font-semibold flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              ({missingKeyword?.length}) Missing Keywords
            </DialogTitle>
            <p className="text-sm text-gray-600 mt-2">
              Missing keywords add to improve your resume ATS score
            </p>
          </DialogHeader>

          <div className="border-t border-gray-200 my-4 pt-10">
            {missingKeyword && missingKeyword?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missingKeyword?.map((keyword, index) => (
                  <>
                    <p key={index} className="text-gray-700 mr-3">
                      <span className="bg-gray-300 px-2 py-1 rounded-md">
                        {keyword?.term}
                      </span>
                      <span className="m-auto text-sm text-center mt-2 bg-gray-300 px-0.5 w-[50px] py-1 rounded-full flex justify-center items-center text-gray-600">
                        {" "}
                        {keyword?.weight}
                      </span>
                    </p>
                  </>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No missing keywords found.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewMissingKeywordModal;
