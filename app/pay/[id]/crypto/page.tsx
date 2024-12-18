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
import { Copy, CheckCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from 'qrcode.react';

const CryptoPaymentPage = () => {
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

  const { escrowAddress, token, network, exchangeRate, cryptoAmount, requiredConfirmations } = 
    transaction.paymentDetails;

  if (!escrowAddress) return <div>Invalid transaction type</div>;

  return (
    <div className="h-full flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Cryptocurrency Payment</CardTitle>
          <CardDescription>
            Please send the exact amount to complete your payment
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
            <div className="flex justify-center">
              <QRCodeSVG 
                value={escrowAddress}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>

            <div>
              <h3 className="font-medium mb-2">Payment Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Amount</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{cryptoAmount} {token}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(cryptoAmount?.toString() || '')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Network</span>
                  <span className="font-medium">{network}</span>
                </div>

                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Address</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{escrowAddress}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(escrowAddress)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Exchange Rate</span>
                  <span className="font-medium">1 {token} = ${exchangeRate}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
              <p className="text-sm text-blue-700">
                Please send exactly {cryptoAmount} {token} to the address above. 
                The transaction will be confirmed after {requiredConfirmations} network confirmations.
              </p>
            </div>

            <Button 
              className="w-full"
              variant="outline"
              onClick={() => window.location.href = `/pay/${params.id}/success?txId=${txId}`}
            >
              I have made the payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoPaymentPage; 