import { useMutation, useQuery } from "@tanstack/react-query";

const API_URL = "https://escrow-backend-xnwx.onrender.com";
// const API_URL = "http://localhost:10000";

// Simple Payment Link API (aligned with integration document)
export interface PaymentLink {
  id: string;
  name: string;
  amount: number;
  currency: string;
  url: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

export interface CreatePaymentLinkDto {
  name: string;
  amount: number;
  currency: "USD" | "GBP" | "EUR" | "NGN" | "USDC" | "USDT" | "ESPEES";
}

export interface InitializePaymentDto {
  customerEmail: string;
  customerName: string;
  paymentMethodToken?: string;
  walletAddress?: string;
}

export interface PaymentConfirmationDto {
  transactionId: string;
  paymentIntentId?: string; // For card payments
  txHash?: string; // For crypto payments
  reference: string;
}

export interface PublicPaymentLink {
  id: string;
  name: string;
  amount: number;
  currency: string;
  status: "ACTIVE" | "INACTIVE";
  paymentMethods: {
    card: boolean;
    crypto: boolean;
  };
  createdBy: {
    name: string;
    email: string;
  };
  createdAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  paymentMethod: "CARD" | "CRYPTO";
  customerEmail: string;
  customerName: string;
  paymentLink: {
    id: string;
    name: string;
  };
  createdAt: string;
  completedAt?: string;
}

// Payment Link Management
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
  return useMutation<
    { message: string; link: PaymentLink },
    Error,
    CreatePaymentLinkDto
  >({
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

export const useGetPublicPaymentLink = (linkId: string) => {
  return useQuery<PublicPaymentLink>({
    queryKey: ["public-payment-link", linkId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/payment-links/${linkId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch payment link");
      }
      return response.json();
    },
    enabled: !!linkId,
  });
};

export const useUpdatePaymentLink = () => {
  return useMutation<
    PaymentLink,
    Error,
    { id: string; data: Partial<CreatePaymentLinkDto> }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await fetch(`${API_URL}/payment-links/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to update payment link"
        );
      }

      return responseData;
    },
  });
};

export const useDeletePaymentLink = () => {
  return useMutation<{ message: string }, Error, string>({
    mutationFn: async (linkId: string) => {
      const response = await fetch(`${API_URL}/payment-links/${linkId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to delete payment link"
        );
      }

      return responseData;
    },
  });
};

// Payment Processing
export const useInitializePayment = () => {
  return useMutation<
    { message: string; paymentLink: PaymentLink; transactionId: string },
    Error,
    { linkId: string; data: InitializePaymentDto }
  >({
    mutationFn: async ({ linkId, data }) => {
      const response = await fetch(
        `${API_URL}/payment-links/${linkId}/initialize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to initialize payment");
      }

      return responseData;
    },
  });
};

export const useConfirmPayment = () => {
  return useMutation<
    { message: string; transaction: Transaction },
    Error,
    { linkId: string; data: PaymentConfirmationDto }
  >({
    mutationFn: async ({ linkId, data }) => {
      const response = await fetch(
        `${API_URL}/payment-links/${linkId}/confirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to confirm payment");
      }

      return responseData;
    },
  });
};

export const useGetTransactionDetails = (transactionId: string) => {
  return useQuery<Transaction>({
    queryKey: ["transaction", transactionId],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/payment-links/transactions/${transactionId}`
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to fetch transaction details"
        );
      }

      return responseData;
    },
    enabled: !!transactionId,
  });
};
