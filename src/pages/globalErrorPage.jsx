"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl border-2 border-red-200 p-12 text-center">
            {/* Critical Error Icon */}
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="h-12 w-12 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Error Badge */}
            <div className="mb-4">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-red-700 bg-red-100 border border-red-200">
                Critical Error
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Application Error
            </h1>

            {/* Error Message */}
            <p className="text-gray-600 mb-8 text-lg">
              A critical error occurred that prevented the application from
              running properly.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reload Application
              </button>

              <a
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Return Home
              </a>
            </div>

            {/* Support Info */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600 mb-2">
                Need immediate assistance?
              </p>
              <a
                href="mailto:support@resumeai.com"
                className="text-sm text-red-600 hover:text-red-700 font-semibold underline"
              >
                Contact Emergency Support →
              </a>
            </div>

            {/* Error Details (Dev Mode) */}
            {import.meta.env.NODE_ENV === "development" && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 mb-2">
                  Error Stack (Development Only)
                </summary>
                <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-48">
                  {error?.stack ||
                    error?.message ||
                    "No error details available"}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
