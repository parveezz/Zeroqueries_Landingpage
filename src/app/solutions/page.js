export const metadata = {
  title: "Solutions | ZeroQueries",
  description: "Explore tailored data intelligence solutions for modern teams and industries.",
};

export default function SolutionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          Solutions
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Solutions for Every Team
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          Whether you lead RevOps, FP&A, Marketing, or Engineering, ZeroQueries accelerates decisions from days to seconds.
        </p>
      </div>
    </div>
  );
}
