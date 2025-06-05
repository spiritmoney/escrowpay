"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Shield,
  Zap,
  Globe,
  Users,
  Award,
  Clock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const values = [
  {
    name: "Simplicity First",
    description:
      "We believe payments should be as easy as sending an email. No technical complexity, no confusing interfaces.",
    icon: Zap,
    color: "from-green-500 to-green-600",
  },
  {
    name: "Security Always",
    description:
      "Bank-grade security isn't optional. Every transaction is protected with military-grade encryption and monitoring.",
    icon: Shield,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Global Accessibility",
    description:
      "Financial services should be accessible to everyone, everywhere. We support 7 currencies and growing.",
    icon: Globe,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Customer Success",
    description:
      "Your success is our mission. We provide 24/7 support and dedicated account management for growing businesses.",
    icon: Users,
    color: "from-orange-500 to-orange-600",
  },
];

const stats = [
  { label: "Businesses Trust Us", value: "10,000+", icon: Users },
  { label: "Transactions Processed", value: "$50M+", icon: Award },
  { label: "Countries Supported", value: "50+", icon: Globe },
  { label: "Uptime Guarantee", value: "99.9%", icon: Clock },
];

const AboutPage: React.FC = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    console.log(values);
    alert("Thank you for your message. We'll get back to you soon!");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-900">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-800 mb-6">
                About Our Mission
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                <span className="block text-gray-900 mb-2">
                  Simplifying payments for
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Everyone, Everywhere
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We're building the future of payments - where{" "}
                <span className="font-semibold text-blue-600">
                  complexity disappears
                </span>
                ,
                <span className="font-semibold text-green-600">
                  {" "}
                  security is guaranteed
                </span>
                , and
                <span className="font-semibold text-purple-600">
                  {" "}
                  global reach
                </span>{" "}
                is just a click away.
              </p>
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-4">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Founded in 2024, we started with a simple belief: payment
                processing shouldn't be complicated.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  The Problem We Saw
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Businesses were struggling with complex payment setups, hidden
                  fees, security concerns, and limited currency support. Small
                  businesses especially needed a solution that was both powerful
                  and simple to use.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Solution
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We built a payment platform that combines enterprise-grade
                  security with consumer-grade simplicity. Setup takes 2
                  minutes, not 2 weeks. Security is built-in, not bolted-on.
                  Global reach is standard, not premium.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We envision a world where any business, anywhere, can accept
                  payments securely and effortlessly. Where financial barriers
                  don't limit growth, and where technology serves humanity, not
                  the other way around.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                These principles guide every decision we make and every feature
                we build
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${value.color} text-white mb-6 group-hover:scale-105 transition-transform duration-300`}
                  >
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white" id="contact-us">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Have questions? We'd love to hear from you. Send us a
                    message and we'll respond as soon as possible.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Email
                      </h4>
                      <p className="text-gray-600">escrowpay@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Call Us</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Visit Us</p>
                      <p className="text-gray-600">
                        123 Payment Street
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              {/* <div>
                <Card className="bg-white shadow-xl border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900 text-2xl">
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900">
                                Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900">
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900">
                                Message
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  rows={4}
                                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Send Message
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div> */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
