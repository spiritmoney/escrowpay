import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const BackToHomeButton = () => {
  return (
    <Link
      href="/"
      className="fixed top-4 left-4 md:absolute md:top-8 md:left-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors bg-white/80 backdrop-blur-sm py-2 px-3 rounded-lg shadow-sm z-50"
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      <span className="hidden sm:inline">Back to Home</span>
      <span className="sm:hidden">Back</span>
    </Link>
  );
}; 