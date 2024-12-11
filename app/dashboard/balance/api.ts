// First, let's create an API client file
import { useMutation, useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:10000";

// Types
interface Balances {
  fiat: {
    NGN: number;
    USD: number;
    EUR: number;
    NGN_change: number;
    USD_change: number;
    EUR_change: number;
  };
  crypto: {
    ESP: {
      amount: number;
      usdValue: number;
    };
    ESP_change: number;
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
      return response.json();
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
