import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Agreement to Terms</h2>
              <p>
                By accessing or using Paylinc's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Use License</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be at least 18 years old to use our services</li>
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You agree not to use the service for illegal purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Service Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Transaction fees and charges</li>
                <li>Payment processing terms</li>
                <li>Escrow service conditions</li>
                <li>Dispute resolution process</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Limitations</h2>
              <p>
                We reserve the right to modify, suspend, or terminate the service at any time without notice. We are not liable for any damages arising from the use of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Contact</h2>
              <p>
                For any questions regarding these Terms of Service, please contact us at escrow@gmail.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage; 