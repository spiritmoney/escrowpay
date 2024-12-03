import React from "react";
import {
  Shield,
  Code,
  CreditCard,
  Globe,
  Clock,
  BarChartIcon as ChartBar,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    name: "Secure Transactions",
    description:
      "Our blockchain escrow system ensures safe and transparent transactions, protecting both buyers and sellers.",
    icon: Shield,
  },
  {
    name: "Easy Integration",
    description:
      "Seamless API integration for businesses of all sizes, with comprehensive documentation and dedicated support.",
    icon: Code,
  },
  {
    name: "Customizable Checkout",
    description:
      "Fully customizable hosted checkout pages that seamlessly blend with your brand identity.",
    icon: CreditCard,
  },
  {
    name: "Global Payments",
    description:
      "Support for multiple currencies and languages, enabling you to conduct business on a global scale.",
    icon: Globe,
  },
  {
    name: "Real-time Tracking",
    description:
      "Monitor your transactions in real-time with detailed reporting and analytics tools.",
    icon: Clock,
  },
  {
    name: "Advanced Analytics",
    description:
      "Gain valuable insights into your payment flows with our advanced analytics and reporting features.",
    icon: ChartBar,
  },
];

const Features: React.FC = () => {
  return (
    <div className="py-24 bg-gray-900" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <div className="text-base text-blue-500 font-semibold tracking-wide uppercase">
            Features
          </div>
          <div className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Why Choose Escrow?
          </div>
          <div className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            Escrow prioritizes security, transparency, and usability, making
            it a trusted choice for cryptocurrency transactions worldwide.
          </div>
        </div>

        <div className="mt-20">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <div key={index} className="relative">
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
  );
};

export default Features;
