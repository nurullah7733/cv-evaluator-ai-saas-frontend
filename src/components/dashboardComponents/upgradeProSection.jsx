import { Button } from "../ui/button";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  Users,
  Target,
  Eye,
  Info,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  RefreshCcwDot,
  BookOpenCheck,
  Lock,
  Crown,
  Sparkles,
  Zap,
} from "lucide-react";
const UpgradePrompt = ({ title, features, ctaText = "Upgrade to Pro" }) => {
  return (
    <div className="relative">
      {/* Blurred Preview */}
      <div className="filter blur-sm pointer-events-none select-none opacity-50">
        <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg">
            <Crown className="h-8 w-8 text-white" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

          <p className="text-sm text-gray-600 mb-4">
            Unlock advanced insights to boost your career
          </p>

          {features && features.length > 0 && (
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 mb-4 text-left">
              <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                What you'll get:
              </p>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold shadow-lg">
            <Crown className="h-4 w-4 mr-2" />
            {ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpgradePrompt;
