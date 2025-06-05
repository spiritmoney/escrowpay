import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FileText,
  Scale,
  Shield,
  CreditCard,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle,
  Mail,
  Phone,
} from "lucide-react";

const TermsPage: React.FC = () => {
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
              <Scale className="w-4 h-4 mr-2" />
              Terms of Service
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              <span className="block text-gray-900 mb-2">Terms of</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Clear and fair terms that govern the use of our payment platform
              and services.
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
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Your Protection
                </h3>
                <p className="text-gray-600 text-sm">
                  Our terms are designed to protect both you and other users of
                  our platform.
                </p>
              </div>
              <div className="text-center bg-green-50 rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Fair Pricing
                </h3>
                <p className="text-gray-600 text-sm">
                  Clear fee structure with no hidden costs or unexpected
                  charges.
                </p>
              </div>
              <div className="text-center bg-purple-50 rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  User Rights
                </h3>
                <p className="text-gray-600 text-sm">
                  Your rights and responsibilities when using our payment
                  services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-blue-600" />
                  Agreement to Terms
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    By accessing or using EscrowPay's payment services, you
                    agree to be bound by these Terms of Service ("Terms") and
                    all applicable laws and regulations. These Terms constitute
                    a legally binding agreement between you and EscrowPay.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    If you do not agree with any part of these Terms, you may
                    not access or use our services. We reserve the right to
                    update these Terms at any time, and your continued use of
                    our services constitutes acceptance of any changes.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Eligibility & Account Requirements
                </h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-6 bg-blue-50 rounded-r-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Who Can Use Our Services
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Individuals who are at least 18 years old
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Businesses and organizations with legal capacity
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Users in jurisdictions where our services are available
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Users who can provide valid identification documents
                      </li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6 bg-green-50 rounded-r-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Account Responsibilities
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Provide accurate and complete information
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Maintain the security of your account credentials
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Update your information when changes occur
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Notify us immediately of unauthorized access
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Our Services Include
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Payment link generation and management</li>
                      <li>• Multi-currency payment processing</li>
                      <li>• API integration for businesses</li>
                      <li>• Real-time transaction monitoring</li>
                      <li>• Automated invoicing and receipts</li>
                      <li>• Analytics and reporting tools</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Supported Currencies
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• USD (United States Dollar)</li>
                      <li>• NGN (Nigerian Naira)</li>
                      <li>• GBP (British Pound)</li>
                      <li>• EUR (Euro)</li>
                      <li>• USDT (Tether)</li>
                      <li>• USDC (USD Coin)</li>
                      <li>• ESPEES (Custom Currency)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Fees & Charges
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
                  <div className="text-center mb-6">
                    <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Transparent Pricing
                    </h3>
                    <p className="text-gray-700">
                      We believe in transparent pricing with no hidden fees.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Transaction Fees
                      </h4>
                      <p className="text-gray-700 text-sm mb-2">
                        Competitive rates based on transaction volume and
                        payment method:
                      </p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Standard transactions: 2.9% + $0.30</li>
                        <li>• High-volume discounts available</li>
                        <li>• No setup or monthly fees</li>
                        <li>• Currency conversion at market rates</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Additional Services
                      </h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• API access: Free for standard usage</li>
                        <li>• Premium support: Available with Pro plans</li>
                        <li>• Custom integrations: Contact for pricing</li>
                        <li>• White-label solutions: Enterprise pricing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Prohibited Activities
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Strictly Forbidden
                      </h3>
                      <p className="text-gray-700 mb-4">
                        To maintain a safe and legal platform, the following
                        activities are prohibited:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>• Money laundering or terrorist financing</li>
                          <li>• Fraudulent or deceptive practices</li>
                          <li>• Illegal gambling or gaming activities</li>
                          <li>• Sale of prohibited goods or services</li>
                          <li>• Tax evasion or avoidance schemes</li>
                        </ul>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>• Violation of intellectual property rights</li>
                          <li>• Unauthorized access to systems</li>
                          <li>• Manipulation of payment systems</li>
                          <li>• Creation of fake accounts</li>
                          <li>• Any illegal activities under applicable law</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Dispute Resolution
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Resolution Process
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Initial Contact
                          </h4>
                          <p className="text-gray-700 text-sm">
                            Contact our support team within 30 days of the issue
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Investigation
                          </h4>
                          <p className="text-gray-700 text-sm">
                            We'll review the case and gather necessary
                            information
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Resolution
                          </h4>
                          <p className="text-gray-700 text-sm">
                            We'll provide a fair resolution within 10 business
                            days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Limitations of Liability
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Service Limitations
                      </h3>
                      <p className="text-gray-700 mb-4">
                        While we strive to provide reliable services, please
                        understand these limitations:
                      </p>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>
                          • Services are provided "as is" without warranties
                        </li>
                        <li>
                          • We are not liable for indirect or consequential
                          damages
                        </li>
                        <li>
                          • Our liability is limited to the amount of fees paid
                          to us
                        </li>
                        <li>
                          • We may suspend or terminate services for maintenance
                        </li>
                        <li>
                          • Third-party service interruptions may affect our
                          platform
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Data Protection & Privacy
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Your Data Rights
                      </h3>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          Access your personal data
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          Correct inaccurate information
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          Request data deletion
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          Data portability options
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Our Commitments
                      </h3>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-center">
                          <Shield className="w-4 h-4 text-blue-500 mr-2" />
                          GDPR and CCPA compliance
                        </li>
                        <li className="flex items-center">
                          <Shield className="w-4 h-4 text-blue-500 mr-2" />
                          Bank-grade encryption
                        </li>
                        <li className="flex items-center">
                          <Shield className="w-4 h-4 text-blue-500 mr-2" />
                          Regular security audits
                        </li>
                        <li className="flex items-center">
                          <Shield className="w-4 h-4 text-blue-500 mr-2" />
                          Minimal data collection
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Governing Law & Jurisdiction
                </h2>
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-start">
                    <Scale className="w-6 h-6 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Legal Framework
                      </h3>
                      <p className="text-gray-700 mb-4">
                        These Terms are governed by and construed in accordance
                        with applicable laws:
                      </p>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Primary jurisdiction: Lagos State, Nigeria</li>
                        <li>
                          • International compliance: GDPR, PCI DSS, and local
                          regulations
                        </li>
                        <li>
                          • Dispute resolution: Lagos State High Court
                          jurisdiction
                        </li>
                        <li>
                          • Arbitration: Available for commercial disputes
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact & Support
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
                  <div className="text-center mb-6">
                    <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Questions About These Terms?
                    </h3>
                    <p className="text-gray-700">
                      Our legal and support teams are here to help clarify any
                      questions.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Legal Inquiries
                      </h4>
                      <p className="text-blue-600 font-medium items-center justify-center flex">
                        escrowpay@gmail.com
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        General Support
                      </h4>
                      <p className="text-blue-600 font-medium items-center justify-center flex">
                        escrowpay@gmail.com
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Phone Support
                      </h4>
                      <p className="text-gray-700">+234-XXX-XXX-XXXX</p>
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

export default TermsPage;
