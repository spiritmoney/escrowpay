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
} from "../dashboard/payment-link/api";
import { Upload } from "lucide-react";

interface CreatePaymentLinkFormProps {
  onClose: () => void;
}

interface DealStage {
  name: string;
  paymentPercentage: number;
  requirements: string[];
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
  servicesDetails: {
    description: string;
    terms: {
      paymentTerms: string;
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
    requiredDocuments: string[];
    terms: {
      contractTerms: string;
      paymentSchedule: string;
      cancellationTerms: string;
      disputeResolution: string;
      additionalClauses: string[];
    };
  };
}

const TOKENS = {
  "BTC-NETWORK": {
    symbol: "BTC",
    name: "Bitcoin",
    chainId: 1,
    address: "0x0000000000000000000000000000000000000000", // Native BTC
    network: "Bitcoin Network",
  },
  "ETH-MAINNET": {
    symbol: "ETH",
    name: "Ethereum",
    chainId: 1,
    address: "0x0000000000000000000000000000000000000000", // Native ETH
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
    address: "0x0000000000000000000000000000000000000000", // Native BNB
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
};

const DEFAULT_DEAL_STAGES: DealStage[] = [
  {
    name: "Initial Stage",
    paymentPercentage: 25,
    requirements: ["Enter requirement 1", "Enter requirement 2"],
    timelineInDays: 30,
    requiredDocuments: ["Document 1", "Document 2"],
  },
  {
    name: "Second Stage",
    paymentPercentage: 25,
    requirements: ["Enter requirement 1", "Enter requirement 2"],
    timelineInDays: 30,
    requiredDocuments: ["Document 1", "Document 2"],
  },
];

const CreatePaymentLinkForm: React.FC<CreatePaymentLinkFormProps> = ({
  onClose,
}) => {
  const queryClient = useQueryClient();
  const createPaymentLink = useCreatePaymentLink();

  const [formData, setFormData] = useState<FormState>({
    name: "",
    defaultAmount: "",
    defaultCurrency: "USD",
    description: "",
    type: PaymentLinkType.SELLING,
    transactionType: TransactionType.CRYPTOCURRENCY,
    servicesDetails: {
      description: "",
      terms: {
        paymentTerms: "Full payment upfront",
      },
    },
    serviceProof: {
      description: "",
      proofFiles: [],
      completionDate: "",
    },
    cryptocurrencyDetails: {
      network: "ETHEREUM",
      tokenSymbol: "ETH",
      tokenAddress: "",
      chainId: undefined,
      decimals: undefined,
      requiredConfirmations: undefined,
      acceptedTokens: ["ETH", "USDT", "USDC"],
      networkOptions: [
        {
          chainId: 1,
          name: "ETHEREUM",
          requiredConfirmations: 12
        }
      ]
    },
    dealDetails: {
      dealType: "STANDARD",
      title: "",
      description: "",
      timeline: "30 days",
      stages: DEFAULT_DEAL_STAGES,
      requiredDocuments: [],
      terms: {
        contractTerms: "",
        paymentSchedule: "",
        cancellationTerms: "",
        disputeResolution: "",
        additionalClauses: [],
      },
    },
  });

  const handleTransactionTypeChange = (value: TransactionType) => {
    setFormData((prev) => ({
      ...prev,
      transactionType: value,
    }));
  };

  const handleTokenChange = (value: string) => {
    const token = TOKENS[value as keyof typeof TOKENS];
    console.log("Selected token:", token);

    setFormData(prev => ({
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
                placeholder="Describe your service..."
                value={formData.servicesDetails.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    servicesDetails: {
                      ...prev.servicesDetails,
                      description: e.target.value,
                    },
                  }))
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Payment Terms</Label>
              <Select
                value={formData.servicesDetails.terms.paymentTerms}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    servicesDetails: {
                      ...prev.servicesDetails,
                      terms: {
                        ...prev.servicesDetails.terms,
                        paymentTerms: value,
                      },
                    },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full payment upfront">
                    Full payment upfront
                  </SelectItem>
                  <SelectItem value="50% upfront, 50% on completion">
                    50% upfront, 50% on completion
                  </SelectItem>
                  <SelectItem value="Payment on completion">
                    Payment on completion
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Service Proof Requirements</Label>
              <Textarea
                placeholder="Describe the proof required for service completion..."
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

            <div className="grid gap-2">
              <Label htmlFor="proofFiles">Required Proof Files</Label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      document.getElementById("proofFiles")?.click()
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </Button>
                  <Input
                    id="proofFiles"
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setFormData((prev) => ({
                        ...prev,
                        serviceProof: {
                          ...prev.serviceProof,
                          proofFiles: [
                            ...prev.serviceProof.proofFiles,
                            ...files.map((file) => file.name),
                          ],
                        },
                      }));
                    }}
                  />
                </div>
                {formData.serviceProof.proofFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.serviceProof.proofFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-secondary p-2 rounded-md"
                      >
                        <span className="text-sm">{file}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-1"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              serviceProof: {
                                ...prev.serviceProof,
                                proofFiles: prev.serviceProof.proofFiles.filter(
                                  (_, i) => i !== index
                                ),
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
                <p className="text-xs text-muted-foreground">
                  Accepted file types: Images, PDF, DOC, DOCX
                </p>
              </div>
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
          value={formData.dealDetails?.dealType}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              dealDetails: {
                ...prev.dealDetails!,
                dealType: e.target.value,
              },
            }))
          }
          placeholder="e.g., Business Acquisition, Real Estate, Joint Venture"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label>Deal Title</Label>
        <Input
          value={formData.dealDetails?.title}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              dealDetails: {
                ...prev.dealDetails!,
                title: e.target.value,
              },
            }))
          }
          placeholder="Enter deal title"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label>Description</Label>
        <Textarea
          value={formData.dealDetails?.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              dealDetails: {
                ...prev.dealDetails!,
                description: e.target.value,
              },
            }))
          }
          placeholder="Describe the deal details"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label>Timeline</Label>
        <Input
          value={formData.dealDetails?.timeline}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              dealDetails: {
                ...prev.dealDetails!,
                timeline: e.target.value,
              },
            }))
          }
          placeholder="Expected timeline for deal completion"
          required
        />
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
                  ...prev.dealDetails!,
                  stages: [
                    ...prev.dealDetails!.stages,
                    {
                      name: `Stage ${prev.dealDetails!.stages.length + 1}`,
                      paymentPercentage: 0,
                      requirements: ["Enter requirement"],
                      timelineInDays: 30,
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
          {formData.dealDetails?.stages.map((stage, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Stage {index + 1}</Label>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 text-red-500 hover:text-red-700"
                      onClick={() => {
                        const newStages = formData.dealDetails!.stages.filter(
                          (_, i) => i !== index
                        );
                        setFormData((prev) => ({
                          ...prev,
                          dealDetails: {
                            ...prev.dealDetails!,
                            stages: newStages,
                          },
                        }));
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <Input
                  value={stage.name}
                  onChange={(e) => {
                    const newStages = [...formData.dealDetails!.stages];
                    newStages[index] = { ...stage, name: e.target.value };
                    setFormData((prev) => ({
                      ...prev,
                      dealDetails: {
                        ...prev.dealDetails!,
                        stages: newStages,
                      },
                    }));
                  }}
                  placeholder="Enter stage name"
                />
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={stage.paymentPercentage}
                    onChange={(e) => {
                      const newStages = [...formData.dealDetails!.stages];
                      newStages[index] = {
                        ...stage,
                        paymentPercentage: Number(e.target.value),
                      };
                      setFormData((prev) => ({
                        ...prev,
                        dealDetails: {
                          ...prev.dealDetails!,
                          stages: newStages,
                        },
                      }));
                    }}
                    placeholder="Enter payment percentage"
                    min="0"
                    max="100"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <Textarea
                  value={stage.requirements.join("\n")}
                  onChange={(e) => {
                    const newStages = [...formData.dealDetails!.stages];
                    newStages[index] = {
                      ...stage,
                      requirements: e.target.value
                        .split("\n")
                        .filter((r) => r.trim()),
                    };
                    setFormData((prev) => ({
                      ...prev,
                      dealDetails: {
                        ...prev.dealDetails!,
                        stages: newStages,
                      },
                    }));
                  }}
                  placeholder="Enter requirements (one per line)"
                  className="min-h-[100px]"
                />
              </div>
            </Card>
          ))}
        </div>
        {formData.dealDetails?.stages &&
          formData.dealDetails.stages.length > 0 && (
            <div className="text-sm text-muted-foreground mt-2">
              Total percentage:{" "}
              {formData.dealDetails.stages.reduce(
                (sum, stage) => sum + stage.paymentPercentage,
                0
              )}
              %
            </div>
          )}
      </div>

      <div className="grid gap-2">
        <Label>Deal Terms</Label>
        <div className="space-y-4">
          <Textarea
            value={formData.dealDetails?.terms.contractTerms}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dealDetails: {
                  ...prev.dealDetails!,
                  terms: {
                    ...prev.dealDetails!.terms,
                    contractTerms: e.target.value,
                  },
                },
              }))
            }
            placeholder="Contract terms"
            required
          />
          <Textarea
            value={formData.dealDetails?.terms.paymentSchedule}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dealDetails: {
                  ...prev.dealDetails!,
                  terms: {
                    ...prev.dealDetails!.terms,
                    paymentSchedule: e.target.value,
                  },
                },
              }))
            }
            placeholder="Payment schedule"
            required
          />
          <Textarea
            value={formData.dealDetails?.terms.cancellationTerms}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dealDetails: {
                  ...prev.dealDetails!,
                  terms: {
                    ...prev.dealDetails!.terms,
                    cancellationTerms: e.target.value,
                  },
                },
              }))
            }
            placeholder="Cancellation terms"
            required
          />
          <Textarea
            value={formData.dealDetails?.terms.disputeResolution}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dealDetails: {
                  ...prev.dealDetails!,
                  terms: {
                    ...prev.dealDetails!.terms,
                    disputeResolution: e.target.value,
                  },
                },
              }))
            }
            placeholder="Dispute resolution process"
            required
          />
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
            methodId: "card_1",
            type: "CARD",
            isDefault: false,
            details: {
              supportedCards: ["visa", "mastercard"],
            },
          },
          {
            methodId: "bank_1",
            type: "BANK_TRANSFER",
            isDefault: true,
            details: {
              supportedBanks: ["all"],
            },
          },
          {
            methodId: "crypto_1",
            type: "CRYPTOCURRENCY",
            isDefault: false,
            details: {
              supportedTokens: ["BTC", "ETH", "USDT"],
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
              requiredConfirmations: formData.cryptocurrencyDetails.requiredConfirmations,
              acceptedTokens: formData.cryptocurrencyDetails.acceptedTokens,
              networkOptions: formData.cryptocurrencyDetails.networkOptions
            },
          } as CreatePaymentLinkDto;
          break;

        case TransactionType.SERVICES:
          if (!formData.servicesDetails.description) {
            toast.error("Please enter service details");
            return;
          }

          finalDto = {
            ...baseDto,
            servicesDetails: {
              serviceName: formData.name,
              duration: 0,
              deliveryMethod: "REMOTE",
              milestones: [],
            },
          } as CreatePaymentLinkDto;
          break;

        case TransactionType.DEALS:
          if (formData.dealDetails.stages.length === 0) {
            toast.error("At least one deal stage is required");
            return;
          }

          const totalPercentage = formData.dealDetails.stages.reduce(
            (sum, stage) => sum + stage.paymentPercentage,
            0
          );

          if (totalPercentage !== 100) {
            toast.error("Total payment percentage must equal 100%");
            return;
          }

          if (
            !formData.dealDetails.title ||
            !formData.dealDetails.description
          ) {
            toast.error("Please fill in all required deal details");
            return;
          }

          finalDto = {
            ...baseDto,
            dealDetails: {
              dealType: formData.dealDetails.dealType || "STANDARD",
              title: formData.dealDetails.title.trim(),
              description: formData.dealDetails.description.trim(),
              timeline: formData.dealDetails.timeline,
              stages: formData.dealDetails.stages.map((stage) => ({
                name: stage.name.trim(),
                paymentPercentage: stage.paymentPercentage,
                requirements: stage.requirements.filter((req) => req.trim()),
                timelineInDays: stage.timelineInDays,
                requiredDocuments: stage.requiredDocuments.filter((doc) =>
                  doc.trim()
                ),
              })),
              requireAllPartyApproval: true,
              stageTransitionDelay: 24,
            },
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
