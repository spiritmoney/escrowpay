import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block">Secure Blockchain Payments</span>
          <span className="block text-blue-500">Made Easy</span>
        </div>
        <div className="mt-6 max-w-2xl mx-auto text-xl text-gray-400">
          EspeesPay enables businesses and individuals to securely buy and sell
          Espees using a blockchain escrow system.
        </div>
        <div className="mt-10 flex justify-center space-x-4">
          <Link href="/auth/register">
            <Button
              size="lg"
              className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
            >
              Get Started
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
