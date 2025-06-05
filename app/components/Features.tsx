import React from "react";
import {
  Shield,
  Link,
  Globe,
  Code,
  CreditCard,
  Zap,
  BarChartIcon as ChartBar,
  MousePointer,
} from "lucide-react";

const features = [
  {
    name: "Dead Simple Setup",
    description:
      "Create payment links in under 2 minutes. No technical knowledge required. Just sign up, verify, and start accepting payments instantly.",
    icon: MousePointer,
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100",
  },
  {
    name: "Bank-Grade Security",
    description:
      "256-bit encryption, fraud detection, PCI compliance, and real-time monitoring. Your funds and customer data are protected with military-grade security.",
    icon: Shield,
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100",
  },
  {
    name: "One-Click Payment Links",
    description:
      "Generate secure payment links instantly. Share via email, SMS, or social media. No coding, no complexity - just copy, paste, and get paid.",
    icon: Link,
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100",
  },
  {
    name: "Simple API Integration",
    description:
      "Clean, well-documented APIs that take minutes to integrate. Our SDKs handle the complexity so you can focus on your business.",
    icon: Code,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "from-indigo-50 to-indigo-100",
  },
  {
    name: "7 Currencies, Zero Hassle",
    description:
      "Accept USD, NGN, GBP, EUR, USDT, USDC, and ESPEES effortlessly. Automatic conversion, transparent rates, instant settlement.",
    icon: Globe,
    color: "from-orange-500 to-orange-600",
    bgColor: "from-orange-50 to-orange-100",
  },
  {
    name: "Instant & Secure Processing",
    description:
      "Payments process in seconds with bulletproof security. Real-time notifications, immediate fund access, zero downtime guaranteed.",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    bgColor: "from-yellow-50 to-orange-100",
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden w-screen" id="features">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full filter blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-800 mb-4">
            Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Simple
            </span>{" "}
            to use.
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Secure
            </span>{" "}
            by design.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We've eliminated complexity without compromising security. Every
            feature is designed to be intuitive for you and bulletproof for your
            business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
              ></div>

              <div className="relative">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 shadow-lg`}
                >
                  <feature.icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {feature.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Simplicity showcase */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Simplicity */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Ridiculously Simple
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Create Account</p>
                  <p className="text-gray-600 text-sm">
                    30 seconds, just email and password
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-semibold text-gray-900">
                    Create Payment Link
                  </p>
                  <p className="text-gray-600 text-sm">
                    1 minute, set amount and currency
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  3
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Get Paid</p>
                  <p className="text-gray-600 text-sm">
                    Share link, receive money instantly
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Bank-Grade Security
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
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
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span className="text-gray-700">
                  256-bit SSL encryption on all transactions
                </span>
              </div>
              <div className="flex items-center space-x-3">
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
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span className="text-gray-700">
                  PCI DSS Level 1 compliance
                </span>
              </div>
              <div className="flex items-center space-x-3">
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
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span className="text-gray-700">
                  Real-time fraud detection & prevention
                </span>
              </div>
              <div className="flex items-center space-x-3">
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
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span className="text-gray-700">
                  24/7 security monitoring & alerts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <span>Trusted by businesses who value simplicity and security</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
