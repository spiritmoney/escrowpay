import React from "react";
import {
  Shield,
  Link,
  Users,
  Globe,
  Layout,
  LockKeyhole,
  BarChartIcon as ChartBar,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    name: "Escrow-Based Payments",
    description:
      "Secure fund holding through smart contracts for both fiat and cryptocurrency, with flexible refund mechanisms and dispute resolution.",
    icon: Shield,
  },
  {
    name: "Payment Links",
    description:
      "Generate and share payment links for goods, services, or digital products via email, social media, or direct messaging.",
    icon: Link,
  },
  {
    name: "P2P Trading",
    description:
      "Secure direct transactions between buyers and sellers with customizable trade conditions and transparent tracking.",
    icon: Users,
  },
  {
    name: "Multi-Currency Support",
    description:
      "Accept payments in various fiat currencies and cryptocurrencies with automated currency conversion capabilities.",
    icon: Globe,
  },
  {
    name: "Advanced Security",
    description:
      "Multi-layer authentication, wallet encryption, and smart contract audits with real-time transaction monitoring.",
    icon: LockKeyhole,
  },
  {
    name: "Business Tools & Analytics",
    description:
      "Comprehensive reporting with insights into payment trends, customer behavior, and API integration capabilities.",
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
