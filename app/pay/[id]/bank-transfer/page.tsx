"use client";

import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetTransactionDetails } from '../api';
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const BankTransferPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const txId = searchParams.get('txId');
  
  const { data: transaction, isLoading, error } = useGetTransactionDetails(txId || undefined);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  if (isLoading) return <LoadingSpinner />;
  if (error || !transaction) return <div>Error loading transaction details</div>;

  const bankDetails = transaction.paymentDetails.bankDetails;
  if (!bankDetails) return <div>Invalid transaction type</div>;

  return (
    <div className="h-full flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Bank Transfer Instructions</CardTitle>
          <CardDescription>
            Please complete the bank transfer with the following details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-green-50 p-4 border border-green-200">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <p className="text-green-700">Transaction initiated successfully</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Bank Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Bank Name</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{bankDetails.bankName}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.bankName)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Account Name</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{bankDetails.accountName}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.accountName)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Account Number</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{bankDetails.accountNumber}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.accountNumber)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Routing Number</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{bankDetails.routingNumber}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.routingNumber)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Reference</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{bankDetails.reference}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.reference)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
              <p className="text-sm text-blue-700">
                Please include the reference number in your transfer description. 
                Once we receive your payment, your transaction will be processed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankTransferPage; 