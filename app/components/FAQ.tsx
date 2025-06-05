import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What currencies can I accept payments in?",
    answer:
      "You can accept payments in seven different currencies: USD (US Dollar), NGN (Nigerian Naira), GBP (British Pound), EUR (Euro), USDT (Tether), USDC (USD Coin), and ESPEES. Customers can pay in their preferred currency while you receive funds in your chosen currency.",
  },
  {
    question: "How do payment links work?",
    answer:
      "Payment links are unique URLs that you can share with your customers to collect payments. Simply create a link in your dashboard, set the amount and currency, then share it via email, SMS, social media, or any other channel. Customers click the link and pay instantly using their preferred payment method.",
  },
  {
    question: "Can I integrate this into my existing website or app?",
    answer:
      "Yes! We provide comprehensive APIs and SDKs that allow you to seamlessly integrate our payment system into your existing website, mobile app, or business application. Our RESTful APIs support webhooks for real-time payment notifications and come with detailed documentation.",
  },
  {
    question: "How quickly do I receive funds after a customer pays?",
    answer:
      "Funds are available in your account instantly upon successful payment. You'll receive real-time notifications via email, SMS, or webhook when a payment is completed. There are no holding periods - you have immediate access to your money.",
  },
  {
    question: "What are the transaction fees?",
    answer:
      "We charge competitive transaction fees that vary based on the payment method and currency used. Fees are transparently displayed before each transaction. For detailed pricing information including volume discounts for businesses, please visit our pricing page or contact our sales team.",
  },
  {
    question: "Is it secure to accept payments through your platform?",
    answer:
      "Absolutely. We use bank-grade security with 256-bit encryption, fraud detection systems, and comply with international payment security standards. All transactions are processed through secure channels and we never store sensitive payment information on our servers.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden w-screen" id="faq">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full filter blur-3xl opacity-20"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-800 mb-6">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Everything you need to know about accepting payments globally
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={`faq-${index}`}
                value={`item-${index}`}
                className="border border-gray-100 rounded-xl px-6 py-2 bg-white/50 hover:bg-white/80 transition-colors duration-200"
              >
                <AccordionTrigger className="text-left text-gray-900 hover:text-blue-600 transition-colors duration-200 font-semibold text-lg py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-6 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions about payments?
            </h3>
            <p className="text-gray-600 mb-6">
              Our payment specialists are here to help you get started
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Contact Sales Team
              </button>
              <button className="border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                View API Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
