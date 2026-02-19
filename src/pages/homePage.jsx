"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  Target,
  Users,
  MapPin,
  Briefcase,
  DollarSign,
} from "lucide-react";
import AnalysisLoader from "../components/loader/analysisLoader";
import { useAnalyzeResumeMutation } from "../features/apiSlice";
import { setCreateResumeAnalysis } from "../features/createResumeAnalysisSlice";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  base64ToFile,
  fileToBase64,
  getResumeFormDataOnlyForHomePage,
  setResumeFormDataOnlyForHomePage,
} from "../lib/sessionHelper/sessionHelper";
import { useClerk, useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
const industries = [
  "Software/Web Development",
  "Data Science/Analytics",
  "Mobile Development",
  "DevOps/Cloud",
  "Cybersecurity",
  "AI/Machine Learning",
  "Product Management",
  "UI/UX Design",
  "Digital Marketing",
  "Finance/Banking",
  "Healthcare",
  "Education",
  "E-commerce",
  "Gaming",
  "Other",
];

export default function HomePage() {
  const [inputData, setInputData] = useState({
    resume: null,
    jdText: "",
    actor: "",
    persona: "",
    region: "",
    industry: "",
    desiredSalary: "",
    llmName: "mistral",
  });
  const { openSignIn } = useClerk();

  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [createResumeAnalysisRequest, { isLoading, isError }] =
    useAnalyzeResumeMutation();
  // console.log({ data, isLoading, isSuccess, isError });
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setInputData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        handleInputChange("resume", file);
      } else {
        setErrors((prev) => ({
          ...prev,
          resume: "Please upload a PDF file only",
        }));
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const validExtensions = [".pdf", ".doc", ".docx"];
      const isValidType =
        validTypes.includes(file.type) ||
        validExtensions.some((ext) => file.name.endsWith(ext));

      // Size check
      if (file.size > maxSize) {
        const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
        setErrors((prev) => ({
          ...prev,
          resume: `File size is ${fileSizeInMB}MB. Maximum allowed size is 5MB`,
        }));
        e.target.value = ""; // Clear input
        return;
      }

      // Type check
      if (!isValidType) {
        setErrors((prev) => ({
          ...prev,
          resume: "Please upload a PDF or DOC file only",
        }));
        e.target.value = ""; // Clear input
        return;
      }

      // Success - clear errors
      setErrors((prev) => ({
        ...prev,
        resume: "",
      }));

      handleInputChange("resume", file);
    }
  };

  const removeFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleInputChange("resume", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!inputData.resume) {
      newErrors.resume = "Resume file is required";
    }
    if (!inputData.jdText.trim()) {
      newErrors.jdText = "Job description is required";
    }
    if (!inputData.actor) {
      newErrors.actor = "Please select your role";
    }
    if (!inputData.region.trim()) {
      newErrors.region = "Region is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("file", inputData.resume);
      formData.append("jdText", inputData.jdText);
      formData.append("actor", inputData.actor);
      formData.append("persona", inputData.persona);
      formData.append("region", inputData.region);
      formData.append("industry", inputData.industry);
      formData.append("desiredSalary", inputData.desiredSalary);
      formData.append("llmName", inputData.llmName);
      const convertFileToBase64 = await fileToBase64(inputData.resume);

      // localStorage  save formData
      const metaData = {
        jdText: inputData.jdText,
        actor: inputData?.actor,
        persona: inputData?.persona,
        region: inputData?.region,
        industry: inputData?.industry,
        desiredSalary: inputData?.desiredSalary,
        llmName: inputData?.llmName,
        fileName: inputData?.resume?.name,
        file: convertFileToBase64,
      };
      setResumeFormDataOnlyForHomePage(metaData);
      if (!token) {
        return openSignIn({
          redirectUrl: window.location.href,
        });
      }

      const result = await createResumeAnalysisRequest(formData);

      if (Object.keys(result?.data?.analysisResult || {}).length > 0) {
        dispatch(setCreateResumeAnalysis(result.data));

        navigate("/dashboard");
        localStorage.removeItem("resumeFormDataOnlyForHomePage");
      } else if (result?.error?.status == 422) {
        toast.error(
          result?.error?.data?.data + " " + result?.error?.data?.fix ||
            "Something went wrong. Please try again."
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    const resumeFormDataFormLocalStorage = getResumeFormDataOnlyForHomePage();

    if (resumeFormDataFormLocalStorage) {
      const file = base64ToFile(
        resumeFormDataFormLocalStorage.file,
        resumeFormDataFormLocalStorage.fileName
      );
      setInputData({
        resume: file,
        jdText: resumeFormDataFormLocalStorage?.jdText,
        actor: resumeFormDataFormLocalStorage?.actor,
        persona: resumeFormDataFormLocalStorage?.persona,
        region: resumeFormDataFormLocalStorage?.region,
        industry: resumeFormDataFormLocalStorage?.industry,
        desiredSalary: resumeFormDataFormLocalStorage?.desiredSalary,
        llmName: resumeFormDataFormLocalStorage?.llmName,
      });
    }
  }, []);

  return (
    <>
      <AnalysisLoader isLoading={isLoading} />
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50 font-sans">
          <main className="max-w-4xl mx-auto px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* File Upload Section */}
              <Card className="shadow-sm border-gray-200">
                <CardHeader className="pb-4 ">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Upload
                      className="h-5 w-5 text-blue-600"
                      aria-hidden="true"
                    />
                    Upload Resume
                    <Badge className="text-red-700 bg-red-50 border-red-200 text-xs">
                      Required
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Upload your resume in PDF or DOC format for analysis
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive
                          ? "border-blue-400 bg-blue-50"
                          : errors.resume
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {inputData.resume ? (
                        <div className="flex items-center justify-center gap-3">
                          <FileText className="h-8 w-8 text-emerald-600" />
                          <div className="text-left">
                            <p className="font-medium text-gray-900">
                              {inputData.resume.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatFileSize(inputData.resume.size)}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={removeFile}
                            className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50 z-10 relative"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove file</span>
                          </Button>
                        </div>
                      ) : (
                        <>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileSelect}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            aria-describedby="file-upload-description"
                          />
                          <div className="space-y-2">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                            <div>
                              <p className="text-lg font-medium text-gray-900">
                                Drag and drop your resume here
                              </p>
                              <p className="text-sm text-gray-600">
                                or click to browse files
                              </p>
                            </div>
                            <p
                              id="file-upload-description"
                              className="text-xs text-gray-500"
                            >
                              PDF or DOC files only, max 5MB
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {errors.resume && (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        {errors.resume}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Job Description Section */}
              <Card className="shadow-sm border-gray-200">
                <CardHeader className="pb-4 ">
                  <CardTitle className="flex items-center gap-2 text-lg  ">
                    <Target
                      className="h-5 w-5 text-blue-600"
                      aria-hidden="true"
                    />
                    Job Description
                    <Badge className="text-red-700 bg-red-50 border-red-200 text-xs">
                      Required
                    </Badge>
                  </CardTitle>
                  <p className="text-sm !text-gray-700">
                    Paste the job description you're applying for
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
                      value={inputData.jdText}
                      onChange={(e) =>
                        handleInputChange("jdText", e.target.value)
                      }
                      className={`min-h-[120px] resize-y ${
                        errors.jdText
                          ? "border-red-300 focus:border-red-500"
                          : ""
                      }`}
                      aria-describedby={
                        errors.jdText ? "job-description-error" : undefined
                      }
                    />
                    {errors.jdText && (
                      <div
                        id="job-description-error"
                        className="flex items-center gap-2 text-sm text-red-600"
                      >
                        <AlertCircle className="h-4 w-4" />
                        {errors.jdText}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Profile Information */}
              <Card className="shadow-sm border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users
                      className="h-5 w-5 text-blue-600"
                      aria-hidden="true"
                    />
                    Profile Information
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Help us provide more accurate analysis
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Actor Selection */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="actor"
                        className="flex items-center gap-2"
                      >
                        Your Role
                        <Badge className="text-red-700 bg-red-50 border-red-200 text-xs">
                          Required
                        </Badge>
                      </Label>
                      <Select
                        key={inputData.actor}
                        value={inputData.actor}
                        onValueChange={(value) =>
                          handleInputChange("actor", value)
                        }
                      >
                        <SelectTrigger
                          className={errors.actor ? "border-red-300" : ""}
                        >
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="candidate">
                            Job Candidate
                          </SelectItem>
                          <SelectItem value="hiring_manager">
                            Hiring Manager
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.actor && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          {errors.actor}
                        </div>
                      )}
                    </div>

                    {/* Persona Selection */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="persona"
                        className="flex items-center gap-2"
                      >
                        Experience Level
                        <Badge className="text-gray-600 bg-gray-50 border-gray-200 text-xs">
                          Optional
                        </Badge>
                      </Label>
                      <Select
                        key={inputData.persona}
                        value={inputData.persona}
                        onValueChange={(value) =>
                          handleInputChange("persona", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry_level">
                            Entry Level (0-2 years)
                          </SelectItem>
                          <SelectItem value="professional_level">
                            Professional Level (3+ years)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Region */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="region"
                        className="flex items-center gap-2"
                      >
                        <MapPin className="h-4 w-4" />
                        Region
                        <Badge className="text-red-700 bg-red-50 border-red-200 text-xs">
                          Required
                        </Badge>
                      </Label>
                      <Input
                        id="region"
                        placeholder="India or Remote"
                        value={inputData.region}
                        onChange={(e) =>
                          handleInputChange("region", e.target.value)
                        }
                        className={
                          errors.region
                            ? "border-red-300 focus:border-red-500"
                            : ""
                        }
                      />
                      {errors.region && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          {errors.region}
                        </div>
                      )}
                    </div>

                    {/* Industry */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="industry"
                        className="flex items-center gap-2"
                      >
                        <Briefcase className="h-4 w-4" />
                        Industry
                        <Badge className="text-gray-600 bg-gray-50 border-gray-200 text-xs">
                          Optional
                        </Badge>
                      </Label>
                      <Select
                        value={inputData.industry}
                        key={inputData.industry}
                        onValueChange={(value) =>
                          handleInputChange("industry", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Desired Salary */}
                  <div className="space-y-2">
                    <Label htmlFor="salary" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Desired Salary (Annual)
                      <Badge className="text-gray-600 bg-gray-50 border-gray-200 text-xs">
                        Optional
                      </Badge>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                          >
                            <Info className="h-3 w-3" />
                            <span className="sr-only">Salary information</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            This helps us provide salary benchmarking insights
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      id="salary"
                      type="number"
                      placeholder="e.g., 75000"
                      value={inputData.desiredSalary}
                      onChange={(e) =>
                        handleInputChange("desiredSalary", e.target.value)
                      }
                      min="0"
                      step="1000"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* LLM Select */}
              <Card className="max-w-sm m-auto  flex flex-col justify-center items-center">
                <h2 className="text-md  text-gray-700 font-medium">
                  Select LLM
                </h2>
                <div>
                  <Select
                    key={inputData.llmName}
                    value={inputData.llmName}
                    onValueChange={(value) =>
                      handleInputChange("llmName", value)
                    }
                  >
                    <SelectTrigger
                      className={`${
                        errors.llmName ? "border-red-300" : ""
                      } border-0`}
                    >
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">Openai</SelectItem>
                      <SelectItem value="deepseek">DeepSeek</SelectItem>
                      <SelectItem value="mistral">Mistral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  variant="outline"
                  className="bg-blue-600 hover:bg-blue-700   px-8 py-3 text-base font-medium"
                >
                  <Target className="h-5 w-5 mr-2" />
                  Analyze Resume
                </Button>
              </div>
            </form>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="shadow-sm border-gray-200 text-center">
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    ATS Optimization
                  </h3>
                  <p className="text-sm text-gray-600">
                    Get your resume past Applicant Tracking Systems
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-gray-200 text-center">
                <CardContent className="pt-6">
                  <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Skills Analysis
                  </h3>
                  <p className="text-sm text-gray-600">
                    Compare your skills with job requirements
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-gray-200 text-center">
                <CardContent className="pt-6">
                  <Users className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Industry Benchmarks
                  </h3>
                  <p className="text-sm text-gray-600">
                    See how you stack up against industry standards
                  </p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </TooltipProvider>
    </>
  );
}
