import { useMutation, useQuery } from "@tanstack/react-query";

const API_URL = "https://escrow-backend-xnwx.onrender.com";
// const API_URL = "http://localhost:10000";

interface CryptoPaymentDetails {
  network: string;
  tokenSymbol: string;
}

interface CardPaymentDetails {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
}

interface BankTransferDetails {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: string;
}

export interface InitiateTransactionData {
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
    [key: string]: any;
  };
}

interface TransactionResponse {
  message: string;
  transaction: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    customer: {
      email: string;
      name: string;
    };
    createdAt: string;
    paymentMethod: string;
    expiresAt: string;
    paymentDetails: {
      checkoutUrl?: string;
      reference?: string;
      escrowAddress?: string;
      bankDetails?: {
        accountName: string;
        accountNumber: string;
        routingNumber: string;
        bankName: string;
        reference: string;
      };
      token?: string;
      network?: string;
      exchangeRate?: number;
      cryptoAmount?: number;
      requiredConfirmations?: number;
    };
  };
}

export const useInitiateTransaction = () => {
  return useMutation<
    TransactionResponse,
    Error,
    {
      linkId: string;
      data: InitiateTransactionData;
    }
  >({
    mutationFn: async ({ linkId, data }) => {
      const response = await fetch(
        `${API_URL}/payment-links/${linkId}/initiate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to initiate transaction");
      }

      const result = await response.json();
      if (!result?.transaction?.id) {
        throw new Error("Invalid transaction response");
      }

      return result;
    },
  });
};

interface TransactionDetails {
  transactionId: string;
  status: string;
  amount: number;
  currency: string;
  paymentDetails: {
    escrowAddress?: string;
    paymentMethod: string;
    expiresAt?: string;
    bankDetails?: {
      accountName: string;
      accountNumber: string;
      routingNumber: string;
      bankName: string;
      reference: string;
    };
    checkoutUrl?: string;
    token?: string;
    network?: string;
    exchangeRate?: number;
    cryptoAmount?: number;
    requiredConfirmations?: number;
  };
  customer?: {
    email: string;
    name: string;
  };
  timeline: Array<{
    status: string;
    timestamp: string;
    description: string;
  }>;
}

export const useGetTransactionDetails = (transactionId?: string) => {
  return useQuery<TransactionDetails>({
    queryKey: ["transaction", transactionId],
    queryFn: async () => {
      if (!transactionId) throw new Error("Transaction ID required");

      const response = await fetch(
        `${API_URL}/payment-links/transactions/${transactionId}`
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch transaction details");
      }

      return response.json();
    },
    enabled: !!transactionId,
  });
};

interface PaymentMethod {
  type: string;
  isDefault: boolean;
}

type PaymentMethodKey = "CARD" | "BANK_TRANSFER" | "CRYPTOCURRENCY";

interface PaymentLinkResponse {
  seller: {
    id: string;
    name: string;
    organisation?: string;
    email: string;
    wallet: null | {
      address: string;
      network: string;
      chainId: number;
    };
  };
  paymentLink: {
    id: string;
    name: string;
    amount: number;
    currency: string;
    status: "ACTIVE" | "INACTIVE";
    paymentMethods: {
      card: boolean;
      crypto: boolean;
    };
    createdAt: string;
    sandboxMode?: boolean;
  };
}

export const useGetPaymentLink = (linkId: string) => {
  return useQuery<PaymentLinkResponse, Error>({
    queryKey: ["paymentLink", linkId],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/payment-links/${linkId}/validate`
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Payment link not found");
      }
      const data = await response.json();

      return data;
    },
  });
};

export const useGetTransactionHistory = (linkId: string) => {
  return useQuery({
    queryKey: ["transactionHistory", linkId],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/payment-links/${linkId}/transactions`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transaction history");
      }

      return response.json();
    },
    enabled: !!linkId,
  });
};

export const useGetEscrowDetails = (linkId: string, transactionId?: string) => {
  return useQuery({
    queryKey: ["escrowDetails", linkId, transactionId],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/payment-links/${linkId}/escrow${
          transactionId ? `?transactionId=${transactionId}` : ""
        }`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch escrow details");
      }

      return response.json();
    },
    enabled: !!linkId,
  });
};
