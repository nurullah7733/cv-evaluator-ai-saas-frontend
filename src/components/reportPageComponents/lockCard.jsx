import { CheckCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const LockedCard = ({ icon, title, description, hints }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-400">
            {icon}
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          <Lock className="text-gray-400" size={24} />
        </div>
        <p className="text-gray-500 mb-4">{description}</p>

        {/* Show hints if provided */}
        {hints && hints.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-xs font-semibold text-blue-900 mb-2">
              What you'll unlock:
            </div>
            <ul className="space-y-1">
              {hints.map((hint, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-blue-700"
                >
                  <CheckCircle size={12} className="flex-shrink-0 mt-0.5" />
                  <span>{hint}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link
          to="/plans"
          className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Lock size={16} />
          Unlock with Pro
        </Link>
      </div>
    </div>
  );
};

export default LockedCard;
