import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden w-screen">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-blue-700 border border-blue-200 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Simple, Secure, Global Payments
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            <span className="block text-gray-900 mb-2">Simple & Secure</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Payment Solution
            </span>
          </h1>

          {/* Description */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed mb-6">
              <span className="font-semibold text-blue-600">
                Dead simple setup.
              </span>{" "}
              <span className="font-semibold text-green-600">
                Bank-grade security.
              </span>
              <br />
              Accept payments in multiple currencies with just a few clicks.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              No complex integrations, no security worries. Create payment links
              in seconds or integrate our bulletproof APIs in minutes.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-100">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                Setup in under 2 minutes
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-100">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                256-bit encryption
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-100">
              <svg
                className="w-5 h-5 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                Instant fund access
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started in 2 Minutes
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>
            </Link>
            <Link href="/features">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Features
              </Button>
            </Link>
          </div>

          {/* Currency Support */}
          <div className="mb-16">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">
              7 Currencies, Zero Complexity
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["USD", "NGN", "GBP", "EUR", "USDT", "USDC", "ESPEES"].map(
                (currency) => (
                  <div
                    key={currency}
                    className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-gray-100"
                  >
                    <span className="font-semibold text-gray-700">
                      {currency}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">99.9%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">
                Uptime
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">2 Min</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">
                Setup Time
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">
                Security Breaches
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">
                Monitoring
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
