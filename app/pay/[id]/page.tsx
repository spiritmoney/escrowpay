"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { toast } from "sonner";
import {
  useGetPublicPaymentLink,
  useInitializePayment,
  useConfirmPayment,
} from "@/app/dashboard/payment-link/api";

interface PaymentPageProps {
  params: Promise<{
    id: string;
  }>;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ params }) => {
  const [linkId, setLinkId] = useState<string>("");

  // Resolve params Promise
  React.useEffect(() => {
    params.then((resolvedParams) => {
      setLinkId(resolvedParams.id);
    });
  }, [params]);

  const [customerData, setCustomerData] = useState({
    customerEmail: "",
    customerName: "",
    paymentMethodToken: "",
  });
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [step, setStep] = useState<"details" | "payment" | "confirm">(
    "details"
  );

  const { data: paymentLink, isLoading } = useGetPublicPaymentLink(linkId);
  const initializePayment = useInitializePayment();
  const confirmPayment = useConfirmPayment();

  // Wait for linkId to be resolved
  if (!linkId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const handleInitializePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await initializePayment.mutateAsync({
        linkId,
        data: customerData,
      });

      setTransactionId(response.transactionId);
      setStep("payment");
      toast.success("Payment initialized successfully");
    } catch (error) {
      toast.error("Failed to initialize payment");
    }
  };

  const handleConfirmPayment = async (paymentData: {
    paymentIntentId?: string;
    txHash?: string;
  }) => {
    if (!transactionId) return;

    try {
      await confirmPayment.mutateAsync({
        linkId,
        data: {
          transactionId,
          reference: `payment_${Date.now()}`,
          ...paymentData,
        },
      });

      setStep("confirm");
      toast.success("Payment confirmed successfully");
    } catch (error) {
      toast.error("Failed to confirm payment");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!paymentLink) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Link Not Found
          </h2>
          <p className="text-gray-600">
            The payment link you're looking for doesn't exist or has been
            disabled.
          </p>
        </div>
      </div>
    );
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Payment Link Details */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {paymentLink.name}
          </h1>
          <p className="text-3xl font-bold text-blue-600">
            {formatAmount(paymentLink.amount, paymentLink.currency)}
          </p>
          {paymentLink.createdBy && (
            <p className="text-sm text-gray-600 mt-2">
              Payment to {paymentLink.createdBy.name} (
              {paymentLink.createdBy.email})
            </p>
          )}
        </div>

        {/* Step indicator */}
        <div className="flex justify-between items-center mb-8">
          <div
            className={`flex items-center ${
              step === "details" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === "details" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              1
            </div>
            <span className="ml-2 text-sm">Details</span>
          </div>

          <div
            className={`flex items-center ${
              step === "payment" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === "payment" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              2
            </div>
            <span className="ml-2 text-sm">Payment</span>
          </div>

          <div
            className={`flex items-center ${
              step === "confirm" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === "confirm" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              3
            </div>
            <span className="ml-2 text-sm">Confirm</span>
          </div>
        </div>

        {/* Step Content */}
        {step === "details" && (
          <form onSubmit={handleInitializePayment} className="space-y-4">
            <div>
              <Label htmlFor="customerName">Full Name</Label>
              <Input
                id="customerName"
                type="text"
                required
                value={customerData.customerName}
                onChange={(e) =>
                  setCustomerData((prev) => ({
                    ...prev,
                    customerName: e.target.value,
                  }))
                }
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="customerEmail">Email Address</Label>
              <Input
                id="customerEmail"
                type="email"
                required
                value={customerData.customerEmail}
                onChange={(e) =>
                  setCustomerData((prev) => ({
                    ...prev,
                    customerEmail: e.target.value,
                  }))
                }
                placeholder="Enter your email address"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={initializePayment.isPending}
            >
              {initializePayment.isPending
                ? "Initializing..."
                : "Continue to Payment"}
            </Button>
          </form>
        )}

        {step === "payment" && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Payment Methods</h3>
              {paymentLink.paymentMethods?.card && (
                <Button
                  className="w-full mb-2"
                  onClick={() =>
                    handleConfirmPayment({
                      paymentIntentId: "pi_test_" + Date.now(),
                    })
                  }
                >
                  Pay with Card
                </Button>
              )}
              {paymentLink.paymentMethods?.crypto && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    handleConfirmPayment({
                      txHash: "0x" + Date.now().toString(16),
                    })
                  }
                >
                  Pay with Crypto
                </Button>
              )}
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Payment Successful!
            </h2>
            <p className="text-gray-600">
              Your payment has been processed successfully. You should receive a
              confirmation email shortly.
            </p>
            {transactionId && (
              <p className="text-sm text-gray-500">
                Transaction ID: {transactionId}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
