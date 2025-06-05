import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Shield,
  Link,
  Globe,
  Code,
  CreditCard,
  Zap,
  MousePointer,
  BarChart3,
  Users,
  Clock,
} from "lucide-react";

const features = [
  {
    name: "Dead Simple Payment Links",
    description:
      "Create secure payment links in seconds. No coding required - just set amount, choose currency, and share. Perfect for invoices, one-time payments, and quick transactions.",
    icon: Link,
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100",
  },
  {
    name: "Multi-Currency Support",
    description:
      "Accept payments in USD, NGN, GBP, EUR, USDT, USDC, and ESPEES. Automatic currency conversion with transparent rates and instant settlement across all supported currencies.",
    icon: Globe,
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100",
  },
  {
    name: "Simple API Integration",
    description:
      "Clean, developer-friendly APIs that integrate in minutes. Comprehensive SDKs, webhooks, and documentation make implementation effortless for any tech stack.",
    icon: Code,
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100",
  },
  {
    name: "Bank-Grade Security",
    description:
      "256-bit encryption, PCI DSS Level 1 compliance, real-time fraud detection, and 24/7 monitoring. Your funds and customer data are protected with military-grade security.",
    icon: Shield,
    color: "from-red-500 to-red-600",
    bgColor: "from-red-50 to-red-100",
  },
  {
    name: "Instant Processing",
    description:
      "Lightning-fast payment processing with immediate fund access. Real-time notifications, instant settlement, and 99.9% uptime guarantee for seamless transactions.",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    bgColor: "from-yellow-50 to-orange-100",
  },
  {
    name: "Business Analytics",
    description:
      "Comprehensive dashboards with real-time insights. Track payment trends, customer behavior, conversion rates, and revenue analytics to grow your business.",
    icon: BarChart3,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "from-indigo-50 to-indigo-100",
  },
  {
    name: "Customer Experience",
    description:
      "Beautiful, mobile-optimized payment pages. Customers pay with their preferred method through secure, branded checkout experiences that build trust.",
    icon: Users,
    color: "from-pink-500 to-pink-600",
    bgColor: "from-pink-50 to-pink-100",
  },
  {
    name: "24/7 Support",
    description:
      "Round-the-clock customer support via chat, email, and phone. Dedicated account managers for enterprise clients with guaranteed response times.",
    icon: Clock,
    color: "from-teal-500 to-teal-600",
    bgColor: "from-teal-50 to-teal-100",
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-800 mb-6">
                Complete Feature Set
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                <span className="block text-gray-900 mb-2">
                  Everything you need for
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Simple, Secure Payments
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                From one-click payment links to enterprise APIs, we've built
                every feature you need to accept payments globally.{" "}
                <span className="font-semibold text-blue-600">
                  Simple setup.
                </span>{" "}
                <span className="font-semibold text-green-600">
                  Maximum security.
                </span>{" "}
                <span className="font-semibold text-purple-600">
                  Zero complexity.
                </span>
              </p>
            </div>

            {/* Currency showcase */}
            <div className="mb-20">
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-4 text-center">
                7 Currencies • 1 Simple Solution
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["USD", "NGN", "GBP", "EUR", "USDT", "USDC", "ESPEES"].map(
                  (currency) => (
                    <div
                      key={currency}
                      className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      <span className="font-semibold text-gray-700">
                        {currency}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
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
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}
                    >
                      <feature.icon className="h-8 w-8" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
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
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to experience all these features?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get started in 2 minutes with our simple setup process. No
                technical knowledge required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Start Accepting Payments
                  <svg
                    className="w-5 h-5 ml-2 inline"
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
                </button>
                <button className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                  View API Documentation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
