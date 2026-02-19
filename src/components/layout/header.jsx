import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, File, Loader2 } from "lucide-react";

import { stripeBillingPortalApiRequest } from "../../APIRequest/stripeBillingPortalApi";
import { useState } from "react";

const Header = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);

  const handleManageResumes = () => {
    navigate("/resumes");
  };

  const handleManageSubscription = async () => {
    setIsLoadingSubscription(true);
    const token = await getToken(); // Clerk token
    const result = await stripeBillingPortalApiRequest(token);
    setTimeout(() => {
      setIsLoadingSubscription(false);
    }, 5000);

    if (result) {
      window.location.href = result.url; // Redirect to Stripe Billing Portal
    }
  };

  return (
    <>
      {isLoadingSubscription && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white/10   backdrop-blur-lg rounded-2xl p-8 flex items-center space-x-4 shadow-xl border border-white/20">
            <Loader2 size={28} className="animate-spin text-white" />
            <span className="text-xl text-white font-medium">
              Loading billing portal...
            </span>
          </div>
        </div>
      )}

      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Resume Evaluator
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Smart Resume Evaluator
                </p>
              </Link>
            </div>
            <div className="text-gray-700 !cursor-pointer ">
              <SignedOut>
                <div className="border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 px-4 py-1">
                  <SignInButton mode="redirect" signinurl="/sign-in" />
                </div>
              </SignedOut>

              <SignedIn>
                <UserButton
                  signOutCallback={() => console.log("hi")}
                  appearance={{
                    elements: {
                      avatarBox: {
                        width: "40px",
                        height: "40px",
                      },
                    },
                  }}
                >
                  {/* Custom Manage resumes */}
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="Manage resumes"
                      labelIcon={<File size={16} />}
                      onClick={handleManageResumes}
                    />
                  </UserButton.MenuItems>

                  {/* Custom Menu Items */}
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="Manage subscription"
                      labelIcon={<CreditCard size={16} />}
                      onClick={handleManageSubscription}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
