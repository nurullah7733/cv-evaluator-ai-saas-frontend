import { Crown, Lock, Sparkles } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

// Upgrade CTA Component
// eslint-disable-next-line no-unused-vars
export const UpgradeCard = ({ feature, icon: Icon, description }) => (
  <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 opacity-10 rounded-full -mr-16 -mt-16" />
    <CardContent className="pt-8 pb-6 relative">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-amber-500 rounded-lg">
          <Lock className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="h-5 w-5 text-amber-600" />
            <h3 className="font-bold text-gray-900">Pro Feature Locked</h3>
          </div>
          <p className="text-sm text-gray-700 mb-3">{feature}</p>
          <p className="text-xs text-gray-600 mb-4">{description}</p>
          <Link to="/plans">
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold">
              <Sparkles className="h-4 w-4 mr-2" />
              Upgrade to Pro
            </Button>
          </Link>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Mini Locked Card
// eslint-disable-next-line no-unused-vars
export const LockedMetricCard = ({ title, icon: Icon }) => (
  <Card className="border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 relative">
    <div className="absolute inset-0 backdrop-blur-sm bg-white/40 flex items-center justify-center">
      <Lock className="h-12 w-12 mb-5 text-gray-400" />
    </div>
    <CardContent className="pt-6 opacity-50">
      <div className="flex items-center justify-between mb-3">
        <Icon className="h-8 w-8 text-gray-400" />
        <Badge className="bg-gray-400 text-white">Pro Only</Badge>
      </div>
      <div className="text-5xl font-bold mb-2 text-gray-400">--</div>
      <p className="text-sm text-gray-500 mb-3">{title}</p>
      <div className="h-2 bg-gray-300 rounded-full" />
    </CardContent>
  </Card>
);
