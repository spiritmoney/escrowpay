import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is blockchain escrow?",
    answer:
      "Blockchain escrow is a secure method of holding and transferring funds using blockchain technology. It ensures that funds are only released when predefined conditions are met, providing security and trust for both parties in a transaction.",
  },
  {
    question: "How does EspeesPay ensure transaction security?",
    answer:
      "EspeesPay uses advanced encryption and blockchain technology to secure all transactions. Our escrow system holds funds securely until all parties agree that the terms of the transaction have been met.",
  },
  {
    question: "What cryptocurrencies does EspeesPay support?",
    answer:
      "Currently, EspeesPay supports Espees, our native cryptocurrency. We plan to add support for other major cryptocurrencies in the near future.",
  },
  {
    question: "How long does it take to set up an account?",
    answer:
      "Setting up an EspeesPay account typically takes just a few minutes. However, depending on your location and the level of verification required, the full verification process may take up to 24 hours.",
  },
  {
    question: "Are there any transaction fees?",
    answer:
      "EspeesPay charges a small fee for each transaction to cover the costs of maintaining the platform and ensuring security. Please refer to our pricing page for detailed information on our fee structure.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Can't find the answer you're looking for? Reach out to our customer
            support team.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={`faq-${index}`} 
              value={`item-${index}`}
            >
              <AccordionTrigger className="text-white hover:text-blue-500 transition-colors duration-200">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
