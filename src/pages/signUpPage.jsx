import { SignUp, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// eslint-disable-next-line no-unused-vars
import { setMode, selectResolved } from "../features/theme/themeSlice";
import { useSelector } from "react-redux";

function SignUpPage() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  // eslint-disable-next-line no-unused-vars
  const resolvedTheme = useSelector(selectResolved);
  const mode = useSelector((state) => state.theme.mode);

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate("/", { replace: true });
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {mode === "dark" ? (
            <SignUp
              key={mode}
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              // appearance={darkAppearance}
            />
          ) : (
            <SignUp
              key={mode}
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              // appearance={lightAppearance}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
