"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Code,
  Shield,
  Zap,
  Globe,
  Users,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
  Check,
  Headphones,
  MessageSquare,
  Clock,
} from "lucide-react";

const integrationFormSchema = z.object({
  businessName: z
    .string()
    .min(2, { message: "Business name must be at least 2 characters." }),
  contactName: z
    .string()
    .min(2, { message: "Contact name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters." }),
  businessType: z
    .string()
    .min(1, { message: "Please select a business type." }),
  monthlyVolume: z
    .string()
    .min(1, { message: "Please select expected monthly volume." }),
  integrationNeeds: z
    .string()
    .min(10, { message: "Please describe your integration needs." }),
});

type IntegrationFormValues = z.infer<typeof integrationFormSchema>;

const businessTypes = [
  "E-commerce",
  "SaaS/Software",
  "Marketplace",
  "Digital Services",
  "Subscription Business",
  "Financial Services",
  "Healthcare",
  "Education",
  "Non-profit",
  "Other",
];

const volumeRanges = [
  "Less than $10k/month",
  "$10k - $50k/month",
  "$50k - $100k/month",
  "$100k - $500k/month",
  "$500k - $1M/month",
  "Over $1M/month",
];

const integrationOptions = [
  {
    name: "Guided Integration",
    description:
      "Our team will guide you through the entire integration process with dedicated support",
    icon: Users,
    features: [
      "Dedicated integration specialist",
      "Custom implementation plan",
      "Code reviews and testing",
      "Go-live support and monitoring",
    ],
    color: "from-blue-500 to-blue-600",
    popular: true,
  },
  {
    name: "Express Setup",
    description:
      "Fast-track your integration with pre-built solutions and quick implementation",
    icon: Zap,
    features: [
      "Pre-configured payment flows",
      "Rapid deployment tools",
      "Standard integrations",
      "48-hour setup guarantee",
    ],
    color: "from-green-500 to-green-600",
    popular: false,
  },
  {
    name: "Enterprise Solution",
    description:
      "Custom-built payment infrastructure tailored to your specific business needs",
    icon: Shield,
    features: [
      "Custom API development",
      "White-label solutions",
      "Advanced security features",
      "Dedicated account manager",
    ],
    color: "from-purple-500 to-purple-600",
    popular: false,
  },
];

const contactMethods = [
  {
    icon: MessageSquare,
    title: "Live Chat Support",
    description: "Get instant help from our integration experts",
    detail: "Available 24/7",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Phone,
    title: "Phone Consultation",
    description: "Schedule a call with our integration team",
    detail: "+1 (555) 123-INTG",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us your integration requirements",
    detail: "escrowpay@gmail.com",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Calendar,
    title: "Book a Demo",
    description: "See our payment solutions in action",
    detail: "30-minute sessions",
    color: "from-orange-500 to-orange-600",
  },
];

const IntegrationPage: React.FC = () => {
  const form = useForm<IntegrationFormValues>({
    resolver: zodResolver(integrationFormSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      businessType: "",
      monthlyVolume: "",
      integrationNeeds: "",
    },
  });

  const onSubmit = (values: IntegrationFormValues) => {
    console.log(values);
    alert("Thank you! Our integration team will contact you within 24 hours.");
    form.reset();
  };

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

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-800 mb-6">
                <Headphones className="w-4 h-4 mr-2" />
                Integration Support
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                <span className="block text-gray-900 mb-2">
                  Let us help you
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Integrate Payments
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Our integration experts will guide you every step of the way.
                From
                <span className="font-semibold text-blue-600">
                  {" "}
                  simple setup
                </span>{" "}
                to
                <span className="font-semibold text-green-600">
                  {" "}
                  custom solutions
                </span>
                , we make payment integration{" "}
                <span className="font-semibold text-purple-600">
                  effortless
                </span>
                .
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  24hrs
                </div>
                <div className="text-sm text-gray-600">Response Time</div>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-1">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  3 Days
                </div>
                <div className="text-sm text-gray-600">Avg Integration</div>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  24/7
                </div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Live Chat
              </Button>
              <Button className="bg-white hover:bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                <Calendar className="w-5 h-5 mr-2" />
                Book Demo Call
              </Button>
            </div>
          </div>
        </section>

        {/* Integration Options */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Integration Path
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We offer flexible integration options to match your timeline and
                technical requirements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {integrationOptions.map((option, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border ${
                    option.popular
                      ? "border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 scale-105"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {option.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${option.color} text-white mb-4`}
                    >
                      <option.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {option.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {option.description}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Integration Help
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the best way to connect with our integration specialists
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center cursor-pointer group"
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-r ${method.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <method.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {method.description}
                  </p>
                  {/* <p className="text-blue-600 font-medium text-sm">
                    {method.detail}
                  </p> */}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Request Form */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Request Integration Support
              </h2>
              <p className="text-xl text-gray-600">
                Tell us about your business and integration needs. We'll create
                a custom plan for you.
              </p>
            </div>

            <Card className="bg-white shadow-xl border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 text-2xl text-center">
                  Integration Request Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900">
                              Business Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Your company name"
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900">
                              Contact Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Your full name"
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="your@business.com"
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="+1 (555) 123-4567"
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900">
                              Business Type
                            </FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                              >
                                <option value="">Select business type</option>
                                {businessTypes.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="monthlyVolume"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900">
                              Expected Monthly Volume
                            </FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                              >
                                <option value="">Select volume range</option>
                                {volumeRanges.map((range) => (
                                  <option key={range} value={range}>
                                    {range}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="integrationNeeds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900">
                            Integration Requirements
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={4}
                              placeholder="Describe your integration needs, timeline, and any specific requirements..."
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Submit Integration Request
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Our integration team is standing by to help you accept payments
              quickly and securely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Live Chat Now
              </Button>
              <Button className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                <Phone className="w-5 h-5 mr-2" />
                Call Integration Team
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IntegrationPage;
