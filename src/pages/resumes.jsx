import React, { useEffect, useState } from "react";
import { useGetAllResumesQuery } from "../features/apiSlice";
import ReactPaginate from "react-paginate";

import DataNotFoundPage from "../components/dataNotFound/dataNotFound";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Search,
  Download,
  Eye,
  GitCompare,
  Calendar,
  User,
  BarChart3,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import ResumeCard from "../components/resumesPageComponents/resumeCard";
import LoadingResumesPage from "../components/loader/resumePageLoader";

export default function AllResumesPage() {
  const [pageNo, setPageNo] = useState("1");
  // eslint-disable-next-line no-unused-vars
  const [perPage, setPerPage] = useState("10");
  const [searchKeyword, setSearchKeyword] = useState("0");

  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAllResumesQuery({
    pageNo,
    perPage,
    searchKeyword,
  });
  const totalItems = data?.data?.[0]?.total?.[0]?.count || 0;

  const totalPages = Math.ceil(totalItems / perPage);
  // Handle page change
  const handlePageClick = (page) => {
    setPageNo(page.selected + 1);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setSearchKeyword(searchTerm.trim() === "" ? "0" : searchTerm.trim());
      setPageNo("1");
    }, 500);
    return () => clearTimeout(time);
  }, [searchTerm]);

  return (
    <>
      {isLoading ? (
        <LoadingResumesPage />
      ) : data?.status === "fail" ||
        data == undefined ||
        data?.data?.length === 0 ? (
        <DataNotFoundPage />
      ) : (
        <div className="min-h-screen bg-gray-50 font-sans">
          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* header */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-gray-900">
                    All Resumes
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {data?.data?.[0]?.total?.length === 0 ? (
                      "No resume found"
                    ) : (
                      <>
                        {data?.data[0]?.total[0]?.count} resume
                        {data?.data[0]?.total[0]?.count !== 1 ? "s" : ""} found
                      </>
                    )}
                  </p>
                </div>
                <div className="max-w-xl hidden md:block flex-grow">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={searchTerm}
                      onChange={handleSearchTerm}
                      placeholder="Search by name or email..."
                      className="pl-10"
                    />
                  </div>
                </div>
                <Link to="/">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload New Resume
                  </Button>
                </Link>
                <div className="max-w-xl md:hidden block flex-grow w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={searchTerm}
                      onChange={handleSearchTerm}
                      placeholder="Search by name or email..."
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* card */}
            <div>
              {data?.data[0]?.rows?.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-6">
                    {data?.data[0]?.rows?.map((resume, index) => (
                      <ResumeCard key={index} resume={resume} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-black text-2xl font-semibold flex justify-center">
                    No Resume Found
                  </p>
                </>
              )}
            </div>

            {/* Pagination */}
            <ReactPaginate
              breakLabel="..."
              previousLabel="<"
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              renderOnZeroPageCount={null}
              // Tailwind CSS classes
              containerClassName="flex items-center justify-center space-x-0.5 md:space-x-1 mt-12 mb-5 text-gray-700"
              pageClassName="inline-block"
              pageLinkClassName=" cursor-pointer px-2 py-1 md:px-4 md:py-2 border cursor-pointer px-4   border-gray-300 rounded-md hover:bg-blue-50 hover:border-blue-500 transition-colors"
              previousLinkClassName=" cursor-pointer px-2 py-1 md:px-4 md:py-2  cursor-pointer  py-2 border border-gray-300 rounded-md hover:bg-blue-50 hover:border-blue-500 transition-colors"
              nextLinkClassName="cursor-pointer px-2 py-1 md:px-4 md:py-2 border cursor-pointer  py-2  border-gray-300 rounded-md hover:bg-blue-50 hover:border-blue-500 transition-colors"
              previousClassName="inline-block "
              nextClassName="inline-block"
              breakClassName="inline-block"
              breakLinkClassName="px-4 py-2 text-gray-500"
              activeClassName="text-white  rounded-md"
              activeLinkClassName="!text-white bg-blue-500 "
              disabledClassName="opacity-50 "
              disabledLinkClassName="!cursor-not-allowed"
            />
          </div>
        </div>
      )}
    </>
  );
}
