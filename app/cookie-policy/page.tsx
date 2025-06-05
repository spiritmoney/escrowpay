import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Cookie,
  Settings,
  Shield,
  BarChart3,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react";

const CookiePolicyPage: React.FC = () => {
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
              <Cookie className="w-4 h-4 mr-2" />
              Cookie Policy
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              <span className="block text-gray-900 mb-2">How We Use</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Cookies
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Learn about the cookies we use to improve your experience and
              provide secure payment services.
            </p>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              Last updated: December 2024
            </div>
          </div>
        </section>

        {/* Cookie Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center bg-blue-50 rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Essential Only
                </h3>
                <p className="text-gray-600 text-sm">
                  We only use cookies that are necessary for our payment
                  services to function.
                </p>
              </div>
              <div className="text-center bg-green-50 rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Full Control
                </h3>
                <p className="text-gray-600 text-sm">
                  You can manage your cookie preferences through your browser
                  settings.
                </p>
              </div>
              <div className="text-center bg-purple-50 rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Secure Experience
                </h3>
                <p className="text-gray-600 text-sm">
                  Cookies help us maintain security and provide personalized
                  features.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cookie Policy Content */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Cookie className="w-6 h-6 mr-3 text-blue-600" />
                  What Are Cookies?
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Cookies are small text files that are stored on your
                    computer or mobile device when you visit our website. They
                    help us provide you with a better experience, remember your
                    preferences, and understand how you use our payment
                    platform.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Most websites use cookies, and they are an important part of
                    making modern web services work efficiently and securely.
                    Our cookies are designed to improve your experience while
                    maintaining the highest security standards for payment
                    processing.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Types of Cookies We Use
                </h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-6 bg-blue-50 rounded-r-xl p-6">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Essential Cookies
                        </h3>
                        <p className="text-gray-700 mb-3">
                          These cookies are necessary for our payment platform
                          to function properly and securely.
                        </p>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Session management and user authentication
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Security and fraud protection
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Payment processing and transaction security
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Load balancing and performance optimization
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6 bg-green-50 rounded-r-xl p-6">
                    <div className="flex items-start">
                      <Settings className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Preference Cookies
                        </h3>
                        <p className="text-gray-700 mb-3">
                          These cookies remember your preferences and settings
                          to provide a personalized experience.
                        </p>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Language and currency preferences
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Dashboard layout and customization
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Notification settings and preferences
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Theme and accessibility settings
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6 bg-purple-50 rounded-r-xl p-6">
                    <div className="flex items-start">
                      <BarChart3 className="w-6 h-6 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Analytics Cookies
                        </h3>
                        <p className="text-gray-700 mb-3">
                          These cookies help us understand how you use our
                          platform to improve our services.
                        </p>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Usage patterns and feature adoption
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Performance monitoring and optimization
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Error tracking and bug identification
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Service improvement insights
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  How We Use Cookies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Security & Authentication
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Maintain secure user sessions</li>
                      <li>• Prevent unauthorized access</li>
                      <li>• Detect and prevent fraud</li>
                      <li>• Ensure payment security</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      User Experience
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Remember your preferences</li>
                      <li>• Provide personalized content</li>
                      <li>• Maintain your shopping cart</li>
                      <li>• Enable seamless navigation</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Service Optimization
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Monitor system performance</li>
                      <li>• Identify technical issues</li>
                      <li>• Optimize loading times</li>
                      <li>• Improve service reliability</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Compliance & Legal
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Meet regulatory requirements</li>
                      <li>• Maintain audit trails</li>
                      <li>• Support dispute resolution</li>
                      <li>• Ensure data protection</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Managing Your Cookie Preferences
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
                  <div className="text-center mb-6">
                    <Settings className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      You're in Control
                    </h3>
                    <p className="text-gray-700">
                      You have several options to manage how cookies are used on
                      your device.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Browser Settings
                      </h4>
                      <p className="text-gray-700 text-sm mb-2">
                        Most browsers allow you to control cookies through their
                        settings. You can:
                      </p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Block all cookies</li>
                        <li>• Allow only essential cookies</li>
                        <li>• Delete existing cookies</li>
                        <li>
                          • Set cookies to expire when you close your browser
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Third-Party Cookies
                      </h4>
                      <p className="text-gray-700 text-sm">
                        We may use trusted third-party services (like analytics
                        providers) that also set cookies. These are governed by
                        their respective privacy policies.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Impact of Disabling Cookies
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-6 h-6 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Important Notice
                      </h3>
                      <p className="text-gray-700 mb-4">
                        While you can disable cookies, doing so may affect your
                        experience with our payment platform:
                      </p>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>
                          • You may need to re-enter information frequently
                        </li>
                        <li>• Some features may not work properly</li>
                        <li>
                          • Payment processing may be slower or less secure
                        </li>
                        <li>• Your preferences won't be remembered</li>
                        <li>• API integration may be affected</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Cookie Retention
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Session Cookies
                    </h3>
                    <p className="text-gray-700 text-sm mb-3">
                      These cookies are temporary and are deleted when you close
                      your browser.
                    </p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Login sessions</li>
                      <li>• Shopping cart contents</li>
                      <li>• Form data</li>
                      <li>• Security tokens</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Persistent Cookies
                    </h3>
                    <p className="text-gray-700 text-sm mb-3">
                      These cookies remain on your device for a specified
                      period.
                    </p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• User preferences: 1 year</li>
                      <li>• Analytics data: 2 years</li>
                      <li>• Security settings: 30 days</li>
                      <li>• Performance data: 6 months</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Updates to This Policy
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <p className="text-gray-700 mb-4">
                    We may update this Cookie Policy from time to time to
                    reflect changes in our practices or applicable laws. When we
                    make changes, we will:
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Update the "Last updated" date at the top of this policy
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Notify you through our platform or email for significant
                      changes
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Provide clear information about what has changed
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Us About Cookies
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
                  <div className="text-center mb-6">
                    <Cookie className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Questions About Cookies?
                    </h3>
                    <p className="text-gray-700">
                      We're here to help you understand how cookies work on our
                      platform.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Email Support
                      </h4>
                      <p className="text-blue-600 font-medium">
                        escrowpay@gmail.com
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Response Time
                      </h4>
                      <p className="text-gray-700">Within 24 hours</p>
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

export default CookiePolicyPage;
