import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { 
  Shield, 
  Link, 
  Users, 
  Wallet, 
  Layout, 
  Lock, 
  BarChart3 
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    name: "Escrow-Based Payments",
    description:
      "Our smart contracts securely hold funds in fiat or cryptocurrency until transaction terms are met, with flexible refund and dispute resolution mechanisms.",
    icon: Shield,
  },
  {
    name: "Payment Links",
    description:
      "Generate and share payment links for goods, services, or digital products via email, social media, or direct messaging. Supports one-time payments, subscriptions, and donations.",
    icon: Link,
  },
  {
    name: "P2P Trading",
    description:
      "Facilitate secure, direct transactions between buyers and sellers with customizable trade conditions and transparent tracking for both fiat-to-crypto and crypto-to-crypto exchanges.",
    icon: Users,
  },
  {
    name: "Multi-Currency Support",
    description:
      "Accept payments in various fiat currencies and cryptocurrencies with automated currency conversion and future plans for fiat on/off ramping.",
    icon: Wallet,
  },
  {
    name: "Advanced Security",
    description:
      "Multi-layer authentication, wallet encryption, smart contract audits, and anti-fraud measures including real-time transaction monitoring.",
    icon: Lock,
  },
  {
    name: "Business Tools and Analytics",
    description:
      "Track transactions in real-time with comprehensive reports, gain insights into payment trends and customer behavior, with APIs for automated workflows.",
    icon: BarChart3,
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
                Everything you need for Secure payments
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
                Escrow combines P2P trading flexibility with customizable payment links, 
                enabling secure transactions for goods, services, and digital products. Our escrow system supports both crypto and fiat currencies, 
                ensuring trust and peace of mind for businesses and individuals worldwide.
              </p>
            </div>

            <div className="mt-20 mb-10">
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
