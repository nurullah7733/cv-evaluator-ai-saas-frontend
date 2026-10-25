"use client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pricing } from "@/lib/pricing";
import { useAuth } from "@clerk/clerk-react";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Download,
  FileText,
  Target,
  Users,
  Crown,
  ArrowRight,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import { reFetchUserData } from "../APIRequest/refetchUserDataApi";

export default function PaymentSuccessPage() {
  const location = useLocation();
  const [sessionId, setSessionId] = useState("");
  const [planType, setPlanType] = useState("yearly");
  const { getToken } = useAuth();
  useEffect(() => {
    // Parse query parameters using URLSearchParams
    const searchParams = new URLSearchParams(location.search);
    const session = searchParams.get("session_id");
    const plan = searchParams.get("plan") || "yearly";

    if (session) {
      setSessionId(session);
    }
    setPlanType(plan === "month" ? "monthly" : plan === "year" ? "yearly" : plan);
  }, [location.search]);

  const planDetails = {
    monthly: {
      name: "Monthly Plan",
      price: `$${pricing.monthly.toFixed(2)}`,
      period: "month",
      features: [
        "All Monthly Features",
        "Resume Templates",
        "Cover Letter Analysis",
        "PDF Export",
        "ATS Coverage",
        "Manager View",
        "Priority Support",
      ],
    },
    yearly: {
      name: "Yearly Plan",
      price: `$${pricing.yearly.toFixed(2)}`,
      period: "year",
      features: [
        "All Monthly Features",
        "Resume Templates",
        "Cover Letter Analysis",
        "PDF Export",
        "ATS Coverage",
        "Manager View",
        "Priority Support",
      ],
    },
  };

  useEffect(() => {
    (async () => {
      const token = await getToken();
      reFetchUserData(token);
    })();
  }, [getToken]);

  const currentPlan = planDetails[planType] || planDetails.yearly;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Success Message */}
        <Card className="shadow-sm border-gray-200 mb-8">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-6">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for subscribing to Resume AI Pro. Your account has
                been upgraded successfully.
              </p>

              {/* Plan Details */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Crown className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">
                    {currentPlan.name}
                  </h3>
                  <Badge className="bg-blue-600 text-white border-blue-600 text-xs">
                    Active
                  </Badge>
                </div>
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {currentPlan.price}
                  </span>
                  <span className="text-gray-600">/{currentPlan.period}</span>
                </div>
                <div className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {sessionId && (
                <p className="text-xs text-gray-500 mb-6">
                  Transaction ID: {sessionId.slice(0, 20)}...
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-sm border-gray-200 mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-blue-600" />
              What's Next?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Upload Your Resume
                  </h3>
                  <p className="text-sm text-gray-600">
                    Start by uploading your resume for comprehensive AI analysis
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Users className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Get Insights
                  </h3>
                  <p className="text-sm text-gray-600">
                    Receive detailed feedback and optimization suggestions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Download className="h-6 w-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Download Results
                  </h3>
                  <p className="text-sm text-gray-600">
                    Export your optimized resume and analysis reports
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="h-6 w-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Get Support
                  </h3>
                  <p className="text-sm text-gray-600">
                    Access priority support for any questions or issues
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-8"
            >
              Start Analyzing Resume
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Confirmation Email Notice */}
        <Card className="shadow-sm border-gray-200 mt-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Confirmation Email Sent
                </h3>
                <p className="text-sm text-gray-600">
                  We've sent a confirmation email with your subscription details
                  and receipt. If you don't see it in your inbox, please check
                  your spam folder.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
