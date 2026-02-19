import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist.
        <br />
        Resume Evaluator AI is here to empower your career—please check the URL
        or return to the homepage.
      </p>
      <a
        href="/"
        className="px-4 py-2 hover:bg-primary text-white rounded bg-primary-foreground transition"
      >
        Go to Homepage
      </a>
    </div>
  );
};

export default NotFoundPage;
