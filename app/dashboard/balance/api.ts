// First, let's create an API client file
import { useMutation, useQuery } from "@tanstack/react-query";

const API_URL = "https://escrow-backend-xnwx.onrender.com";

// Types - Updated to match actual API response
interface BalanceApiResponse {
  ngn: number;
  usd: number;
  eur: number;
  gbp: number;
  usdc: number;
  usdt: number;
  espees: number;
}

// Internal interface for the component
interface Balances {
  fiat?: {
    NGN?: number;
    USD?: number;
    EUR?: number;
    GBP?: number;
    NGN_change?: number;
    USD_change?: number;
    EUR_change?: number;
    GBP_change?: number;
  };
  crypto?: {
    ESP?: {
      amount?: number;
      usdValue?: number;
    };
    USDC?: {
      amount?: number;
      usdValue?: number;
    };
    USDT?: {
      amount?: number;
      usdValue?: number;
    };
    ESP_change?: number;
    USDC_change?: number;
    USDT_change?: number;
  };
}

interface SendMoneyDto {
  recipient: string;
  amount: number;
  assetType: string;
  note?: string;
}

interface RequestPaymentDto {
  amount: number;
  currency: string;
  payerEmail: string;
  description?: string;
}

interface ConvertCurrencyDto {
  from: string;
  to: string;
  amount: number;
}

interface RecentActivity {
  desc: string;
  time: string;
  amount: string;
}

// Helper function to get headers
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

// API functions
export const useBalances = () => {
  return useQuery<Balances>({
    queryKey: ["balances"],
    queryFn: async (): Promise<Balances> => {
      const response = await fetch(`${API_URL}/balance`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch balances");
      const apiData: BalanceApiResponse = await response.json();

      // Transform API response to expected format
      return {
        fiat: {
          NGN: apiData.ngn || 0,
          USD: apiData.usd || 0,
          EUR: apiData.eur || 0,
          GBP: apiData.gbp || 0,
          NGN_change: 0, // API doesn't provide change data
          USD_change: 0,
          EUR_change: 0,
          GBP_change: 0,
        },
        crypto: {
          ESP: {
            amount: apiData.espees || 0,
            usdValue: apiData.espees || 0, // Assuming 1:1 for now
          },
          USDC: {
            amount: apiData.usdc || 0,
            usdValue: apiData.usdc || 0,
          },
          USDT: {
            amount: apiData.usdt || 0,
            usdValue: apiData.usdt || 0,
          },
          ESP_change: 0, // API doesn't provide change data
          USDC_change: 0,
          USDT_change: 0,
        },
      };
    },
  });
};

export const useSendMoney = () => {
  return useMutation({
    mutationFn: async (data: SendMoneyDto) => {
      const response = await fetch(`${API_URL}/balance/send`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to send money");
      return response.json();
    },
  });
};

export const useRequestPayment = () => {
  return useMutation({
    mutationFn: async (data: RequestPaymentDto) => {
      const response = await fetch(`${API_URL}/balance/request`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to request payment");
      return response.json();
    },
  });
};

export const useConvertCurrency = () => {
  return useMutation({
    mutationFn: async (data: ConvertCurrencyDto) => {
      const response = await fetch(`${API_URL}/balance/convert`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to convert currency");
      return response.json();
    },
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ["recentActivity"],
    queryFn: async (): Promise<RecentActivity[]> => {
      const response = await fetch(`${API_URL}/balance/recent-activity`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch recent activity");
      return response.json();
    },
  });
};
