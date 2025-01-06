import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const API_URL = "https://escrow-backend-1xw6.onrender.com";

// Types
interface Usage {
  monthlyTransactions: number;
  monthlyTransactionLimit: number;
  apiCalls: number;
  apiCallLimit: number;
  monthlyPaymentLinks: number;
  paymentLinkLimit: number;
}

export type PaymentMethodType = 'CARD' | 'BANK';

interface PaymentMethodDetails {
  lastFour: string;
  expiryDate?: string;
  maskedNumber?: string;
  cardholderName?: string;
  bankName?: string;
  accountType?: string;
  accountHolderName?: string;
  bankCode?: string;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: PaymentMethodType;
  details: PaymentMethodDetails;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaymentMethodsResponse {
  paymentMethods: PaymentMethod[];
}

interface SubscriptionPlan {
  type: 'STARTER' | string;
  price: number;
  isActive: boolean;
  usage: Usage;
}

interface BillingHistoryPaymentMethod {
  type: 'CARD' | 'BANK';
  details: PaymentMethodDetails;
}

interface BillingHistoryItem {
  id: string;
  amount: number;
  currency: string;
  status: 'PAID' | 'FAILED' | 'PENDING';
  description: string;
  paymentMethod: BillingHistoryPaymentMethod;
  transactionReference: string;
  createdAt: string;
  paidAt?: string;
  failureReason?: string;
}

interface BillingHistoryResponse {
  billingHistory: BillingHistoryItem[];
  pagination: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

// Add this interface for the fetch options
interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

// API client functions
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!response.ok) throw new Error('API request failed');
  return response.json();
};

// Custom hooks
export const usePaymentMethods = () => {
  return useQuery<PaymentMethodsResponse>({
    queryKey: ['paymentMethods'],
    queryFn: () => fetchWithAuth('/billing/payment-methods'),
  });
};

export const useAddPaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { type: PaymentMethodType; payload: any }) => 
      fetchWithAuth(`/billing/payment-methods/${data.type.toLowerCase()}`, {
        method: 'POST',
        body: JSON.stringify(data.payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
    },
  });
};

export const useSetDefaultPaymentMethod = () => {
  return useMutation({
    mutationFn: (paymentMethodId: string) =>
      fetchWithAuth(`/billing/payment-methods/${paymentMethodId}/default`, {
        method: 'PUT',
      }),
  });
};

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (paymentMethodId: string) =>
      fetchWithAuth(`/billing/payment-methods/${paymentMethodId}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
    },
  });
};

export const useUpdateAutoPaymentSettings = () => {
  return useMutation({
    mutationFn: (settings: any) =>
      fetchWithAuth('/billing/auto-payment-settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      }),
  });
};

export const useBillingHistory = () => {
  return useQuery<BillingHistoryResponse>({
    queryKey: ['billingHistory'],
    queryFn: () => fetchWithAuth('/billing/history'),
    initialData: {
      billingHistory: [],
      pagination: {
        total: 0,
        page: 1,
        perPage: 10,
        totalPages: 0
      }
    }
  });
};

export const useCurrentPlan = () => {
  return useQuery<SubscriptionPlan>({
    queryKey: ['currentPlan'],
    queryFn: () => fetchWithAuth('/subscription/plan'),
  });
};

export const useUpgradePlan = () => {
  return useMutation({
    mutationFn: (planType: string) =>
      fetchWithAuth('/subscription/upgrade', {
        method: 'POST',
        body: JSON.stringify({ planType }),
      }),
  });
};
