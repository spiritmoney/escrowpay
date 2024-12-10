"use client";

import React from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AfterPaymentPage: React.FC = () => {
  const params = useParams();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle>Payment Successful</CardTitle>
            <CardDescription>
              Your payment has been processed successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The funds are now held in escrow. They will be released to the
              seller once the agreed-upon conditions have been met.
            </p>
            <p>
              If you have any issues with your purchase, you can initiate a
              dispute within 14 days of the transaction.
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href={`/pay/${params.id}/dispute`}>Initiate Dispute</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/payment-link">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AfterPaymentPage;
