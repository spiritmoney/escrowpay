import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CTA: React.FC = () => {
  return (
    <section className="py-24 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to get started with EspeePay?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of businesses and individuals who trust EspeePay for
            their blockchain transactions.
          </p>
        </div>
        <div className="mt-12">
          <form className="sm:flex justify-center">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white w-full sm:max-w-xs rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 border-transparent"
            />
            <div className="sm:mt-0 sm:ml-3">
              <Button className="w-full bg-black text-white hover:bg-gray-900 transition-colors duration-200">
                Get Started
              </Button>
            </div>
          </form>
          {/* <p className="mt-6 text-sm text-blue-100">
            We care about your data. Read our{" "}
            <a href="#" className="font-medium underline">
              Privacy Policy
            </a>
            .
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default CTA;
