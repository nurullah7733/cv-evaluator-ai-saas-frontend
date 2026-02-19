const ReAnalysisLoader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div>
            <img className="max-w-sm" src="/resume-scan-2.gif" />
          </div>
        </div>
      )}
    </>
  );
};

export default ReAnalysisLoader;
