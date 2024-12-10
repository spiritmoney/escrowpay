import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">What Are Cookies</h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit our website. They help us provide you with a better experience and understand how you use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Types of Cookies We Use</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Essential cookies for site functionality</li>
                <li>Analytics cookies to understand usage</li>
                <li>Preference cookies to remember your settings</li>
                <li>Marketing cookies for targeted advertising</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">How We Use Cookies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To maintain your session and security</li>
                <li>To remember your preferences</li>
                <li>To analyze site traffic and performance</li>
                <li>To improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Managing Cookies</h2>
              <p>
                You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your user experience and some features may not function properly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Third-Party Cookies</h2>
              <p>
                We may use third-party services that also set cookies on our website. These cookies are governed by the respective privacy policies of these third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
              <p>
                If you have any questions about our Cookie Policy, please contact us at escrowforespees@gmail.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicyPage; 