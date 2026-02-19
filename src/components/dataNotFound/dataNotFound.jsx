"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Database,
  Home,
  RefreshCw,
  Search,
  AlertTriangle,
  PanelLeftDashed,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DataNotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans flex items-center justify-center p-6">
      {/* Decorative Elements */}
      <div className="fixed top-10 left-10 w-32 h-32 bg-amber-200 rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-3xl pointer-events-none" />

      <Card className="max-w-2xl w-full border-2 border-amber-200 relative z-10">
        <CardContent className="pt-12 pb-12 text-center">
          {/* Icon Animation */}
          <div className="mb-6 relative">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-50 rounded-full border-4 border-amber-200 animate-pulse-slow">
              <Database className="h-12 w-12 text-amber-600" />
            </div>
            <div className="absolute top-0 right-1/3 animate-bounce-delayed">
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
          </div>

          {/* Status Badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-amber-700 bg-amber-100 border border-amber-300">
              Data Not Available
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            No Data Found
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
            We couldn't find the data you're looking for. It may have been
            removed, or you might not have access to it.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <Link to="/resumes">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 min-w-[200px]"
              >
                <PanelLeftDashed className="h-5 w-5 mr-2" />
                Go to Resumes
              </Button>
            </Link>

            <Link to={"/"}>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 min-w-[200px] bg-transparent"
              >
                <Home className="h-5 w-5 mr-2" />
                Go to Homepage
              </Button>
            </Link>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-6 bg-amber-50 rounded-xl border-2 border-amber-200 max-w-lg mx-auto">
            <div className="flex items-start gap-4 text-left">
              <div className="flex-shrink-0 mt-1">
                <Search className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Why am I seeing this?
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>
                      The data you requested doesn't exist or has been deleted
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>
                      You might not have permission to access this resource
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>The link you followed may be broken or outdated</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-4">
              Quick Actions:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white text-gray-700"
                >
                  Upload Resume
                </Button>
              </Link>

              <Link to="/resumes">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white text-gray-700"
                >
                  All Resumes
                </Button>
              </Link>
              <Link to="/plans">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white text-gray-700"
                >
                  Pricing Plans
                </Button>
              </Link>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6">
            <p className="text-xs text-gray-500">
              Need help? Contact our support team at{" "}
              <a
                href="mailto:support@example.com"
                className="text-blue-600 hover:underline font-medium"
              >
                support@example.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        @keyframes bounce-delayed {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-bounce-delayed {
          animation: bounce-delayed 2s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}
