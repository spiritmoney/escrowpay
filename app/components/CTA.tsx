import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  CheckCircle,
  Star,
} from "lucide-react";

const CTA: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 filter blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-15 filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full opacity-20 filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold text-white border border-white/20 mb-8 shadow-lg">
            <Star className="w-4 h-4 mr-2 text-yellow-300" />
            Trusted by businesses worldwide
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Start accepting payments
            <span className="block bg-gradient-to-r from-yellow-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              in 2 minutes
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-4">
            The world's simplest payment platform. No coding, no complexity, no
            compromises on security.
          </p>

          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Accept payments in USD, NGN, GBP, EUR, USDT, USDC, and ESPEES with
            enterprise-grade security.
          </p>
        </div>

        {/* Main CTA Area */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl">
            {/* Primary CTA */}
            <div className="text-center mb-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Ready to transform your payments?
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
                <Input
                  type="email"
                  placeholder="Enter your business email"
                  className="flex-1 bg-white border-0 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 text-lg font-medium shadow-lg focus:ring-4 focus:ring-white/30"
                />
                <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                  <span>Enterprise security included</span>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  2-Min Setup
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Create payment links instantly. No technical knowledge
                  required.
                </p>
              </div>

              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-2xl mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Bank-Grade Security
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Military-grade encryption. PCI DSS Level 1 compliant.
                </p>
              </div>

              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Global Reach
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Accept 7 currencies. Serve customers worldwide instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof & Trust Indicators */}
        <div className="text-center">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <span className="text-white text-sm font-semibold">
                PCI DSS Level 1
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <span className="text-white text-sm font-semibold">
                256-bit SSL
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <span className="text-white text-sm font-semibold">
                SOC 2 Type II
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <span className="text-white text-sm font-semibold">
                GDPR Compliant
              </span>
            </div>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                $50M+
              </div>
              <div className="text-white/60 text-sm font-medium">Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                10K+
              </div>
              <div className="text-white/60 text-sm font-medium">
                Businesses
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                99.9%
              </div>
              <div className="text-white/60 text-sm font-medium">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                50+
              </div>
              <div className="text-white/60 text-sm font-medium">Countries</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default CTA;
