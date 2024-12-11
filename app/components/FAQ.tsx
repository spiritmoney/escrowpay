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
    question: "What is Escrow PayLink?",
    answer:
      "Escrow PayLink is a blockchain-powered payment solution that combines P2P trading with customizable payment links. It's designed to facilitate secure transactions for businesses and individuals, whether you're selling goods, services, or digital products.",
  },
  {
    question: "How does Escrow PayLink ensure transaction security?",
    answer:
      "Escrow PayLink uses smart contracts to hold funds securely until all transaction conditions are met. This escrow mechanism ensures that both parties are protected throughout the transaction, reducing fraud and building trust between users.",
  },
  {
    question: "What payment methods does Escrow PayLink support?",
    answer:
      "Escrow PayLink supports both cryptocurrency and fiat currency transactions, providing flexibility for users worldwide. This multi-currency support allows for seamless international transactions.",
  },
  {
    question: "How can I use Escrow PayLink for my business?",
    answer:
      "Escrow PayLink is ideal for businesses, freelancers, and digital product sellers. You can create customized payment links, manage multiple transactions, and ensure secure payments for your goods or services through our escrow smart contracts.",
  },
  {
    question: "Are there any transaction fees?",
    answer:
      "Escrow PayLink charges a competitive fee for each transaction to cover smart contract operations and platform maintenance. The exact fee structure varies based on the transaction type and volume. Please visit our pricing page for detailed information.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section className="py-24 bg-gray-900" id="faq">
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
            <AccordionItem key={`faq-${index}`} value={`item-${index}`}>
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
