import "./App.css";
import { SignedOut } from "@clerk/clerk-react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Layout from "./components/layout/layout";
import ResumeDashboard from "./pages/dashboardPage";
import SignInPage from "./pages/signInPage/";
import SignUpPage from "./pages/signUpPage";
import NotFoundPage from "./pages/notFoundPage";
import HomePage from "./pages/homePage";
import { ToastContainer } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import { setGlobalGetToken, GetGlobalToken } from "./lib/globalClerkToken";

// Minimal Protected wrapper (FE only)
import { SignedIn } from "@clerk/clerk-react";
import AppInitCreateUserInAPI from "./APIRequest/createUserApi";
import PlansPage from "./pages/planPage";
import PaymentSuccessPage from "./pages/paymentSuccessPage";
import PaymentCancelPage from "./pages/paymentCancelPage";
import ReportPage from "./pages/reportPage";
import { useEffect } from "react";
import Resumes from "./pages/resumes";
import ComparePage from "./pages/comparePage";
import ResumeDetailsPage from "./pages/resumeDetailsPage";
function Protected({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
}

function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      if (getToken) {
        setGlobalGetToken(getToken);
        await GetGlobalToken();
      }
    };
    fetchToken();
  }, [getToken]);

  // when user Signout to localStorage userData & isProUser clear
  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!token) {
        localStorage.removeItem("userData");
        localStorage.removeItem("analysisData");
        localStorage.removeItem("isProUser");
      }
    })();
  }, [getToken]);

  return (
    <>
      <Routes>
        {/* Public auth routes */}
        <Route
          path="/sign-in"
          element={
            <SignedOut>
              <SignInPage />
            </SignedOut>
          }
        />
        <Route
          path="/sign-up"
          element={
            <SignedOut>
              <SignUpPage />
            </SignedOut>
          }
        />
        <Route
          path="/plans"
          element={
            <Layout>
              <PlansPage />
            </Layout>
          }
        />
        <Route
          path="/payment/success"
          element={
            <Layout>
              <PaymentSuccessPage />
            </Layout>
          }
        />
        <Route
          path="/payment/cancel"
          element={
            <Layout>
              <PaymentCancelPage />
            </Layout>
          }
        />
        <Route
          index
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        {/* Protected shell: "/" holds Layout, children hold pages */}
        <Route
          path="/"
          element={
            <Protected>
              <Layout>
                <Outlet /> {/* VERY IMPORTANT for nested routes */}
              </Layout>
            </Protected>
          }
        >
          {/* index == "/" → HomePage */}
          <Route path="report" element={<ReportPage />} />
          <Route path="dashboard" element={<ResumeDashboard />} />
          <Route path="resumes" element={<Resumes />} />
          <Route path="resume-details/:id" element={<ResumeDetailsPage />} />
          <Route path="compare" element={<ComparePage />} />
        </Route>

        {/* Not found */}
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>

      {/* After user Login in Clerk to save it to DB in API  */}
      <AppInitCreateUserInAPI />
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
