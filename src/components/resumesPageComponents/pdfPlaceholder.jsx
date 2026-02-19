import { FileText } from "lucide-react";

const PDFPlaceholder = ({ resume }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
        <FileText className="h-16 w-16 text-blue-600" />
      </div>
      <h4 className="font-semibold text-gray-800 text-center mb-1">
        {resume?.candidateName}
      </h4>
      <p className="text-sm text-gray-600 text-center">{resume?.targetRole}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <FileText className="h-3 w-3" />
        <span>PDF Resume</span>
      </div>
    </div>
  );
};

export default PDFPlaceholder;
