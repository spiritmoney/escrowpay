"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/app/hooks/useAuth";
import { toast } from "react-toastify";
import { BackToHomeButton } from "../../../components/BackToHomeButton";

const otpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  otp: z
    .string()
    .length(6, { message: "OTP must be 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
});

type OTPValues = z.infer<typeof otpSchema>;

const OTPVerificationPage: React.FC = () => {
  const { verifyOTP } = useAuth();
  const form = useForm<OTPValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const onSubmit = async (values: OTPValues) => {
    try {
      await verifyOTP.mutateAsync(values);
      toast.success("Email verified successfully");
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <BackToHomeButton />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Verify your email
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto w-full sm:max-w-md">
        <div className="bg-white py-6 px-4 sm:py-8 sm:px-10 shadow rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="block w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="block w-full"
                        placeholder="Enter 6-digit OTP"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button type="submit" className="w-full" disabled={verifyOTP.isPending}>
                  {verifyOTP.isPending ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p>
              Didn't receive the OTP?{" "}
              <button 
                className="text-blue-600 hover:text-blue-500"
                onClick={() => {
                  // You might want to add a resendOTP mutation to useAuth
                  toast.info("OTP resend functionality to be implemented");
                }}
                disabled={verifyOTP.isPending}
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;