import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "Up to 1,000 transactions per month",
      "Basic API access",
      "Email support",
      "Basic analytics",
      "Custom checkout pages",
    ],
  },
  {
    name: "Pro",
    price: 10,
    features: [
      "Up to 2,000 transactions per month",
      "Full API access",
      "Priority email and chat support",
      "Advanced analytics and reporting",
      "Custom checkout pages",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited transactions",
      "Full API access",
      "Dedicated account manager",
      "24/7 phone, email, and chat support",
      "Custom integrations",
      "On-premise deployment options",
    ],
  },
];

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-grow my-5">
        <div className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2
                className="text-3xl font-extrabold text-white sm:text-4xl"
              >
                Simple, transparent pricing
              </h2>
              <p
                className="mt-4 text-xl text-gray-400"
              >
                Choose the plan that best fits your business needs
              </p>
            </div>
            <div className="mt-20 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
              {tiers.map((tier, index) => (
                <div
                  key={tier.name}
                  className="relative p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-sm flex flex-col"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">
                      {tier.name}
                    </h3>
                    {typeof tier.price === "number" ? (
                      <p className="mt-4 flex items-baseline text-white">
                        <span className="text-5xl font-extrabold tracking-tight">
                          ${tier.price}
                        </span>
                        <span className="ml-1 text-xl font-semibold">
                          /month
                        </span>
                      </p>
                    ) : (
                      <p className="mt-4 text-5xl font-extrabold text-white">
                        {tier.price}
                      </p>
                    )}
                    <ul role="list" className="mt-6 space-y-6">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex">
                          <Check
                            className="flex-shrink-0 w-6 h-6 text-blue-500"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href="/auth/register">
                    <Button className="mt-8 block w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">
                      {tier.name === "Enterprise"
                        ? "Contact sales"
                        : "Get started"}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;