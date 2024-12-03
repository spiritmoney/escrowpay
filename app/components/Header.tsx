"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="hidden md:flex space-x-4">
          <Link href="/auth/signin">
            <Button
              variant="outline"
              className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
            >
              Log in
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">
              Sign up
            </Button>
          </Link>
        </div>
        <div className="md:hidden">
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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
                xmlns="http://www.w3.org/2000/svg"
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
            <div className="absolute top-16 right-0 left-0 bg-black shadow-lg py-2 z-50">
              <Link
                href="/features"
                className="block p-5 text-blue-500 hover:bg-blue-200"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block p-5 text-blue-500 hover:bg-blue-200"
              >
                Pricing
              </Link>
              <Link
                href="/api-docs"
                className="block p-5 text-blue-500 hover:bg-blue-200"
              >
                API Docs
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <Link
                href="/auth/signin"
                className="block p-5 text-blue-500 hover:bg-blue-200"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="block p-5 text-blue-500 hover:bg-blue-200"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Header;
