import {
  BarChart3,
  Calendar,
  CookingPot,
  Crown,
  Delete,
  DeleteIcon,
  Download,
  ExternalLink,
  Eye,
  User,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import PDFPlaceholder from "./pdfPlaceholder";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  useDeleteResumeMutation,
  useGetAnalysisHistoryQuery,
} from "../../features/apiSlice";
import { Fragment } from "react";
import Skeleton from "../ui/skeleton";
import { getIsProUser } from "../../lib/sessionHelper/sessionHelper";

const ResumeCard = ({ resume }) => {
  const resumeId = resume?._id;
  const isPro = getIsProUser();

  const { data, isLoading } = useGetAnalysisHistoryQuery(resumeId, {
    skip: !isPro,
  });

  const [deleteResume, { isLoading: deleteResumeLoading }] =
    useDeleteResumeMutation();

  const handleViewPDF = () => {
    window.open(resume.fileUrl, "_blank");
  };

  const handleResumeDelete = async (resumeId) => {
    const result = await deleteResume(resumeId);
    if (result?.data?.status === "success") {
      toast.success("Resume delete succesfully.");
    } else {
      toast.error("Resume delete fail please try again.");
    }
  };
  return (
    <Card className="relative transition-all hover:shadow-lg">
      {/* PDF Preview/Placeholder */}
      <div
        className="relative h-64 bg-gray-100 rounded-t-lg overflow-hidden cursor-pointer group"
        onClick={handleViewPDF}
      >
        <PDFPlaceholder resume={resume} />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-center">
            <ExternalLink className="h-12 w-12 text-white mx-auto mb-2" />
            <p className="text-white font-medium">Click to open PDF</p>
            <p className="text-white text-sm mt-1">Opens in new tab</p>
          </div>
        </div>
      </div>

      {/* Resume Info */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {resume?.resumeSections?.personalInfo?.fullName}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {resume?.target?.industry}
            </p>
          </div>
          <div>
            <Button
              onClick={() => handleResumeDelete(resumeId)}
              disabled={deleteResumeLoading}
              className="bg-red-600/70 hover:bg-red-600 text-white"
            >
              {deleteResumeLoading ? (
                <p>
                  <Loader2 className="animate-spin" />
                </p>
              ) : (
                <CookingPot />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-gray-700">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{new Date(resume?.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User className="h-4 w-4" />
            <span>{resume?.target?.region}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent hover:bg-gray-100"
            onClick={handleViewPDF}
          >
            <Eye className="h-4 w-4 mr-2" />
            View PDF
          </Button>

          <Link to={`/resume-details/${resume?._id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent hover:bg-gray-100"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Details
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              const link = document.createElement("a");
              link.href = resume?.fileUrl;
              link.download = `${resume?.personalInfo?.fullName}-Resume.pdf`;
              link.click();
            }}
            className="bg-transparent hover:bg-gray-100"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {isPro ? (
          <div className="border p-2 rounded-md">
            <div>
              {isLoading ? (
                <Skeleton className="-m-1 text-center ">
                  Analysis history loading..
                </Skeleton>
              ) : (
                <>
                  <div className="text-center mb-2">
                    <h2>
                      {data?.history?.length > 1 ? (
                        <>
                          ({data?.history?.length - 1}) Analysis version
                          available for compare
                        </>
                      ) : (
                        <p>No analysis version available</p>
                      )}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2 ">
                    {data?.history?.length > 1 ? (
                      <>
                        {data?.history
                          ?.filter(
                            (historyItem) => historyItem.isLatest !== true
                          )
                          .map((historyItem, index) => (
                            <Fragment key={index}>
                              {console.log(historyItem, "historyItem")}
                              <Link
                                to={`/compare?resumeid=${resumeId}&analysisid=${historyItem?._id}`}
                                className="p-1 rounded-md w-full bg-white text-gray-700 border hover:bg-gray-100"
                              >
                                <p className="font-semibold">
                                  Overall Score:{" "}
                                  <Badge>{historyItem?.overallScore} </Badge>
                                  <span className="ml-2"></span>
                                  Version: <Badge>{historyItem?.version}</Badge>
                                </p>
                                <p className="font-semibold">
                                  Created:{" "}
                                  {historyItem?.createdAt?.split("T")[0]}
                                </p>
                              </Link>
                            </Fragment>
                          ))}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-semibold   text-sm">
                Upgrade to Pro for{" "}
                <span className="underline">
                  Analysis History & Comparison Features
                </span>
              </p>
            </div>
            <Link to="/plans">
              <Button
                variant="outline"
                className="bg-white text-amber-600 hover:bg-gray-100 ml-1"
              >
                Upgrade Now
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeCard;
