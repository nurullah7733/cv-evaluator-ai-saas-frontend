"use client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Replace next/navigation with react-router-dom
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  XCircle,
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  RefreshCw,
  Crown,
} from "lucide-react";
import { Link } from "react-router-dom"; // Replace next/link with react-router-dom

export default function PaymentCancelPage() {
  const location = useLocation(); // Get location object from react-router-dom
  const [planType, setPlanType] = useState("yearly");

  useEffect(() => {
    // Parse query parameters using URLSearchParams
    const searchParams = new URLSearchParams(location.search);
    const plan = searchParams.get("plan") || "yearly";
    setPlanType(plan);
  }, [location.search]);

  const planDetails = {
    monthly: {
      name: "Monthly Plan",
      price: "$15",
      period: "month",
    },
    yearly: {
      name: "Yearly Plan",
      price: "$170",
      period: "year",
      savings: "Save $10",
    },
  };

  const currentPlan = planDetails[planType] || planDetails.yearly;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Cancel Message */}
        <Card className="shadow-sm border-gray-200 mb-8">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Cancelled
              </h2>
              <p className="text-gray-600 mb-6">
                Your subscription to Resume AI Pro was not completed. Don't
                worry, no payment has been processed.
              </p>

              {/* Plan Details */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Crown className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">
                    {currentPlan.name}
                  </h3>
                  <Badge className="bg-gray-600 text-white border-gray-600 text-xs">
                    Not Active
                  </Badge>
                </div>
                <div className="text-center mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {currentPlan.price}
                  </span>
                  <span className="text-gray-600">/{currentPlan.period}</span>
                </div>
                {currentPlan.savings && (
                  <Badge className="text-emerald-700 bg-emerald-50 border-emerald-200 text-xs">
                    {currentPlan.savings}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Subscribe Section */}
        <Card className="shadow-sm border-gray-200 mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Crown className="h-5 w-5 text-blue-600" />
              Why Subscribe to Resume AI Pro?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Unlock Premium Features:
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    Advanced ATS optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    Industry benchmarking insights
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    Job match scoring
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    PDF Export
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    ATS Coverage
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    Manager View
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Success Statistics:
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="font-semibold text-emerald-600">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Resumes Analyzed
                    </span>
                    <span className="font-semibold text-blue-600">50,000+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Happy Users</span>
                    <span className="font-semibold text-amber-600">
                      15,000+
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link to="/plans">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-8"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </Button>
          </Link>

          <Link to="/">
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 bg-transparent"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Need Help?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    If you encountered any issues during payment, our support
                    team is here to help.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Have Questions?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Check out our FAQ section or chat with us to learn more
                    about Resume AI Pro.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-emerald-600 border-emerald-600 hover:bg-emerald-50 bg-transparent"
                  >
                    View FAQ
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
