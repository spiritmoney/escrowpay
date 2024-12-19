"use client";

import React, { useState, useEffect } from "react";
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
import {
  useInitiateTransaction,
  useGetTransactionDetails,
  useGetPaymentLink,
  useGetTransactionHistory,
  useGetEscrowDetails,
  InitiateTransactionData,
} from "./api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import {
  PaymentLinkType,
  TransactionType,
  VerificationMethod,
} from "@/app/dashboard/payment-link/api";
import { toast } from "sonner";
import { CreditCard, Wallet, Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const API_URL = "https://espeespay-backend.onrender.com";
const queryClient = new QueryClient();

interface ServiceDetails {
  description?: string;
  deliveryTimeline?: string;
  terms?: {
    conditions?: string[];
    paymentTerms?: string;
    cancellationPolicy?: string;
    refundPolicy?: string;
  };
}

interface ServiceRequirements {
  proofDescription: string;
  requiredFiles: string[];
  completionDate: string;
}

interface PaymentMethod {
  type: string;
  isDefault: boolean;
}

interface DealStage {
  name: string;
  paymentPercentage: number;
  requirements: string[];
}

interface DealDetails {
  dealType: string;
  title: string;
  description: string;
  timeline: string;
  stages: DealStage[];
  requiredDocuments: string[];
  terms: {
    contractTerms: string;
    paymentSchedule: string;
    cancellationTerms: string;
    disputeResolution: string;
    additionalClauses: string[];
  };
}

interface PaymentLinkDetails {
  id: string;
  name: string;
  type: PaymentLinkType;
  transactionType: TransactionType;
  defaultAmount: number;
  defaultCurrency: string;
  isAmountNegotiable: boolean;
  minimumAmount: number;
  maximumAmount: number;
  paymentMethods: Array<{
    type: string;
    isDefault: boolean;
    details: {
      supportedCards?: string[];
      networks?: string[];
      tokens?: string[];
    };
  }>;
  serviceDetails?: {
    description: string;
    deliveryTimeline: string;
    terms: {
      conditions: string[];
      cancellationPolicy?: string;
      refundPolicy?: string;
    };
  };
  verificationMethod: VerificationMethod;
  metadata: {
    customerRequirements: {
      emailRequired: boolean;
      phoneRequired: boolean;
      addressRequired: boolean;
    };
    escrowConditions: {
      timeoutPeriod: number;
      autoReleaseEnabled: boolean;
    };
  };
  sandboxMode?: boolean;
  sandboxInstructions?: {
    CARD?: {
      testCards: Array<{
        number: string;
        expiry: string;
        cvc: string;
        type: string;
      }>;
      instructions: string;
    };
    BANK_TRANSFER?: {
      testAccounts: Array<{
        bankName: string;
        accountNumber: string;
        routingNumber: string;
        accountType: string;
        accountHolder: string;
      }>;
      instructions: string;
    };
    CRYPTOCURRENCY?: {
      testWallets: Array<{
        address: string;
        network: string;
        privateKey: string;
      }>;
      networks: string[];
      instructions: string;
    };
    DEALS?: {
      stages: {
        [key: string]: {
          percentage: number;
          description: string;
        };
      };
      testDocuments: Array<{
        type: string;
        template: string;
      }>;
      escrowInstructions: string;
      instructions: string;
    };
  };
}

interface SellerInfo {
  id: string;
  name: string;
  organisation?: string;
  email: string;
  wallet: null | {
    address: string;
    network: string;
    chainId: number;
  };
}

interface PaymentLinkResponse {
  seller: SellerInfo;
  paymentLink: PaymentLinkDetails;
}

interface TransactionStatus {
  status: "PENDING" | "COMPLETED" | "FAILED";
  stage?: string;
  escrowStatus?: string;
  nextAction?: string;
}

interface CustomerTransaction {
  id: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  createdAt: Date;
  paymentMethod: string;
  transactionType: TransactionType;
  metadata: {
    dealStage?: string;
    requiredDocuments?: string[];
    escrowDetails?: {
      timeoutPeriod: number;
      autoReleaseEnabled: boolean;
      disputeResolutionPeriod: number;
    };
  };
}

type PaymentMethodKey = "CARD" | "BANK_TRANSFER" | "CRYPTOCURRENCY" | "DEALS";

// Add this interface for test payment details
interface TestPaymentDetails {
  card: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
  };
  bank: {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
  };
  crypto: {
    walletAddress: string;
    network: string;
    tokenSymbol: string;
  };
}

// Add test payment details constant
const TEST_PAYMENT_DETAILS: TestPaymentDetails = {
  card: {
    cardNumber: "4242424242424242",
    expiryMonth: "12",
    expiryYear: "25",
    cvc: "123",
  },
  bank: {
    bankName: "Test Bank",
    accountNumber: "0123456789",
    routingNumber: "110000000",
  },
  crypto: {
    walletAddress: "0xTestAddress1234567890abcdef",
    network: "ETHEREUM",
    tokenSymbol: "ETH",
  },
};

const DEFAULT_SANDBOX_MODE = true;

// First, let's add an interface for the transaction data
interface TransactionData {
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  paymentMethod: string;
  buyerWalletAddress?: string;
  paymentDetails?: {
    network?: string;
    tokenSymbol?: string;
  };
}

const SellerInfo: React.FC<{ seller: SellerInfo }> = ({ seller }) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="font-medium">{seller.name}</h3>
          {seller.organisation && (
            <p className="text-sm text-muted-foreground">
              {seller.organisation}
            </p>
          )}
          {seller.wallet && (
            <p className="text-xs text-muted-foreground">
              Wallet: {seller.wallet.address} ({seller.wallet.network})
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const ServiceDetails: React.FC<{ details: ServiceDetails }> = ({ details }) => {
  // Provide default empty values for terms if undefined
  const terms = details.terms ?? {
    conditions: [],
    paymentTerms: "",
    cancellationPolicy: "",
    refundPolicy: "",
  };

  return (
    <div className="space-y-4 mb-6">
      {details.description && (
        <div>
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-sm">{details.description}</p>
        </div>
      )}

      {details.deliveryTimeline && (
        <div>
          <h4 className="font-medium mb-2">Delivery Timeline</h4>
          <p className="text-sm">{details.deliveryTimeline}</p>
        </div>
      )}

      {details.terms?.conditions && details.terms.conditions.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Terms & Conditions</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            {details.terms.conditions.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>
        </div>
      )}

      {terms.paymentTerms && (
        <div>
          <h4 className="font-medium mb-2">Payment Terms</h4>
          <p className="text-sm">{terms.paymentTerms}</p>
        </div>
      )}

      {terms.cancellationPolicy && (
        <div>
          <h4 className="font-medium mb-2">Cancellation Policy</h4>
          <p className="text-sm">{terms.cancellationPolicy}</p>
        </div>
      )}

      {terms.refundPolicy && (
        <div>
          <h4 className="font-medium mb-2">Refund Policy</h4>
          <p className="text-sm">{terms.refundPolicy}</p>
        </div>
      )}
    </div>
  );
};

const PaymentMethodSelector: React.FC<{
  paymentMethods: {
    available: string[];
    details: Array<{
      type: string;
      details: {
        supportedCards?: string[];
        supportedBanks?: string[];
        supportedTokens?: string[];
      };
      isDefault: boolean;
    }>;
    defaultMethod: string;
  };
  onSelect: (method: string) => void;
}> = ({ paymentMethods, onSelect }) => {
  return (
    <div className="space-y-4">
      <Label>Payment Method</Label>
      <div className="grid grid-cols-3 gap-4">
        {paymentMethods.details.map((method) => (
          <Button
            key={method.type}
            variant="outline"
            className={`flex items-center justify-center p-4 ${
              method.type === paymentMethods.defaultMethod
                ? "border-primary"
                : ""
            }`}
            onClick={() => onSelect(method.type)}
            type="button"
          >
            {method.type === "CARD" ? (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Card Payment
              </>
            ) : method.type === "CRYPTOCURRENCY" ? (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Crypto Payment
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Bank Transfer
              </>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-US").format(amount);
};

const TransactionHistory: React.FC<{ transactions: CustomerTransaction[] }> = ({
  transactions,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Transaction History</h3>
      <div className="space-y-2">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">ID: {tx.id}</p>
                <p className="text-sm text-muted-foreground">
                  {formatAmount(tx.amount)} {tx.currency}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm ${
                    tx.status.status === "COMPLETED"
                      ? "text-green-600"
                      : tx.status.status === "FAILED"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {tx.status.status}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            {tx.status.stage && (
              <div className="mt-2 text-sm">
                <p>Stage: {tx.status.stage}</p>
                {tx.status.nextAction && (
                  <p className="text-blue-600">
                    Action Required: {tx.status.nextAction}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const PaylincInformation: React.FC<{
  escrowDetails: {
    timeoutPeriod: number;
    autoReleaseEnabled: boolean;
    disputeResolutionPeriod: number;
  };
}> = ({ escrowDetails }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Paylinc Details</h3>
      <div className="p-4 border rounded-lg">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Release Time:</span>
            <span>{escrowDetails.timeoutPeriod}h</span>
          </div>
          <div className="flex justify-between">
            <span>Auto-Release:</span>
            <span>
              {escrowDetails.autoReleaseEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Dispute Window:</span>
            <span>{escrowDetails.disputeResolutionPeriod}h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Update PaymentMethodFields to include auto-fill functionality
const PaymentMethodFields: React.FC<{
  method: string;
  formData: FormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customerRequirements: Record<string, any>;
  isSandboxMode: boolean;
}> = ({ method, formData, onChange, customerRequirements, isSandboxMode }) => {
  
  const handleAutoFill = (type: keyof TestPaymentDetails) => {
    const details = TEST_PAYMENT_DETAILS[type];
    Object.entries(details).forEach(([key, value]) => {
      // Simulate an onChange event for each field
      onChange({
        target: { name: key, value }
      } as React.ChangeEvent<HTMLInputElement>);
    });
  };

  if (method === 'CARD') {
    return (
      <div className="space-y-4">
        {isSandboxMode && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => handleAutoFill('card')}
          >
            Auto-fill Test Card Details
          </Button>
        )}
        <div className="flex flex-col space-y-1.5">
          <Label>Card Number</Label>
          <Input
            name="cardNumber"
            value={formData.cardNumber}
            onChange={onChange}
            placeholder={isSandboxMode ? "4242 4242 4242 4242" : "Enter card number"}
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label>Expiry Month</Label>
            <Input
              name="expiryMonth"
              value={formData.expiryMonth}
              onChange={onChange}
              placeholder={isSandboxMode ? "12" : "MM"}
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Expiry Year</Label>
            <Input
              name="expiryYear"
              value={formData.expiryYear}
              onChange={onChange}
              placeholder={isSandboxMode ? "25" : "YY"}
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>CVC</Label>
            <Input
              name="cvc"
              value={formData.cvc}
              onChange={onChange}
              placeholder={isSandboxMode ? "123" : "CVC"}
              required
            />
          </div>
        </div>
      </div>
    );
  }

  if (method === 'CRYPTOCURRENCY') {
    return (
      <div className="space-y-4">
        {isSandboxMode && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => handleAutoFill('crypto')}
          >
            Auto-fill Test Crypto Details
          </Button>
        )}
        <div className="flex flex-col space-y-1.5">
          <Label>Wallet Address</Label>
          <Input
            name="walletAddress"
            value={formData.walletAddress}
            onChange={onChange}
            placeholder={isSandboxMode ? "0xTestAddress1234567890abcdef" : "Your wallet address"}
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Network</Label>
          <Input
            name="network"
            value={formData.network}
            onChange={onChange}
            placeholder="ETHEREUM"
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Token</Label>
          <Input
            name="tokenSymbol"
            value={formData.tokenSymbol}
            onChange={onChange}
            placeholder="ETH"
            required
          />
        </div>
      </div>
    );
  }

  if (method === 'BANK_TRANSFER') {
    return (
      <div className="space-y-4">
        {isSandboxMode && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => handleAutoFill('bank')}
          >
            Auto-fill Test Bank Details
          </Button>
        )}
        <div className="flex flex-col space-y-1.5">
          <Label>Bank Name</Label>
          <Input
            name="bankName"
            value={formData.bankName}
            onChange={onChange}
            placeholder={isSandboxMode ? "Test Bank" : "Enter bank name"}
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Account Number</Label>
          <Input
            name="accountNumber"
            value={formData.accountNumber}
            onChange={onChange}
            placeholder={isSandboxMode ? "0123456789" : "Enter account number"}
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Routing Number</Label>
          <Input
            name="routingNumber"
            value={formData.routingNumber}
            onChange={onChange}
            placeholder={isSandboxMode ? "110000000" : "Enter routing number"}
            required
          />
        </div>
      </div>
    );
  }

  return null;
};

// Add this component for test payment information
const TestPaymentInfo: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 right-4 rounded-full"
        >
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Test Payment Information</DialogTitle>
          <DialogDescription>
            Use these test credentials to simulate payments in sandbox mode
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="card">Card Payment</TabsTrigger>
            <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
          </TabsList>
          <TabsContent value="card" className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h4 className="font-medium mb-2">Test Card Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Card Number:</span>
                  <code className="bg-background px-2 rounded">
                    4242 4242 4242 4242
                  </code>
                </div>
                <div className="flex justify-between">
                  <span>Expiry:</span>
                  <code className="bg-background px-2 rounded">12/25</code>
                </div>
                <div className="flex justify-between">
                  <span>CVC:</span>
                  <code className="bg-background px-2 rounded">123</code>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Alternative test card:{" "}
              <code className="bg-muted px-2 rounded">5555 5555 5555 4444</code>{" "}
              (Mastercard)
            </div>
          </TabsContent>
          <TabsContent value="bank" className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h4 className="font-medium mb-2">Test Bank Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Bank Name:</span>
                  <code className="bg-background px-2 rounded">Test Bank</code>
                </div>
                <div className="flex justify-between">
                  <span>Account Number:</span>
                  <code className="bg-background px-2 rounded">0123456789</code>
                </div>
                <div className="flex justify-between">
                  <span>Routing Number:</span>
                  <code className="bg-background px-2 rounded">110000000</code>
                </div>
                <div className="flex justify-between">
                  <span>Account Type:</span>
                  <code className="bg-background px-2 rounded">Savings</code>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="crypto" className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h4 className="font-medium mb-2">Test Crypto Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Wallet Address:</span>
                  <code className="bg-background px-2 rounded">
                    0xTestAddress1234567890abcdef
                  </code>
                </div>
                <div className="flex justify-between">
                  <span>Network:</span>
                  <code className="bg-background px-2 rounded">
                    Ethereum Testnet
                  </code>
                </div>
                <div className="flex justify-between">
                  <span>Token:</span>
                  <code className="bg-background px-2 rounded">ETH</code>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="font-medium">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              All transactions in sandbox mode will auto-complete after 5-10
              seconds
            </li>
            <li>No real payments will be processed</li>
            <li>
              Test emails will be sent to demonstrate the notification flow
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add form state interface
interface FormState {
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  // Card fields
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvc?: string;
  // Bank fields
  bankName?: string;
  accountNumber?: string;
  routingNumber?: string;
  // Crypto fields
  walletAddress?: string;
  network?: string;
  tokenSymbol?: string;
}

const PaymentPageContent: React.FC = () => {
  const Icons = {
    spinner: Loader2,
  };

  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("BANK_TRANSFER");
  const [transactionId, setTransactionId] = useState<string>();

  // Move form state inside component
  const [formData, setFormData] = useState<FormState>({
    customerEmail: "",
    customerName: "",
    // customerPhone: "",
    // customerAddress: "",
    walletAddress: "",
    network: "",
    tokenSymbol: "",
  });

  const {
    data: paymentLink,
    isLoading: isLoadingPaymentLink,
    error,
  } = useGetPaymentLink(params.id as string);
  const { data: transactionHistory } = useGetTransactionHistory(
    params.id as string
  );
  const { data: escrowDetails } = useGetEscrowDetails(
    params.id as string,
    transactionId
  );
  const initiateTransaction = useInitiateTransaction();

  // Force sandbox mode if not explicitly set
  const isSandboxMode =
    paymentLink?.paymentLink?.sandboxMode ?? DEFAULT_SANDBOX_MODE;

  // Update selected payment method when paymentLink data is loaded
  useEffect(() => {
    if (paymentLink?.paymentLink?.paymentMethods?.defaultMethod) {
      setSelectedPaymentMethod(
        paymentLink.paymentLink.paymentMethods.defaultMethod
      );
    }
  }, [paymentLink]);

  if (error)
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {error instanceof Error
                ? error.message
                : "Failed to load payment link"}
            </p>
          </CardContent>
        </Card>
      </div>
    );

  if (isLoadingPaymentLink || !paymentLink?.paymentLink)
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <LoadingSpinner />
      </div>
    );

  const renderTransactionForm = () => {
    if (!paymentLink) return null;

    switch (paymentLink.paymentLink.transactionType) {
      case TransactionType.CRYPTOCURRENCY:
        return (
          <div className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Amount</Label>
              <Input
                value={`${formatAmount(
                  paymentLink.paymentLink.defaultAmount
                )} ${paymentLink.paymentLink.defaultCurrency}`}
                disabled
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Your Wallet Address</Label>
              <Input
                id="buyerWalletAddress"
                name="buyerWalletAddress"
                placeholder="Enter your wallet address"
                required
              />
            </div>
          </div>
        );

      case TransactionType.SERVICES:
        return (
          <div className="space-y-4">
            {paymentLink.paymentLink.serviceDetails && (
              <div className="flex flex-col space-y-1.5">
                <Label>Service Description</Label>
                <p className="text-sm">
                  {paymentLink.paymentLink.serviceDetails.description}
                </p>
                {paymentLink.paymentLink.serviceDetails.terms?.conditions &&
                  paymentLink.paymentLink.serviceDetails.terms.conditions
                    .length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Terms & Conditions:</p>
                      <ul className="list-disc list-inside text-sm">
                        {paymentLink.paymentLink.serviceDetails.terms.conditions.map(
                          (condition, index) => (
                            <li key={index}>{condition}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label>Amount</Label>
              <Input
                value={`${formatAmount(
                  paymentLink.paymentLink.defaultAmount
                )} ${paymentLink.paymentLink.defaultCurrency}`}
                disabled
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Customer Name</Label>
              <Input id="name" name="name" placeholder="Your name" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderCustomerForm = () => {
    const customerRequirements =
      paymentLink?.paymentLink?.metadata?.customerRequirements;

    return (
      <div className="space-y-4">
        <div className="flex flex-col space-y-1.5">
          <Label>Customer Name</Label>
          <Input 
            name="customerName"
            value={formData.customerName}
            onChange={handleFormChange}
            placeholder="Your name" 
            required 
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label>Email</Label>
          <Input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleFormChange}
            placeholder="your@email.com" 
            required={customerRequirements?.emailRequired}
          />
        </div>

        {/* {customerRequirements?.phoneRequired && (
          <div className="flex flex-col space-y-1.5">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleFormChange}
              placeholder="+1234567890"
            />
          </div>
        )}

        {customerRequirements?.addressRequired && (
          <div className="flex flex-col space-y-1.5">
            <Label>Address</Label>
            <Textarea
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleFormChange}
              placeholder="Your address"
            />
          </div>
        )} */}

        {paymentLink?.paymentLink?.paymentMethods && (
          <PaymentMethodSelector 
            paymentMethods={paymentLink.paymentLink.paymentMethods}
            onSelect={setSelectedPaymentMethod}
          />
        )}

        {selectedPaymentMethod && (
          <PaymentMethodFields
            method={selectedPaymentMethod}
            formData={formData}
            onChange={handleFormChange}
            customerRequirements={customerRequirements || {}}
            isSandboxMode={isSandboxMode}
          />
        )}
      </div>
    );
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (!formData.customerEmail || !formData.customerName) {
        toast.error("Please fill in all required fields");
        return;
      }

      const transactionData: InitiateTransactionData = {
        amount: paymentLink?.paymentLink.defaultAmount || 0,
        currency: paymentLink?.paymentLink.defaultCurrency || '',
        customerEmail: formData.customerEmail,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerAddress: formData.customerAddress,
        paymentMethod: selectedPaymentMethod,
        ...(selectedPaymentMethod === 'CRYPTOCURRENCY' && {
          buyerWalletAddress: formData.walletAddress,
          paymentDetails: {
            network: formData.network,
            tokenSymbol: formData.tokenSymbol
          }
        })
      };

      const response = await initiateTransaction.mutateAsync({
        linkId: params.id as string,
        data: transactionData,
      });

      if (!response?.transaction?.id) {
        throw new Error("Invalid transaction response");
      }

      // Handle different payment methods
      if (response.transaction.paymentDetails?.checkoutUrl) {
        window.location.href = response.transaction.paymentDetails.checkoutUrl;
      } else if (response.transaction.paymentDetails?.bankDetails) {
        setTransactionId(response.transaction.id);
        window.location.href = `/pay/${params.id}/bank-transfer?txId=${response.transaction.id}`;
      } else if (response.transaction.paymentDetails?.escrowAddress) {
        setTransactionId(response.transaction.id);
        window.location.href = `/pay/${params.id}/crypto?txId=${response.transaction.id}`;
      } else {
        window.location.href = `/pay/${params.id}/success?txId=${response.transaction.id}`;
      }
    } catch (error) {
      console.error("Payment failed:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-100">
      {isSandboxMode && <TestPaymentInfo />}

      <div className="w-full max-w-2xl p-4">
        <Card>
          <CardHeader>
            <CardTitle>{paymentLink.paymentLink.name}</CardTitle>
            <CardDescription>
              {paymentLink.paymentLink.serviceDetails?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SellerInfo seller={paymentLink.seller} />

            {paymentLink.paymentLink.serviceDetails && (
              <ServiceDetails
                details={paymentLink.paymentLink.serviceDetails}
              />
            )}

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Amount:</span>
                <span className="text-lg">
                  {formatAmount(paymentLink.paymentLink.defaultAmount)}{" "}
                  {paymentLink.paymentLink.defaultCurrency}
                </span>
              </div>
              {paymentLink.paymentLink.isAmountNegotiable &&
                paymentLink.paymentLink.minimumAmount &&
                paymentLink.paymentLink.maximumAmount && (
                  <p className="text-sm text-muted-foreground">
                    Price range:{" "}
                    {formatAmount(paymentLink.paymentLink.minimumAmount)} -{" "}
                    {formatAmount(paymentLink.paymentLink.maximumAmount)}{" "}
                    {paymentLink.paymentLink.defaultCurrency}
                  </p>
                )}
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              {renderCustomerForm()}

              <div className="flex flex-col space-y-2">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Pay with {selectedPaymentMethod}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Protected by Paylinc
                  {paymentLink?.paymentLink?.metadata?.escrowConditions
                    ?.timeoutPeriod &&
                    ` • ${paymentLink.paymentLink.metadata.escrowConditions.timeoutPeriod}h Resolution Time`}
                </p>
              </div>
            </form>

            <div className="mt-8 space-y-6">
              {transactionHistory?.transactions?.length > 0 && (
                <TransactionHistory
                  transactions={transactionHistory.transactions}
                />
              )}

              {escrowDetails && (
                <PaylincInformation
                  escrowDetails={{
                    ...paymentLink?.paymentLink?.metadata?.escrowConditions,
                    ...escrowDetails,
                  }}
                />
              )}

              {/* {isSandboxMode && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800">Sandbox Mode</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    This is a test payment link. No real money will be transferred.
                  </p>
                  {paymentLink?.paymentLink?.sandboxInstructions?.[selectedPaymentMethod as PaymentMethodKey] && (
                    <div className="mt-2 text-sm text-yellow-700">
                      <p className="font-medium">Test Instructions:</p>
                      <p>{paymentLink.paymentLink.sandboxInstructions[selectedPaymentMethod as PaymentMethodKey]?.instructions}</p>
                    </div>
                  )}
                </div>
              )} */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Page: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <PaymentPageContent />
  </QueryClientProvider>
);

export default Page;
