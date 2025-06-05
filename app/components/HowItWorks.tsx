import React from "react";
import { UserPlus, Link2, DollarSign } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Sign Up (30 Seconds)",
    description:
      "Just email and password. No lengthy forms, no complex verification. We verify your business details securely in the background while you start creating payment links.",
    icon: UserPlus,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Create Payment Link (1 Minute)",
    description:
      "Set amount, choose currency, and share. It's that simple. Our secure payment pages handle everything - no coding, no technical setup required.",
    icon: Link2,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Get Paid Instantly",
    description:
      "Customers pay with their preferred method. Funds appear in your account immediately with bank-grade security protecting every transaction.",
    icon: DollarSign,
    color: "from-green-500 to-green-600",
  },
];

const highlights = [
  "2-Minute Setup",
  "Zero Technical Knowledge",
  "Bank-Grade Security",
  "Instant Notifications",
  "Simple API Integration",
  "24/7 Fraud Protection",
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden w-screen">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200 mb-6">
            How It Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Start accepting payments in{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              under 2 minutes
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            We've designed the simplest possible payment experience without
            compromising on security
          </p>

          <div className="max-w-4xl mx-auto">
            <p className="text-gray-500 leading-relaxed mb-12">
              No technical knowledge required. No complex setup. No security
              headaches. Just simple, secure payments that work for businesses
              of any size.
            </p>
          </div>

          {/* Highlights Grid */}
          {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <p className="text-sm font-medium text-gray-700">{highlight}</p>
              </div>
            ))}
          </div> */}
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {/* Step number */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 font-bold text-lg mb-6 mx-auto lg:mx-0">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} text-white mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}
                  >
                    <step.icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow for large screens */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                      <svg
                        className="w-6 h-6 text-gray-300"
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
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simplicity vs Security comparison */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border border-green-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-5 h-5 text-white"
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
              <h3 className="text-xl font-bold text-gray-900">
                Simplicity First
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              We believe payments should be as easy as sending an email. No
              technical setup required.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
                One-click payment link creation
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
                Copy-paste sharing (email, SMS, social)
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
                Clean, intuitive dashboard
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
                5-minute API integration
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-5 h-5 text-white"
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
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Security Never Compromised
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Behind our simple interface lies enterprise-grade security that
              protects every transaction.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                End-to-end encryption on all payments
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                AI-powered fraud detection
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                Real-time security monitoring
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                PCI DSS Level 1 compliance
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to experience the simplest payment solution?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of businesses who chose simplicity without
              sacrificing security
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Get Started in 2 Minutes
              </button>
              <button className="border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                <Link href="/api-docs">View API Docs</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
