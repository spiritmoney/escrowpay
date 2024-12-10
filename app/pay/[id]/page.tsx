"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

// Mock data for the payment link
const mockPaymentLink = {
  id: "abc123",
  name: "Premium Product",
  amount: 99.99,
  currency: "USD",
  description: "High-quality premium product with exclusive features.",
  type: "product",
};

export const Icons = {
  spinner: Loader2,
};

const Page: React.FC = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // In a real application, you would fetch the payment link data using the ID from params
  const paymentLink = mockPaymentLink;

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    // Redirect to the success page
    window.location.href = `/pay/${params.id}/success`;
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4">
        <Card>
          <CardHeader>
            <CardTitle>{paymentLink.name}</CardTitle>
            <CardDescription>{paymentLink.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePayment}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    value={`${paymentLink.amount} ${paymentLink.currency}`}
                    disabled
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="card">Card Number</Label>
                  <Input id="card" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <div className="px-6 py-4">
            <Button
              className="w-full"
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Pay {paymentLink.amount} {paymentLink.currency}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
