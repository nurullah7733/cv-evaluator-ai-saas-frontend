"use client";

import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Check,
  X,
  Zap,
  Shield,
  Users,
  BarChart3,
  FileText,
  Target,
  Clock,
  Info,
  Crown,
  Loader,
} from "lucide-react";
import { subscriptionApiRequest } from "../APIRequest/proPlanSubcriptionApi";

const monthlyPriceId = import.meta.env.VITE_STRIPE_PRICE_MONTHLY;
const yearlyPriceId = import.meta.env.VITE_STRIPE_PRICE_YEARLY;

const plans = [
  {
    id: monthlyPriceId,
    name: "Monthly Plan",
    price: 15,
    period: "month",
    description:
      "Perfect for job seekers who need immediate resume optimization",
    popular: false,
    features: [
      {
        name: "Resume Analysis",
        included: true,
        tooltip: "Comprehensive ATS and skills analysis",
      },
      {
        name: "Job Match Scoring",
        included: true,
        tooltip: "Compare your resume against job descriptions",
      },
      {
        name: "Industry Benchmarking",
        included: true,
        tooltip: "See how you stack up against industry standards",
      },
      {
        name: "ATS Optimization",
        included: true,
        tooltip: "Ensure your resume passes applicant tracking systems",
      },
      {
        name: "Skills Gap Analysis",
        included: true,
        tooltip: "Identify missing skills for your target role",
      },
      {
        name: "Email Support",
        included: true,
        tooltip: "Get help via email within 24 hours",
      },
      {
        name: "PDF Export",
        included: false,
        tooltip: "Download optimized resume suggestions",
      },
      {
        name: "ATS Coverage",
        included: false,
        tooltip: "Optimize for 10+ ATS systems",
      },
      {
        name: "Manager View",
        included: false,
        tooltip: "Get insights from hiring managers",
      },

      {
        name: "Priority Support",
        included: false,
        tooltip: "Get faster response times",
      },
    ],
    buttonText: "Start Monthly Plan",
    buttonVariant: "outline",
  },
  {
    id: yearlyPriceId,
    name: "Yearly Plan",
    price: 170,
    period: "year",
    originalPrice: 180,
    description: "Best value for serious job seekers and career changers",
    popular: true,
    features: [
      {
        name: "Resume Analysis",
        included: true,
        tooltip: "Comprehensive ATS and skills analysis",
      },
      {
        name: "Job Match Scoring",
        included: true,
        tooltip: "Compare your resume against job descriptions",
      },
      {
        name: "Industry Benchmarking",
        included: true,
        tooltip: "See how you stack up against industry standards",
      },
      {
        name: "ATS Optimization",
        included: true,
        tooltip: "Ensure your resume passes applicant tracking systems",
      },
      {
        name: "Skills Gap Analysis",
        included: true,
        tooltip: "Identify missing skills for your target role",
      },

      {
        name: "Email Support",
        included: true,
        tooltip: "Get help via email within 24 hours",
      },
      {
        name: "PDF Export",
        included: true,
        tooltip: "Download optimized resume suggestions",
      },
      {
        name: "ATS Coverage",
        included: true,
        tooltip: "Optimize for 10+ ATS systems",
      },
      {
        name: "Manager View",
        included: true,
        tooltip: "Get insights from hiring managers",
      },
      {
        name: "Priority Support",
        included: true,
        tooltip: "Get faster response times",
      },
    ],
    buttonText: "Start Yearly Plan",
    buttonVariant: "default",
    savings: "Save $10",
  },
];

const stats = [
  { label: "Resumes Analyzed", value: "50,000+", icon: FileText },
  { label: "Job Matches Found", value: "25,000+", icon: Target },
  { label: "Success Rate", value: "94%", icon: BarChart3 },
  { label: "Happy Users", value: "15,000+", icon: Users },
];

const PlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const handlePlanSelect = async (planId) => {
    setLoading(true);
    setSelectedPlan(planId);
    const token = await getToken(); // Clerk token
    const sessionURL = await subscriptionApiRequest(planId, token);
    if (sessionURL) {
      window.location.href = sessionURL?.url;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 font-sans">
        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transform Your Resume with AI-Powered Insights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get detailed analysis, ATS optimization, and industry benchmarking
              to land your dream job faster
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="shadow-sm border-gray-200 text-center"
              >
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`shadow-sm border-2 transition-all duration-200 ${
                  plan.popular
                    ? "border-blue-500 shadow-lg scale-105"
                    : selectedPlan === plan.id
                    ? "border-blue-300"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CardHeader className="pb-4 relative">
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white border-blue-600">
                      <Crown className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  <CardTitle className="text-xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {plan.id === "yearly" ? (
                        <Zap className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-600" />
                      )}
                      {plan.name}
                    </div>
                  </CardTitle>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <div className="text-left">
                        <div className="text-sm text-gray-600">
                          per {plan.period}
                        </div>
                        {plan.originalPrice && (
                          <div className="text-xs text-gray-400 line-through">
                            ${plan.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                    {plan.savings && (
                      <Badge className="text-emerald-700 bg-emerald-50 border-emerald-200 text-xs">
                        {plan.savings}
                      </Badge>
                    )}
                    <p className="text-sm text-gray-600 mt-3">
                      {plan.description}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features List */}
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm flex-1 ${
                            feature.included ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {feature.name}
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0"
                            >
                              <Info className="h-3 w-3 text-gray-400" />
                              <span className="sr-only">
                                More info about {feature.name}
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={plan.id === selectedPlan ? loading : ""}
                    variant={plan.buttonVariant}
                    size="lg"
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border-blue-600 text-blue-600 hover:bg-blue-50"
                    }  `}
                  >
                    {plan.id === selectedPlan && loading && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Comparison */}
          <Card className="shadow-sm border-gray-200 mb-12">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-center">
                Why Choose Our Resume AI?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    ATS Optimized
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ensure your resume passes through Applicant Tracking Systems
                    with our advanced optimization
                  </p>
                </div>
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Industry Insights
                  </h3>
                  <p className="text-sm text-gray-600">
                    Get benchmarked against industry standards and see exactly
                    where you stand
                  </p>
                </div>
                <div className="text-center">
                  <Target className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Job Matching
                  </h3>
                  <p className="text-sm text-gray-600">
                    Analyze how well your resume matches specific job
                    descriptions and requirements
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-center">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Can I cancel anytime?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Yes, you can cancel your subscription at any time. No
                    questions asked, no hidden fees.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Do you offer refunds?
                  </h3>
                  <p className="text-sm text-gray-600">
                    We offer a 7-day money-back guarantee. If you're not
                    satisfied, we'll refund your payment.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    How accurate is the AI analysis?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our AI has been trained on thousands of successful resumes
                    and has a 94% accuracy rate in predicting resume success.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Is my data secure?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Absolutely. We use enterprise-grade encryption and never
                    share your personal information with third parties.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default PlansPage;
