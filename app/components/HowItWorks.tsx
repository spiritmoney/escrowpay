import React from "react";
import { motion } from "framer-motion";
import { Wallet, ShieldCheck, BarChart } from "lucide-react";

const steps = [
  {
    title: "Create an Account",
    description: "Sign up for Escrow in minutes and verify your identity.",
    icon: Wallet,
  },
  {
    title: "Set Up Escrow",
    description:
      "Create a secure escrow for your transaction with customizable terms.",
    icon: ShieldCheck,
  },
  {
    title: "Complete Transaction",
    description:
      "Funds are released only when all parties agree, ensuring a safe exchange.",
    icon: BarChart,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            How Escrow Works
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Secure, transparent, and easy-to-use blockchain payments in three
            simple steps.
          </p>
        </div>

        <div className="mt-20">
          <div className="relative">
            {/* Connecting line */}
            {/* <div className="absolute left-1/2 w-0.5 h-full bg-blue-500 transform -translate-x-1/2" /> */}

            {/* Steps */}
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative z-10 flex items-center mb-12"
              >
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "text-right pr-8" : "pl-8"
                  }`}
                >
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-gray-400">{step.description}</p>
                </div>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                {index % 2 === 1 && (
                  <div className="flex-1" /> // Spacer for odd-numbered steps
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
