const Footer = () => {
  return (
    <div className="bg-white border-t border-gray-200 px-2 py-1 text-black flex justify-center items-center">
      <p className="text-xs text-gray-600">
        © {new Date().getFullYear()} Resume Evaluator AI — Empowering Your
        Career
      </p>
    </div>
  );
};

export default Footer;
