import { Lock, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProFeatureWrapper = ({
  children,
  isProUser,
  featureName = "Premium Feature",
}) => {
  // If user is Pro, show content normally
  if (isProUser) {
    return <>{children}</>;
  }

  // For Free users, show blurred content with overlay
  return (
    <>
      <div className="relative">
        {/* Blurred Content */}
        <div className="filter blur-[1px] opacity-80 pointer-events-none select-none">
          {children}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0   flex items-center justify-center bg-gradient-to-br from-white/40 via-blue-50/60 to-purple-50/60">
          <div className="text-center px-6 py-8 max-w-sm">
            {/* Crown Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg">
              <Crown className="w-8 h-8 text-white" />
            </div>

            {/* Feature Name */}
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              {featureName}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">
              Unlock detailed insights with Pro
            </p>

            {/* Upgrade Button */}
            <Link to="/plans">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200">
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </Link>

            {/* Social Proof */}
            <p className="text-xs text-gray-500 mt-3">
              Join 10,000+ professionals
            </p>
          </div>
        </div>

        {/* Lock Badge with Glassmorphism */}
        <div className="absolute top-4 right-4 bg-gray-900/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl border border-white/20 z-10">
          <Lock className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold tracking-wide">PRO</span>
        </div>
      </div>
    </>
  );
};

export default ProFeatureWrapper;

// ==========================================
// USAGE EXAMPLE in ResumeDashboard.jsx
// ==========================================

/*
import ProFeatureWrapper from './ProFeatureWrapper';
import { useSelector } from 'react-redux';

export default function ResumeDashboard() {
  // Get user subscription status from Redux
  const userSubscription = useSelector((state) => state.user.subscription);
  const isProUser = userSubscription?.tier === 'pro' || userSubscription?.tier === 'premium';
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* FREE CONTENT - No Wrapper Needed *}
      <section className="lg:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            // ... free content
          </CardContent>
        </Card>
      </section>

      {/* PRO CONTENT - Wrap with ProFeatureWrapper *}
      <section className="lg:col-span-4">
        <ProFeatureWrapper 
          isProUser={isProUser} 
          featureName="ATS Coverage Analysis"
        >
          <Card>
            <CardHeader>
              <CardTitle>ATS Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              // ... pro content (will be blurred for free users)
            </CardContent>
          </Card>
        </ProFeatureWrapper>
      </section>

      {/* ANOTHER PRO FEATURE *}
      <section className="lg:col-span-4">
        <ProFeatureWrapper 
          isProUser={isProUser} 
          featureName="Skills Benchmark"
        >
          <SkillsCoverageBenchmarkChart apiData={analysis} />
        </ProFeatureWrapper>
      </section>

      {/* SALARY CHART - PRO FEATURE *}
      <section className="lg:col-span-5">
        <ProFeatureWrapper 
          isProUser={isProUser} 
          featureName="Salary Insights"
        >
          <SalaryBandChart apiData={analysis} />
        </ProFeatureWrapper>
      </section>

    </div>
  );
}
*/
