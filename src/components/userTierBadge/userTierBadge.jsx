import React from "react";
import { Crown } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const UserTierBadge = ({ isPro }) => {
  return (
    <div>
      {!isPro && (
        <div className="mb-4 p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            <span className="font-semibold sm:text-base text-sm">
              Free Plan - Limited Features
            </span>
          </div>
          <Link to="/plans">
            <Button
              variant="outline"
              className="bg-white text-amber-600 hover:bg-gray-100"
            >
              Upgrade Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserTierBadge;
