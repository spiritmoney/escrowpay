import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const Header: React.FC = () => {
  return (
    <main className="bg-black shadow-sm border-b border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center">
            <span className="ml-2 text-xl font-bold text-white">EspeesPay</span>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/features"
            className="text-gray-300 hover:text-blue-500 transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-gray-300 hover:text-blue-500 transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link
            href="/api-docs"
            className="text-gray-300 hover:text-blue-500 transition-colors duration-200"
          >
            API Docs
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
          >
            Log in
          </Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">
            Sign up
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Header;
