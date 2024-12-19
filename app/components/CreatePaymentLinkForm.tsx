import { useState, useEffect } from "react";
import { useCreatePaymentLink } from "../dashboard/payment-link/api";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "./LoadingSpinner";
import {
  PaymentLinkType,
  TransactionType,
  VerificationMethod,
  CreatePaymentLinkDto,
  PaymentMethodType,
} from "../dashboard/payment-link/api";
import { Upload } from "lucide-react";

const TOKENS = {
  "BTC-NETWORK": {
    symbol: "BTC",
    name: "Bitcoin",
    chainId: 1,
    address: "0x0000000000000000000000000000000000000000",
    network: "Bitcoin Network",
  },
  "ETH-MAINNET": {
    symbol: "ETH",
    name: "Ethereum",
    chainId: 1,
    address: "0x0000000000000000000000000000000000000000",
    network: "Ethereum Mainnet",
  },
  "USDT-MAINNET": {
    symbol: "USDT",
    name: "Tether USD",
    chainId: 1,
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    network: "Ethereum Mainnet",
  },
  "USDC-MAINNET": {
    symbol: "USDC",
    name: "USD Coin",
    chainId: 1,
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    network: "Ethereum Mainnet",
  },
  "BNB-BSC": {
    symbol: "BNB",
    name: "BNB",
    chainId: 56,
    address: "0x0000000000000000000000000000000000000000",
    network: "BNB Smart Chain",
  },
  "USDT-BSC": {
    symbol: "USDT",
    name: "Tether USD",
    chainId: 56,
    address: "0x55d398326f99059fF775485246999027B3197955",
    network: "BNB Smart Chain",
  },
  "USDC-BSC": {
    symbol: "USDC",
    name: "USD Coin",
    chainId: 56,
    address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    network: "BNB Smart Chain",
  },
} as const;

interface CreatePaymentLinkFormProps {
  onClose: () => void;
}

interface DealStage {
  name: string;
  paymentPercentage: number;
  requirements: string[];
  description: string;
  timelineInDays: number;
  requiredDocuments: string[];
}

interface FormState {
  name: string;
  defaultAmount: string;
  defaultCurrency: string;
  description: string;
  type: PaymentLinkType;
  transactionType: TransactionType;
  serviceDetails: {
    description: string;
    deliveryTimeline: string;
    terms: {
      contractTerms: string;
      paymentSchedule: string;
      cancellationTerms: string;
      disputeResolution: string;
      additionalClauses: string[];
    };
  };
  serviceProof: {
    description: string;
    proofFiles: string[];
    completionDate: string;
  };
  cryptocurrencyDetails: {
    network: string;
    tokenSymbol: string;
    tokenAddress?: string;
    chainId?: number;
    decimals?: number;
    requiredConfirmations?: number;
    acceptedTokens?: string[];
    networkOptions?: Array<{
      chainId: number;
      name: string;
      requiredConfirmations: number;
    }>;
  };
  dealDetails: {
    dealType: string;
    title: string;
    description: string;
    timeline: string;
    stages: DealStage[];
    requireAllPartyApproval: boolean;
    stageTransitionDelay: number;
    customStageRules?: {
      allowPartialPayments: boolean;
      requireDocumentVerification: boolean;
    };
  };
  escrowConditions?: {
    timeoutPeriod: number;
    autoReleaseHours: number;
  };
}

const DEFAULT_DEAL_STAGES: DealStage[] = [
  {
    name: "Initial Stage",
    paymentPercentage: 25,
    requirements: ["Enter requirement 1", "Enter requirement 2"],
    description: "Initial stage of the deal",
    timelineInDays: 30,
    requiredDocuments: ["Document 1", "Document 2"],
  },
  {
    name: "Second Stage",
    paymentPercentage: 25,
    requirements: ["Enter requirement 1", "Enter requirement 2"],
    description: "Second stage of the deal",
    timelineInDays: 30,
    requiredDocuments: ["Document 1", "Document 2"],
  },
];

const DEAL_TIMELINES = [
  { value: "IMMEDIATE", label: "Immediate" },
  { value: "5_DAYS", label: "5 Days" },
  { value: "7_DAYS", label: "7 Days" },
  { value: "14_DAYS", label: "14 Days" },
  { value: "30_DAYS", label: "30 Days" },
  { value: "60_DAYS", label: "60 Days" },
  { value: "90_DAYS", label: "90 Days" },
  { value: "120_DAYS", label: "120 Days" },
  { value: "180_DAYS", label: "180 Days" },
  { value: "365_DAYS", label: "1 Year" },
] as const;

const CreatePaymentLinkForm: React.FC<CreatePaymentLinkFormProps> = ({
  onClose,
}) => {
  const queryClient = useQueryClient();
  const createPaymentLink = useCreatePaymentLink();

  const initialCryptoDetails = {
    network: "Ethereum Mainnet",
    tokenSymbol: "USDT",
    tokenAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    chainId: 1,
    decimals: undefined,
    requiredConfirmations: undefined,
    acceptedTokens: ["USDT"],
    networkOptions: [{
      chainId: 1,
      name: "Ethereum Mainnet",
      requiredConfirmations: 12
    }]
  };

  const [formData, setFormData] = useState<FormState>({
    name: "",
    defaultAmount: "",
    defaultCurrency: "USD",
    description: "",
    type: PaymentLinkType.SELLING,
    transactionType: TransactionType.CRYPTOCURRENCY,
    serviceDetails: {
      description: "",
      deliveryTimeline: "",
      terms: {
        contractTerms: "",
        paymentSchedule: "",
        cancellationTerms: "",
        disputeResolution: "",
        additionalClauses: [],
      },
    },
    serviceProof: {
      description: "",
      proofFiles: [],
      completionDate: "",
    },
    cryptocurrencyDetails: initialCryptoDetails,
    dealDetails: {
      dealType: "",
      title: "",
      description: "",
      timeline: "",
      stages: [],
      requireAllPartyApproval: true,
      stageTransitionDelay: 24,
      customStageRules: {
        allowPartialPayments: false,
        requireDocumentVerification: true
      }
    },
    escrowConditions: {
      timeoutPeriod: 72,
      autoReleaseHours: 48
    }
  });

  const handleTransactionTypeChange = (value: TransactionType) => {
    setFormData((prev) => ({
      ...prev,
      transactionType: value,
    }));
  };

  const handleTokenChange = (value: string) => {
    const token = TOKENS[value as keyof typeof TOKENS];
    if (!token) {
      console.error("Invalid token selected:", value);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      cryptocurrencyDetails: {
        ...prev.cryptocurrencyDetails,
        tokenSymbol: token.symbol,
        tokenAddress: token.address,
        chainId: token.chainId,
        network: token.network,
        acceptedTokens: [token.symbol],
        networkOptions: [{
          chainId: token.chainId,
          name: token.network,
          requiredConfirmations: 12
        }]
      }
    }));
  };

  const renderTransactionTypeFields = () => {
    switch (formData.transactionType) {
      case TransactionType.CRYPTOCURRENCY:
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="tokenSymbol">Token</Label>
              <Select
                value={`${formData.cryptocurrencyDetails.tokenSymbol}-${
                  formData.cryptocurrencyDetails.chainId === 1
                    ? "MAINNET"
                    : "BSC"
                }`}
                onValueChange={(value) => {
                  const token = TOKENS[value as keyof typeof TOKENS];
                  setFormData((prev) => ({
                    ...prev,
                    cryptocurrencyDetails: {
                      ...prev.cryptocurrencyDetails,
                      tokenSymbol: token.symbol,
                      tokenAddress: token.address,
                      chainId: token.chainId,
                    },
                  }));
                }}
              >
                <SelectTrigger id="tokenSymbol">
                  <SelectValue
                    placeholder="Select token"
                    className="text-black"
                  />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="BTC-NETWORK">BTC (Bitcoin Network)</SelectItem> */}
                  {/* <SelectItem value="ETH-MAINNET">ETH (Ethereum Mainnet)</SelectItem> */}
                  <SelectItem value="USDT-MAINNET">
                    USDT (Ethereum Mainnet)
                  </SelectItem>
                  <SelectItem value="USDC-MAINNET">
                    USDC (Ethereum Mainnet)
                  </SelectItem>
                  {/* <SelectItem value="BNB-BSC">BNB (BNB Smart Chain)</SelectItem> */}
                  <SelectItem value="USDT-BSC">
                    USDT (BNB Smart Chain)
                  </SelectItem>
                  <SelectItem value="USDC-BSC">
                    USDC (BNB Smart Chain)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tokenAddress">Token Address</Label>
              <Input
                id="tokenAddress"
                value={formData.cryptocurrencyDetails.tokenAddress}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Contract address for{" "}
                {formData.cryptocurrencyDetails.tokenSymbol} on{" "}
                {formData.cryptocurrencyDetails.chainId === 1
                  ? "Ethereum Mainnet"
                  : "BNB Smart Chain"}
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="chainId">Network</Label>
              <Input
                id="chainId"
                value={
                  formData.cryptocurrencyDetails.chainId === 1
                    ? "Ethereum Mainnet"
                    : "BNB Smart Chain"
                }
                disabled
                className="bg-muted"
              />
            </div>
          </div>
        );

      case TransactionType.SERVICES:
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Service Description</Label>
              <Textarea
                placeholder="Describe your service in detail..."
                value={formData.serviceDetails.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    serviceDetails: {
                      ...prev.serviceDetails,
                      description: e.target.value,
                    },
                  }))
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Delivery Timeline</Label>
              <Input
                placeholder="e.g., 2 weeks"
                value={formData.serviceDetails.deliveryTimeline}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    serviceDetails: {
                      ...prev.serviceDetails,
                      deliveryTimeline: e.target.value,
                    },
                  }))
                }
                required
              />
            </div>

            <div className="space-y-4">
              <Label>Service Terms</Label>

              <div className="grid gap-2">
                <Label className="text-sm">Contract Terms</Label>
                <Textarea
                  placeholder="Enter the standard contract terms..."
                  value={formData.serviceDetails.terms.contractTerms}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      serviceDetails: {
                        ...prev.serviceDetails,
                        terms: {
                          ...prev.serviceDetails.terms,
                          contractTerms: e.target.value,
                        },
                      },
                    }))
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-sm">Payment Schedule</Label>
                <Select
                  value={formData.serviceDetails.terms.paymentSchedule}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      serviceDetails: {
                        ...prev.serviceDetails,
                        terms: {
                          ...prev.serviceDetails.terms,
                          paymentSchedule: value,
                        },
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Payment upon completion">
                      Payment upon completion
                    </SelectItem>
                    <SelectItem value="50% upfront, 50% upon completion">
                      50% upfront, 50% upon completion
                    </SelectItem>
                    <SelectItem value="Full payment upfront">
                      Full payment upfront
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label className="text-sm">Cancellation Terms</Label>
                <Textarea
                  placeholder="Enter cancellation policy..."
                  value={formData.serviceDetails.terms.cancellationTerms}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      serviceDetails: {
                        ...prev.serviceDetails,
                        terms: {
                          ...prev.serviceDetails.terms,
                          cancellationTerms: e.target.value,
                        },
                      },
                    }))
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-sm">Dispute Resolution</Label>
                <Textarea
                  placeholder="Enter dispute resolution process..."
                  value={formData.serviceDetails.terms.disputeResolution}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      serviceDetails: {
                        ...prev.serviceDetails,
                        terms: {
                          ...prev.serviceDetails.terms,
                          disputeResolution: e.target.value,
                        },
                      },
                    }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Service Proof Requirements</Label>
              <Textarea
                placeholder="Describe what proof will be required upon service completion..."
                value={formData.serviceProof.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    serviceProof: {
                      ...prev.serviceProof,
                      description: e.target.value,
                    },
                  }))
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Expected Completion Date</Label>
              <Input
                type="date"
                value={formData.serviceProof.completionDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    serviceProof: {
                      ...prev.serviceProof,
                      completionDate: e.target.value,
                    },
                  }))
                }
                required
              />
            </div>
          </div>
        );

      case TransactionType.DEALS:
        return renderDealFields();

      default:
        return null;
    }
  };

  const renderDealFields = () => (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label>Deal Type</Label>
        <Input
          value={formData.dealDetails.dealType}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              dealDetails: {
                ...prev.dealDetails,
                dealType: e.target.value,
              },
            }))
          }
          placeholder="e.g., REAL ESTATE, BUSINESS ACQUISITION, etc."
          required
        />
        <p className="text-xs text-muted-foreground">
          Enter the type of deal you're creating
        </p>
      </div>

      <div className="grid gap-2">
        <Label>Deal Title</Label>
        <Input
          value={formData.dealDetails.title}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              dealDetails: {
                ...prev.dealDetails,
                title: e.target.value,
              },
            }))
          }
          placeholder="e.g., Property Purchase Agreement"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label>Description</Label>
        <Textarea
          value={formData.dealDetails.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              dealDetails: {
                ...prev.dealDetails,
                description: e.target.value,
              },
            }))
          }
          placeholder="e.g., Purchase of commercial property at 123 Business Ave"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label>Timeline</Label>
        <Select
          value={formData.dealDetails.timeline}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              dealDetails: {
                ...prev.dealDetails,
                timeline: value,
              },
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select deal timeline" />
          </SelectTrigger>
          <SelectContent>
            {DEAL_TIMELINES.map((timeline) => (
              <SelectItem key={timeline.value} value={timeline.value}>
                {timeline.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Maximum duration for completing all deal stages
        </p>
      </div>

      <div className="grid gap-2">
        <div className="flex justify-between items-center">
          <Label>Deal Stages</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                dealDetails: {
                  ...prev.dealDetails,
                  stages: [
                    ...prev.dealDetails.stages,
                    {
                      name: "",
                      paymentPercentage: 0,
                      requirements: [],
                      description: "",
                      timelineInDays: 0,
                      requiredDocuments: [],
                    },
                  ],
                },
              }));
            }}
          >
            Add Stage
          </Button>
        </div>

        <div className="space-y-4">
          {formData.dealDetails.stages.map((stage, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Stage {index + 1}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      const newStages = formData.dealDetails.stages.filter(
                        (_, i) => i !== index
                      );
                      setFormData((prev) => ({
                        ...prev,
                        dealDetails: {
                          ...prev.dealDetails,
                          stages: newStages,
                        },
                      }));
                    }}
                  >
                    Remove
                  </Button>
                </div>

                <div className="grid gap-2">
                  <Label className="text-sm">Stage Name</Label>
                  <Input
                    value={stage.name}
                    onChange={(e) => {
                      const newStages = [...formData.dealDetails.stages];
                      newStages[index] = { ...stage, name: e.target.value };
                      setFormData((prev) => ({
                        ...prev,
                        dealDetails: {
                          ...prev.dealDetails,
                          stages: newStages,
                        },
                      }));
                    }}
                    placeholder="e.g., Initial Deposit"
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="text-sm">Description</Label>
                  <Textarea
                    value={stage.description}
                    onChange={(e) => {
                      const newStages = [...formData.dealDetails.stages];
                      newStages[index] = { ...stage, description: e.target.value };
                      setFormData((prev) => ({
                        ...prev,
                        dealDetails: {
                          ...prev.dealDetails,
                          stages: newStages,
                        },
                      }));
                    }}
                    placeholder="e.g., Initial deposit to secure the deal"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-sm">Payment Percentage</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={stage.paymentPercentage}
                        onChange={(e) => {
                          const newStages = [...formData.dealDetails.stages];
                          newStages[index] = {
                            ...stage,
                            paymentPercentage: Number(e.target.value),
                          };
                          setFormData((prev) => ({
                            ...prev,
                            dealDetails: {
                              ...prev.dealDetails,
                              stages: newStages,
                            },
                          }));
                        }}
                        min="0"
                        max="100"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-sm">Timeline (Days)</Label>
                    <Input
                      type="number"
                      value={stage.timelineInDays}
                      onChange={(e) => {
                        const newStages = [...formData.dealDetails.stages];
                        newStages[index] = {
                          ...stage,
                          timelineInDays: Number(e.target.value),
                        };
                        setFormData((prev) => ({
                          ...prev,
                          dealDetails: {
                            ...prev.dealDetails,
                            stages: newStages,
                          },
                        }));
                      }}
                      min="1"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label className="text-sm">Requirements</Label>
                  <Textarea
                    value={stage.requirements.join("\n")}
                    onChange={(e) => {
                      const newStages = [...formData.dealDetails.stages];
                      newStages[index] = {
                        ...stage,
                        requirements: e.target.value.split("\n").filter(r => r.trim()),
                      };
                      setFormData((prev) => ({
                        ...prev,
                        dealDetails: {
                          ...prev.dealDetails,
                          stages: newStages,
                        },
                      }));
                    }}
                    placeholder="Enter requirements (one per line)&#10;e.g., Signed LOI&#10;Proof of Funds"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="text-sm">Required Documents</Label>
                  <div className="space-y-2">
                    {stage.requiredDocuments.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {stage.requiredDocuments.map((doc, docIndex) => (
                          <div
                            key={docIndex}
                            className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-md"
                          >
                            <span className="text-sm">{doc}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-auto p-1 hover:bg-destructive/20"
                              onClick={() => {
                                const newStages = [...formData.dealDetails.stages];
                                newStages[index] = {
                                  ...stage,
                                  requiredDocuments: stage.requiredDocuments.filter(
                                    (_, i) => i !== docIndex
                                  ),
                                };
                                setFormData((prev) => ({
                                  ...prev,
                                  dealDetails: {
                                    ...prev.dealDetails,
                                    stages: newStages,
                                  },
                                }));
                              }}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt"
                        className="flex-1"
                        onChange={(e) => handleFileSelection(index, e.target.files)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.multiple = true;
                          input.accept = '.pdf,.doc,.docx,.txt';
                          input.onchange = (e) => {
                            const target = e.target as HTMLInputElement;
                            handleFileSelection(index, target.files);
                          };
                          input.click();
                        }}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: PDF, DOC, DOCX, TXT
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Total percentage:</span>
          <span>
            {formData.dealDetails.stages.reduce(
              (sum, stage) => sum + stage.paymentPercentage,
              0
            )}
            %
          </span>
        </div>
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Basic validation
      if (!formData.name.trim()) {
        toast.error("Please enter a name for the payment link");
        return;
      }

      if (!formData.defaultAmount || Number(formData.defaultAmount) <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

      // Base DTO
      const baseDto: Partial<CreatePaymentLinkDto> = {
        name: formData.name.trim(),
        type: PaymentLinkType.SELLING,
        transactionType: formData.transactionType,
        defaultAmount: Number(formData.defaultAmount),
        defaultCurrency: formData.defaultCurrency,
        verificationMethod:
          formData.transactionType === TransactionType.CRYPTOCURRENCY
            ? VerificationMethod.BLOCKCHAIN_CONFIRMATION
            : formData.transactionType === TransactionType.DEALS
            ? VerificationMethod.THIRD_PARTY_ARBITRATION
            : VerificationMethod.SELLER_PROOF_SUBMISSION,
        paymentMethods: [
          {
            methodId: "card-default",
            type: PaymentMethodType.CARD,
            isDefault: false,
            details: {
              supportedCards: ["visa", "mastercard"],
            },
          },
          {
            methodId: "bank-default",
            type: PaymentMethodType.BANK_TRANSFER,
            isDefault: true,
            details: {
              supportedBanks: ["all"],
            },
          },
          {
            methodId: "crypto-default",
            type: PaymentMethodType.CRYPTOCURRENCY,
            isDefault: false,
            details: {
              supportedNetworks: ["ETHEREUM"],
            },
          },
        ],
      };

      let finalDto: CreatePaymentLinkDto;

      switch (formData.transactionType) {
        case TransactionType.CRYPTOCURRENCY:
          if (
            !formData.cryptocurrencyDetails.tokenSymbol ||
            !formData.cryptocurrencyDetails.tokenAddress
          ) {
            toast.error("Please select a token");
            return;
          }

          finalDto = {
            ...baseDto,
            cryptocurrencyDetails: {
              network: formData.cryptocurrencyDetails.network,
              tokenSymbol: formData.cryptocurrencyDetails.tokenSymbol,
              tokenAddress: formData.cryptocurrencyDetails.tokenAddress || "",
              chainId: formData.cryptocurrencyDetails.chainId || 1,
              decimals: formData.cryptocurrencyDetails.decimals,
              requiredConfirmations:
                formData.cryptocurrencyDetails.requiredConfirmations,
              acceptedTokens: formData.cryptocurrencyDetails.acceptedTokens,
              networkOptions: formData.cryptocurrencyDetails.networkOptions,
            },
          } as CreatePaymentLinkDto;
          break;

        case TransactionType.SERVICES:
          // Validate required service details
          if (!formData.serviceDetails.description) {
            toast.error("Please enter a service description");
            return;
          }

          if (!formData.serviceDetails.deliveryTimeline) {
            toast.error("Please specify a delivery timeline");
            return;
          }

          // Validate service terms
          if (!formData.serviceDetails.terms.contractTerms) {
            toast.error("Please enter contract terms");
            return;
          }

          if (!formData.serviceDetails.terms.paymentSchedule) {
            toast.error("Please select a payment schedule");
            return;
          }

          if (!formData.serviceDetails.terms.cancellationTerms) {
            toast.error("Please specify cancellation terms");
            return;
          }

          if (!formData.serviceDetails.terms.disputeResolution) {
            toast.error("Please specify dispute resolution terms");
            return;
          }

          // Validate service proof
          if (!formData.serviceProof.description) {
            toast.error("Please describe the required proof of service completion");
            return;
          }

          if (!formData.serviceProof.completionDate) {
            toast.error("Please set an expected completion date");
            return;
          }

          finalDto = {
            ...baseDto,
            isAmountNegotiable: false,
            verificationMethod: VerificationMethod.SELLER_PROOF_SUBMISSION,
            paymentMethods: [
              {
                methodId: "card-default",
                type: PaymentMethodType.CARD,
                isDefault: true,
                details: {
                  supportedCards: ["visa", "mastercard"]
                }
              },
              {
                methodId: "bank-default",
                type: PaymentMethodType.BANK_TRANSFER,
                isDefault: false,
                details: {
                  supportedBanks: ["all"]
                }
              },
              {
                methodId: "crypto-default",
                type: PaymentMethodType.CRYPTOCURRENCY,
                isDefault: false,
                details: {
                  supportedNetworks: ["ETHEREUM"]
                }
              }
            ],
            serviceDetails: {
              description: formData.serviceDetails.description,
              deliveryTimeline: formData.serviceDetails.deliveryTimeline,
              terms: formData.serviceDetails.terms
            },
            serviceProof: {
              description: formData.serviceProof.description,
              proofFiles: formData.serviceProof.proofFiles,
              completionDate: formData.serviceProof.completionDate
            }
          } as CreatePaymentLinkDto;
          break;

        case TransactionType.DEALS:
          // Basic validation
          if (!formData.dealDetails.title.trim()) {
            toast.error("Please enter a deal title");
            return;
          }

          if (!formData.dealDetails.description.trim()) {
            toast.error("Please enter a deal description");
            return;
          }

          if (!formData.dealDetails.dealType.trim()) {
            toast.error("Please select a deal type");
            return;
          }

          if (formData.dealDetails.stages.length === 0) {
            toast.error("At least one deal stage is required");
            return;
          }

          // Validate stages
          for (const [index, stage] of formData.dealDetails.stages.entries()) {
            if (!stage.name.trim()) {
              toast.error(`Stage ${index + 1}: Name is required`);
              return;
            }
            if (!stage.description.trim()) {
              toast.error(`Stage ${index + 1}: Description is required`);
              return;
            }
            if (stage.paymentPercentage <= 0) {
              toast.error(`Stage ${index + 1}: Payment percentage must be greater than 0`);
              return;
            }
            if (stage.timelineInDays <= 0) {
              toast.error(`Stage ${index + 1}: Timeline must be greater than 0 days`);
              return;
            }
            if (stage.requirements.length === 0) {
              toast.error(`Stage ${index + 1}: At least one requirement is needed`);
              return;
            }
          }

          const totalPercentage = formData.dealDetails.stages.reduce(
            (sum, stage) => sum + stage.paymentPercentage,
            0
          );

          if (totalPercentage !== 100) {
            toast.error("Total payment percentage must equal 100%");
            return;
          }

          finalDto = {
            ...baseDto,
            isAmountNegotiable: true,
            verificationMethod: VerificationMethod.THIRD_PARTY_ARBITRATION,
            paymentMethods: [
              {
                methodId: "card-default",
                type: PaymentMethodType.CARD,
                isDefault: false,
                details: {
                  supportedCards: ["visa", "mastercard"]
                }
              },
              {
                methodId: "bank-default",
                type: PaymentMethodType.BANK_TRANSFER,
                isDefault: true,
                details: {
                  supportedBanks: ["all"]
                }
              },
              {
                methodId: "crypto-default",
                type: PaymentMethodType.CRYPTOCURRENCY,
                isDefault: false,
                details: {
                  supportedNetworks: ["ETHEREUM"]
                }
              }
            ],
            dealDetails: {
              ...formData.dealDetails,
              requireAllPartyApproval: true,
              stageTransitionDelay: 24,
              customStageRules: {
                allowPartialPayments: false,
                requireDocumentVerification: true
              }
            },
            escrowConditions: {
              timeoutPeriod: 72,
              autoReleaseHours: 48
            }
          } as CreatePaymentLinkDto;
          break;

        default:
          throw new Error("Invalid transaction type");
      }

      await createPaymentLink.mutateAsync(finalDto);
      toast.success("Payment link created successfully");
      onClose();
    } catch (error: unknown) {
      console.error("Create payment link error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create payment link";
      toast.error(errorMessage);
    }
  };

  const renderCommonFields = () => (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name" className="font-medium">
          Link Name
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Enter payment link name"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="transactionType" className="font-medium">
          Transaction Type
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          value={formData.transactionType}
          onValueChange={handleTransactionTypeChange}
        >
          <SelectTrigger id="transactionType">
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TransactionType.CRYPTOCURRENCY}>
              Cryptocurrency
            </SelectItem>
            <SelectItem value={TransactionType.SERVICES}>Services</SelectItem>
            <SelectItem value={TransactionType.DEALS}>Deals</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="amount">Default Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={formData.defaultAmount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                defaultAmount: e.target.value,
              }))
            }
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="currency">Default Currency</Label>
          <Select
            value={formData.defaultCurrency}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                defaultCurrency: value,
              }))
            }
          >
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NGN">NGN</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe what this payment link is for..."
          className="min-h-[100px]"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          required
        />
      </div>

      {renderTransactionTypeFields()}
    </div>
  );

  const handleFileSelection = (index: number, files: FileList | null) => {
    if (!files) return;

    const newStages = [...formData.dealDetails.stages];
    newStages[index] = {
      ...newStages[index],
      requiredDocuments: Array.from(files).map(file => file.name)
    };

    setFormData((prev) => ({
      ...prev,
      dealDetails: {
        ...prev.dealDetails,
        stages: newStages,
      },
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Payment Link</CardTitle>
        <CardDescription>
          Create a new payment link for your{" "}
          {formData.transactionType.toLowerCase().replace("_", " ")}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">{renderCommonFields()}</div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createPaymentLink.isPending}
              className="min-w-[120px]"
            >
              {createPaymentLink.isPending ? <>Creating...</> : "Create Link"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePaymentLinkForm;
