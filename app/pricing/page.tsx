import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight, Shield, Zap, Users } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    period: "Forever",
    description: "Perfect for small businesses and individuals getting started",
    features: [
      "Up to 100 payments per month",
      "Payment links & basic API access",
      "Email support within 24 hours",
      "Basic analytics dashboard",
      "7 supported currencies",
      "Standard security features",
    ],
    popular: false,
    cta: "Start Free Today",
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Pro",
    price: 29,
    period: "per month",
    description: "Ideal for growing businesses with higher payment volumes",
    features: [
      "Up to 2,500 payments per month",
      "Full API access & webhooks",
      "Priority support (4-hour response)",
      "Advanced analytics & reporting",
      "Custom payment page branding",
      "Multi-user team access",
      "Priority fraud protection",
      "Revenue analytics & insights",
    ],
    popular: true,
    cta: "Start 14-Day Free Trial",
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Tailored pricing",
    description: "Advanced features for large-scale businesses",
    features: [
      "Unlimited payments & transactions",
      "Dedicated API infrastructure",
      "24/7 phone & chat support",
      "Dedicated account manager",
      "Custom integrations & workflows",
      "Advanced security & compliance",
      "White-label solutions",
      "SLA guarantees & uptime",
      "Custom reporting & analytics",
    ],
    popular: false,
    cta: "Contact Sales",
    color: "from-green-500 to-green-600",
  },
];

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-800 mb-6">
                <Star className="w-4 h-4 mr-2" />
                Simple, Transparent Pricing
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                <span className="block text-gray-900 mb-2">Choose your</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Perfect Plan
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Start free and scale as you grow. No hidden fees, no setup
                costs, no surprises. Just{" "}
                <span className="font-semibold text-blue-600">
                  simple pricing
                </span>{" "}
                for
                <span className="font-semibold text-green-600">
                  {" "}
                  powerful payments
                </span>
                .
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-100">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  No setup fees
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-100">
                <Zap className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">
                  Cancel anytime
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-100">
                <Users className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">
                  24/7 support
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {tiers.map((tier, index) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl flex flex-col ${
                    tier.popular
                      ? "border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 scale-105"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-grow">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {tier.name}
                      </h3>
                      <p className="text-gray-600 mb-6">{tier.description}</p>

                      {typeof tier.price === "number" ? (
                        <div>
                          <span className="text-5xl font-bold text-gray-900">
                            ${tier.price}
                          </span>
                          <span className="text-lg text-gray-600 ml-2">
                            /{tier.period}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-5xl font-bold text-gray-900">
                            {tier.price}
                          </span>
                          <div className="text-lg text-gray-600 mt-2">
                            {tier.period}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8 flex-grow">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5 mr-3" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <Link href="/auth/register" className="block">
                        <Button
                          className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                            tier.popular
                              ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                              : "border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 bg-white"
                          }`}
                        >
                          {tier.cta}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our pricing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Are there any setup fees?
                </h3>
                <p className="text-gray-600">
                  No setup fees, no hidden charges. You only pay for your
                  monthly plan and transaction fees are clearly disclosed
                  upfront.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I change plans anytime?
                </h3>
                <p className="text-gray-600">
                  Yes! Upgrade or downgrade your plan at any time. Changes take
                  effect immediately and we'll prorate any differences.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What are the transaction fees?
                </h3>
                <p className="text-gray-600">
                  We charge competitive transaction fees starting at 2.9% +
                  $0.30 for online payments. Enterprise customers get custom
                  rates.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600">
                  Starter plan is free forever. Pro plan includes a 14-day free
                  trial. No credit card required to get started.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to start accepting payments?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of businesses who trust us with their payments.
              Setup takes less than 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Free Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
