"use client";

import React from "react";
import { motion } from "framer-motion";
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

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

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
    // Here you would typically send the form data to your API
    alert("Thank you for your message. We'll get back to you soon!");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col text-gray-100">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <section className="mb-12">
            <h1 className="text-4xl font-bold mb-6 text-white">About Escrow</h1>
            <p className="text-lg mb-4 text-gray-300">
              Escrow is a cutting-edge blockchain-based payment platform,
              designed to revolutionize the way businesses and individuals
              handle transactions in the digital age.
            </p>
            <p className="text-lg mb-4 text-gray-300">
              Founded in 2024, our mission is to provide secure, transparent,
              and efficient payment solutions that leverage the power of
              blockchain technology. We believe in creating a financial
              ecosystem that is accessible to everyone, regardless of their
              location or background.
            </p>
            <p className="text-lg text-gray-300">
              Our team of experts combines years of experience in fintech,
              blockchain development, and cybersecurity to deliver a platform
              that meets the highest standards of reliability and innovation.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                Security: We prioritize the safety of our users' funds and data
                above all else.
              </li>
              <li>
                Transparency: We believe in open communication and clear,
                understandable processes.
              </li>
              <li>
                Innovation: We continuously strive to improve and adapt to the
                evolving needs of our users.
              </li>
              <li>
                Accessibility: We aim to make blockchain payments easy and
                accessible for everyone.
              </li>
              <li>
                Customer-Centric: Our users are at the heart of everything we
                do.
              </li>
            </ul>
          </section>

          <section id="#contact-us">
            <Card className="bg-white text-black">
              <CardHeader>
                <CardTitle className="text-black">Contact Us</CardTitle>
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
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
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
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={4} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Send Message</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
