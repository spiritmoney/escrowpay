import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-800 mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Privacy Policy
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              <span className="block text-gray-900 mb-2">Your Privacy is</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              We're committed to protecting your personal information and being
              transparent about how we collect, use, and share your data.
            </p>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              Last updated: December 2024
            </div>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center bg-blue-50 rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Secure by Design
                </h3>
                <p className="text-gray-600 text-sm">
                  Your data is encrypted and protected with bank-grade security
                  measures.
                </p>
              </div>
              <div className="text-center bg-green-50 rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Full Transparency
                </h3>
                <p className="text-gray-600 text-sm">
                  We clearly explain what data we collect and how we use it.
                </p>
              </div>
              <div className="text-center bg-purple-50 rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Your Control
                </h3>
                <p className="text-gray-600 text-sm">
                  You have full control over your personal information and
                  privacy settings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-blue-600" />
                  Introduction
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    At EscrowPay, we respect your privacy and are committed to
                    protecting your personal information. This Privacy Policy
                    explains how we collect, use, disclose, and safeguard your
                    information when you use our payment solution platform and
                    services.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By using our services, you agree to the collection and use
                    of information in accordance with this policy. We will not
                    use or share your information with anyone except as
                    described in this Privacy Policy.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Information We Collect
                </h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Personal Information
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Name, email address, and phone number
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Business information and tax identification numbers
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Banking and financial account information
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Identity verification documents
                      </li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Transaction Data
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Payment transactions and history
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Currency preferences and exchange rates
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Payment link usage and analytics
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        API integration and usage data
                      </li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Technical Information
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Device information and browser type
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        IP address and location data
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Usage patterns and session information
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Communication records and support interactions
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  How We Use Your Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Service Delivery
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Process your payments and transactions</li>
                      <li>• Generate and manage payment links</li>
                      <li>• Provide API access and integration support</li>
                      <li>• Send transaction confirmations and receipts</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Security & Compliance
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Verify your identity and prevent fraud</li>
                      <li>• Comply with financial regulations</li>
                      <li>• Monitor for suspicious activities</li>
                      <li>• Maintain transaction records</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Customer Support
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Provide technical assistance</li>
                      <li>• Resolve disputes and issues</li>
                      <li>• Offer integration guidance</li>
                      <li>• Communicate service updates</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Service Improvement
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Analyze usage patterns and trends</li>
                      <li>• Improve our platform features</li>
                      <li>• Develop new payment solutions</li>
                      <li>• Enhance user experience</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Data Security & Protection
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Encryption & Security
                      </h3>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-center">
                          <Shield className="w-4 h-4 text-green-500 mr-2" />
                          256-bit SSL encryption
                        </li>
                        <li className="flex items-center">
                          <Shield className="w-4 h-4 text-green-500 mr-2" />
                          PCI DSS Level 1 compliance
                        </li>
                        <li className="flex items-center">
                          <Shield className="w-4 h-4 text-green-500 mr-2" />
                          Multi-factor authentication
                        </li>
                        <li className="flex items-center">
                          <Shield className="w-4 h-4 text-green-500 mr-2" />
                          Regular security audits
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Data Protection
                      </h3>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-center">
                          <Lock className="w-4 h-4 text-blue-500 mr-2" />
                          Secure data centers
                        </li>
                        <li className="flex items-center">
                          <Lock className="w-4 h-4 text-blue-500 mr-2" />
                          Access controls and monitoring
                        </li>
                        <li className="flex items-center">
                          <Lock className="w-4 h-4 text-blue-500 mr-2" />
                          Data backup and recovery
                        </li>
                        <li className="flex items-center">
                          <Lock className="w-4 h-4 text-blue-500 mr-2" />
                          Employee training and protocols
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Your Privacy Rights
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start bg-gray-50 rounded-lg p-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Access Your Data
                      </h3>
                      <p className="text-gray-700 text-sm">
                        Request a copy of all personal information we hold about
                        you.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start bg-gray-50 rounded-lg p-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Correct Your Data
                      </h3>
                      <p className="text-gray-700 text-sm">
                        Update or correct any inaccurate personal information.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start bg-gray-50 rounded-lg p-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Delete Your Data
                      </h3>
                      <p className="text-gray-700 text-sm">
                        Request deletion of your personal information (subject
                        to legal requirements).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start bg-gray-50 rounded-lg p-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Data Portability
                      </h3>
                      <p className="text-gray-700 text-sm">
                        Export your data in a commonly used, machine-readable
                        format.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start bg-gray-50 rounded-lg p-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Restrict Processing
                      </h3>
                      <p className="text-gray-700 text-sm">
                        Limit how we use your personal information in specific
                        circumstances.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Data Retention
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-6 h-6 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        How Long We Keep Your Data
                      </h3>
                      <p className="text-gray-700 mb-4">
                        We retain your personal information only as long as
                        necessary to provide our services and comply with legal
                        obligations:
                      </p>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>
                          • Account information: While your account is active +
                          7 years
                        </li>
                        <li>
                          • Transaction records: 7 years for tax and regulatory
                          compliance
                        </li>
                        <li>
                          • Communication records: 3 years for support and legal
                          purposes
                        </li>
                        <li>
                          • Marketing data: Until you opt out or withdraw
                          consent
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Us About Privacy
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
                  <div className="text-center mb-6">
                    <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Questions About Your Privacy?
                    </h3>
                    <p className="text-gray-700">
                      We're here to help you understand how we protect your
                      information.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Email Us
                      </h4>
                      <p className="text-blue-600 font-medium">
                        escrowpay@gmail.com
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Response Time
                      </h4>
                      <p className="text-gray-700">Within 48 hours</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
