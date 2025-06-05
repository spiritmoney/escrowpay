"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100 sticky top-0 z-50 overflow-x-hidden w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Escrow
          </span>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link
            href="/features"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            About us
          </Link>
          <Link
            href="/api-docs"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            API Docs
          </Link>
        </nav>

        <div className="hidden md:flex space-x-3">
          <Link href="/auth/register">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-gray-900 p-2"
            variant="ghost"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </Button>

          {isMenuOpen && (
            <div className="absolute top-full right-0 left-0 bg-white shadow-lg border border-gray-100 py-2 z-50">
              <Link
                href="/features"
                className="block px-6 py-3 text-gray-700 hover:bg-gray-50"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block px-6 py-3 text-gray-700 hover:bg-gray-50"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="block px-6 py-3 text-gray-700 hover:bg-gray-50"
              >
                About us
              </Link>
              <Link
                href="/api-docs"
                className="block px-6 py-3 text-gray-700 hover:bg-gray-50"
              >
                API Docs
              </Link>
              <div className="border-t border-gray-100 my-2"></div>
              <Link
                href="/auth/register"
                className="block px-6 py-3 text-blue-600 hover:bg-blue-50"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
