import { useMutation, useQuery } from "@tanstack/react-query";

const API_URL = "https://api.paylinc.org";
// const API_URL = "http://localhost:10000";

export enum PaymentLinkType {
  BUYING = "BUYING",
  SELLING = "SELLING",
}

export enum TransactionType {
  CRYPTOCURRENCY = "CRYPTOCURRENCY",
  SERVICES = "SERVICES",
  DEALS = "DEALS",
}

export enum VerificationMethod {
  BLOCKCHAIN_CONFIRMATION = "BLOCKCHAIN_CONFIRMATION",
  SELLER_PROOF_SUBMISSION = "SELLER_PROOF_SUBMISSION",
  BUYER_CONFIRMATION = "BUYER_CONFIRMATION",
  THIRD_PARTY_ARBITRATION = "THIRD_PARTY_ARBITRATION",
  ADMIN_VERIFICATION = "ADMIN_VERIFICATION",
  AUTOMATED_SERVICE_CHECK = "AUTOMATED_SERVICE_CHECK",
}

export enum PaymentMethodType {
  CARD = "CARD",
  BANK_TRANSFER = "BANK_TRANSFER",
  CRYPTOCURRENCY = "CRYPTOCURRENCY",
}

export interface PaymentLink {
  id: string;
  name: string;
  url: string;
  type: PaymentLinkType;
  transactionType: TransactionType;
  defaultAmount: number;
  defaultCurrency: string;
  description?: string;
  status: "ACTIVE" | "INACTIVE";
  blockchainStatus?: string;
  verificationMethod?: VerificationMethod;
  createdAt: string;
}

export interface PhysicalGoodsDetails {
  productName: string;
  condition: "NEW" | "USED" | "REFURBISHED";
  shippingMethods: string[];
  estimatedDeliveryDays: number;
  productImages: string[];
}

export interface DigitalGoodsDetails {
  productName: string;
  fileFormat: string;
  fileSize: number;
  previewUrl?: string;
  downloadLimit: number;
}

export interface ServiceDetails {
  description: string;
  deliveryTimeline: string;
  terms: {
    contractTerms: string;
    paymentSchedule: string;
    cancellationTerms: string;
    disputeResolution: string;
    additionalClauses: string[];
  };
}

export interface CryptocurrencyDetails {
  network: string;
  tokenSymbol: string;
  tokenAddress?: string;
  chainId?: number;
}

export interface DealStage {
  name: string;
  paymentPercentage: number;
  requirements: string[];
  timelineInDays: number;
  requiredDocuments: string[];
}

export interface DealDetails {
  dealType: string;
  title: string;
  description: string;
  timeline: string;
  stages: DealStage[];
  requireAllPartyApproval?: boolean;
  stageTransitionDelay?: number;
}

export interface PaymentMethod {
  methodId: string;
  type: PaymentMethodType;
  isDefault: boolean;
  details: {
    supportedCards?: string[];
    supportedBanks?: string[];
    supportedNetworks?: string[];
  };
}

export interface ServiceProof {
  description: string;
  proofFiles: string[];
  completionDate: string;
}

export interface CreatePaymentLinkDto {
  name: string;
  type?: PaymentLinkType;
  transactionType: TransactionType;
  defaultAmount: number;
  defaultCurrency: string;
  isAmountNegotiable?: boolean;
  verificationMethod?: VerificationMethod;
  paymentMethods: PaymentMethod[];
  serviceDetails?: ServiceDetails;
  serviceProof?: ServiceProof;
  cryptocurrencyDetails?: CryptocurrencyDetails;
  dealDetails?: DealDetails;
}

interface CreatePaymentLinkResponse {
  message: string;
  link: {
    id: string;
    name: string;
    url: string;
    type: PaymentLinkType;
    transactionType: TransactionType;
    defaultAmount: number;
    defaultCurrency: string;
    description?: string;
    status: "ACTIVE" | "INACTIVE";
  };
}

export interface InitiateTransactionDto {
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
}

interface TransactionResponse {
  message: string;
  transaction: {
    transactionId: string;
    escrowAddress: string;
    amount: number;
    status: string;
    expiresAt: string;
  };
}

export interface VerificationDetails {
  trackingNumber?: string;
  carrier?: string;
  proofOfShipment?: string[];
  deliveryPin?: string;
  downloadLink?: string;
  accessPin?: string;
  expiryTime?: Date;
  previewUrl?: string;
  milestones?: {
    name: string;
    description: string;
    amount: number;
    percentage: number;
    order: number;
  }[];
  transactionHash?: string;
}

interface VerificationResponse {
  status: string;
  escrowStatus?: string;
}

export const usePaymentLinks = () => {
  return useQuery({
    queryKey: ["payment-links"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/payment-links`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch payment links");
      }
      return response.json();
    },
  });
};

export const useCreatePaymentLink = () => {
  return useMutation<CreatePaymentLinkResponse, Error, CreatePaymentLinkDto>({
    mutationFn: async (data: CreatePaymentLinkDto) => {
      const response = await fetch(`${API_URL}/payment-links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to create payment link"
        );
      }

      return responseData;
    },
  });
};

export const useInitiateTransaction = () => {
  return useMutation<
    TransactionResponse,
    Error,
    { linkId: string; data: InitiateTransactionDto }
  >({
    mutationFn: async ({ linkId, data }) => {
      const response = await fetch(
        `${API_URL}/payment-links/${linkId}/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to initiate transaction");
      }
      return response.json();
    },
  });
};

export const useUpdatePaymentLinkSettings = () => {
  return useMutation({
    mutationFn: async (data: {
      defaultCurrency: string;
      defaultExpirationTime: number;
    }) => {
      const response = await fetch(`${API_URL}/payment-links/settings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update settings");
      return response.json();
    },
  });
};

export const useUpdateVerification = () => {
  return useMutation<
    VerificationResponse,
    Error,
    {
      transactionId: string;
      method: VerificationMethod;
      data: VerificationDetails;
    }
  >({
    mutationFn: async ({ transactionId, method, data }) => {
      const response = await fetch(
        `${API_URL}/payment-links/transactions/${transactionId}/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            method,
            verificationData: data,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Verification failed");
      }
      return response.json();
    },
  });
};

export const useConfirmDelivery = () => {
  return useMutation<
    { status: string },
    Error,
    {
      transactionId: string;
      isConfirmed: boolean;
    }
  >({
    mutationFn: async ({ transactionId, isConfirmed }) => {
      const response = await fetch(
        `${API_URL}/payment-links/transactions/${transactionId}/confirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ isConfirmed }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Confirmation failed");
      }
      return response.json();
    },
  });
};

export const useSubmitVerificationPin = () => {
  return useMutation<
    { status: string },
    Error,
    {
      transactionId: string;
      pin: string;
    }
  >({
    mutationFn: async ({ transactionId, pin }) => {
      const response = await fetch(
        `${API_URL}/payment-links/transactions/${transactionId}/verify-pin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ pin }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "PIN verification failed");
      }
      return response.json();
    },
  });
};

export const useSubmitTransactionHash = () => {
  return useMutation<
    { status: string },
    Error,
    {
      transactionId: string;
      hash: string;
    }
  >({
    mutationFn: async ({ transactionId, hash }) => {
      const response = await fetch(
        `${API_URL}/payment-links/transactions/${transactionId}/submit-hash`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ transactionHash: hash }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Hash submission failed");
      }
      return response.json();
    },
  });
};

export const useDisablePaymentLink = () => {
  return useMutation<{ message: string }, Error, string>({
    mutationFn: async (linkId: string) => {
      const response = await fetch(
        `${API_URL}/payment-links/${linkId}/disable`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to disable payment link");
      }

      return response.json();
    },
  });
};
