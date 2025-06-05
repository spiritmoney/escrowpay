import React from "react";
import Header from "../app/components/Header";
import Hero from "../app/components/Hero";
import Features from "../app/components/Features";
import HowItWorks from "../app/components/HowItWorks";
import Testimonials from "../app/components/Testimonials";
import FAQ from "../app/components/FAQ";
import CTA from "../app/components/CTA";
import Footer from "../app/components/Footer";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 w-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      {/* <Testimonials /> */}
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
