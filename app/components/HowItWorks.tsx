import React from "react";
import { motion } from "motion/react";
import { Wallet, ShieldCheck, BarChart } from "lucide-react";

const steps = [
  {
    title: "Create an Account",
    description: "Sign up for Paylinc in minutes. Verify your identity and access multiple currency options - both crypto and fiat.",
    icon: Wallet,
  },
  {
    title: "Set Up a Pay link",
    description:
      "Create secure, customizable payment links for your goods, services, or digital products. Define terms, set conditions, and share with buyers.",
    icon: ShieldCheck,
  },
  {
    title: "Complete Transaction",
    description:
      "Funds are held safely in our smart contract until all conditions are met. Once both parties are satisfied, funds are automatically released.",
    icon: BarChart,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            How Paylinc Works
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            A blockchain-powered payment solution that simplifies secure transactions
          </p>
          
          <div className="mt-6 max-w-3xl mx-auto">
            <p className="text-gray-400 leading-relaxed">
              Paylinc combines P2P trading flexibility with customizable payment links,
              enabling seamless transactions for goods, services, and digital products.
              With support for multiple currencies, our platform ensures your funds are
              secure until all parties are satisfied.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Multiple Currency Support",
              "Smart Contract Security",
              "Customizable Payment Links",
              "Global Accessibility",
              "Fraud Protection",
              "Transparent Transactions"
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <p className="text-white font-semibold">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex p-6 rounded-lg"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
