import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
        >
          <span
            className="block text-blue-500"
          >
            Secure Trading Made Simple
          </span>
          <span
            className="block"
          >
            with Paylinc
          </span>
        </div>
        <div
          className="mt-6 max-w-3xl mx-auto text-xl text-gray-400 space-y-4"
        >
          <p>
            A payment solution that combines P2P trading with
            customizable payment links for seamless transactions.
          </p>
          <p className="text-lg">
            Support for multiple currencies with smart contract escrow protection,
            ensuring secure and trusted trades worldwide.
          </p>
        </div>
        <div
          className="mt-10 flex justify-center space-x-4"
        >
          <Link href="/auth/register">
            <Button
              size="lg"
              className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
            >
              Try Demo
            </Button>
          </Link>
          <Link href="/api-docs">
            <Button
              size="lg"
              variant="outline"
              className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
            >
              View API Docs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
