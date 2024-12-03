import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Shield, Code, CreditCard, Lock, Globe, Clock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    name: "Secure Transactions",
    description:
      "Our blockchain escrow system ensures safe and transparent transactions for all parties involved.",
    icon: Shield,
  },
  {
    name: "Easy Integration",
    description:
      "Seamless API integration for businesses of all sizes, with comprehensive documentation and support.",
    icon: Code,
  },
  {
    name: "Customizable Checkout",
    description:
      "Hosted checkout pages that you can customize to match your brand and provide a seamless experience for your customers.",
    icon: CreditCard,
  },
  {
    name: "Advanced Encryption",
    description:
      "State-of-the-art encryption protocols to protect your data and transactions at all times.",
    icon: Lock,
  },
  {
    name: "Global Support",
    description:
      "Support for multiple currencies and languages, enabling you to conduct business on a global scale.",
    icon: Globe,
  },
  {
    name: "Real-time Tracking",
    description:
      "Monitor your transactions in real-time, with detailed reporting and analytics tools.",
    icon: Clock,
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-grow">
        <div className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">
                Features
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Everything you need for secure blockchain payments
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
                EspeesPay provides a comprehensive suite of features to make
                your cryptocurrency transactions smooth, secure, and efficient.
              </p>
            </div>

            <div className="mt-20">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {features.map((feature, index) => (
                  <div key={feature.name} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-white">
                        {feature.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-400">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
