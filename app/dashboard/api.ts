import { useQuery } from "@tanstack/react-query";

const API_URL = "https://espeespay-backend.onrender.com";

// Add proper enums
export enum TransactionType {
  PAYMENT = "PAYMENT",
  TRANSFER = "TRANSFER",
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
  SENT = "SENT",
  RECEIVED = "RECEIVED",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum Currency {
  NGN = "NGN",
  USD = "USD",
  EUR = "EUR",
  ESP = "ESP",
}

// Define interfaces with proper types
interface PaymentLink {
  id: string;
  name: string;
  url: string;
  type: "BUYING" | "SELLING";
  transactionType: string;
  defaultAmount: number;
  defaultCurrency: Currency;
  description?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

interface Transaction {
  id: string;
  amount: number;
  currency: Currency;
  status: TransactionStatus;
  type: TransactionType;
  createdAt: string;
  customerId: string;
}

interface TransactionQueryParams {
  type?: string;
  status?: string;
  search?: string;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

interface DashboardStats {
  totalBalance: {
    amount: number;
    change: number;
  };
  activePaymentLinks: {
    count: number;
    newCount: number;
  };
  totalTransactions: {
    count: number;
    change: number;
  };
  activeCustomers: {
    count: number;
    newCount: number;
  };
}

interface RecentActivity {
  desc: string;
  time: string;
  amount?: string;
  status?: string;
  name?: string;
  type: TransactionType;
  timestamp: string;
}

interface RevenueData {
  name: string;
  revenue: number;
}

// Add this type for revenue analytics
interface RevenueStats {
  monthlyGrowth: number;
  successRate: number;
  data: RevenueData[];
}

// Helper function to format relative time
export const getRelativeTimeString = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
};

// Helper function to fetch with auth
export const fetchWithAuth = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    // Handle 404 "Not Found" errors specially
    if (response.status === 404) {
      if (endpoint.includes('payment-links')) {
        return [] as T;
      }
      if (endpoint.includes('transactions')) {
        return [] as T;
      }
      if (endpoint.includes('balance/recent-activity')) {
        return [] as T;
      }
    }
    throw new Error(error.message || "API request failed");
  }

  const data = await response.json();
  return (data.data || data) as T;
};

// Add this interface for the balances response
interface BalanceResponse {
  fiat?: {
    USD?: number;
    USD_change?: number;
    [key: string]: number | undefined;
  };
}

// Fetch dashboard statistics
export const useDashboardStats = () => {
  const { data: balances } = useQuery<BalanceResponse>({
    queryKey: ["balances"],
    queryFn: () => fetchWithAuth("/balance"),
  });

  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      try {
        // Fetch payment links and transactions with proper error handling
        const [paymentLinks, transactions] = await Promise.all([
          fetchWithAuth<PaymentLink[]>("/payment-links").catch(() => []),
          fetchWithAuth<Transaction[]>("/transactions").catch((error) => {
            if (error?.message === "No transactions found") return [];
            throw error;
          }),
        ]);

        // Get current and previous balance values with safe defaults
        const currentBalance = Number(balances?.fiat?.USD) || 0;
        const previousBalance = Number(balances?.fiat?.USD_change) || 0;
        const balanceChange =
          previousBalance > 0
            ? ((currentBalance - previousBalance) / previousBalance) * 100
            : 0;

        // Ensure we have arrays to work with
        const paymentLinksArray = paymentLinks || [];
        const transactionsArray = transactions || [];

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        // Calculate stats with empty state handling
        const recentTransactions = transactionsArray.filter(
          (tx) => new Date(tx.createdAt) > oneWeekAgo
        );
        const totalCount = transactionsArray.length;
        const recentCount = recentTransactions.length;
        const change = totalCount > 0 ? ((recentCount / totalCount) * 100) - 100 : 0;

        // Calculate customer stats from successful transactions
        const uniqueCustomers = new Set(
          transactionsArray
            .filter(tx => tx.status === TransactionStatus.COMPLETED)
            .map(tx => tx.customerId)
        );

        const recentCustomers = new Set(
          transactionsArray
            .filter(tx => 
              tx.status === TransactionStatus.COMPLETED && 
              new Date(tx.createdAt) > oneMonthAgo
            )
            .map(tx => tx.customerId)
        );

        return {
          totalBalance: {
            amount: currentBalance,
            change: balanceChange,
          },
          activePaymentLinks: {
            count: paymentLinksArray.filter(link => link.status === "ACTIVE").length,
            newCount: paymentLinksArray.filter(link => new Date(link.createdAt) > oneWeekAgo).length,
          },
          totalTransactions: {
            count: totalCount,
            change,
          },
          activeCustomers: {
            count: uniqueCustomers.size,
            newCount: recentCustomers.size,
          },
        };
      } catch (error) {
        // Return empty state for all errors
        return {
          totalBalance: {
            amount: Number(balances?.fiat?.USD) || 0,
            change: 0,
          },
          activePaymentLinks: {
            count: 0,
            newCount: 0,
          },
          totalTransactions: {
            count: 0,
            change: 0,
          },
          activeCustomers: {
            count: 0,
            newCount: 0,
          },
        };
      }
    },
  });
};

// Fetch recent activity
export const useRecentActivity = () => {
  return useQuery<RecentActivity[]>({
    queryKey: ["recentActivity"],
    queryFn: async () => {
      const activity = await fetchWithAuth<{
        type: TransactionType;
        timestamp: string;
        amount: string;
        currency: string;
      }[]>("/balance/recent-activity");

      return activity.map((item) => ({
        desc: `${item.type === TransactionType.RECEIVED ? "Received" : "Sent"} Payment`,
        time: getRelativeTimeString(item.timestamp),
        amount: `${item.currency} ${item.amount}${item.type === TransactionType.SENT ? '-' : '+'}`,
        type: item.type,
        timestamp: item.timestamp,
      }));
    },
  });
};

// Update useRevenueAnalytics to handle empty states
export const useRevenueAnalytics = () => {
  return useQuery<RevenueStats>({
    queryKey: ["revenueAnalytics"],
    queryFn: async () => {
      try {
        const transactions = await fetchWithAuth<Transaction[]>("/transactions")
          .catch(error => {
            if (error?.message === "No transactions found") return [];
            throw error;
          });

        // Return default stats if no transactions
        if (!transactions?.length) {
          return getDefaultRevenueStats();
        }

        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const recentTransactions =
          transactions?.filter(
            (tx: Transaction) => new Date(tx.createdAt) >= sixMonthsAgo
          ) || [];

        if (!recentTransactions.length) {
          return getDefaultRevenueStats();
        }

        const monthlyData = recentTransactions.reduce(
          (acc: Record<string, number>, tx: Transaction) => {
            const month = new Date(tx.createdAt).toLocaleString("default", {
              month: "short",
            });
            acc[month] = (acc[month] || 0) + tx.amount;
            return acc;
          },
          {}
        );

        const monthlyValues = Object.values(monthlyData);
        const currentMonth = monthlyValues[monthlyValues.length - 1] || 0;
        const lastMonth = monthlyValues[monthlyValues.length - 2] || 0;
        const monthlyGrowth =
          lastMonth > 0 ? ((currentMonth - lastMonth) / lastMonth) * 100 : 0;

        const successfulTx = recentTransactions.filter(
          (tx) => tx.status === TransactionStatus.COMPLETED
        ).length;
        const successRate =
          recentTransactions.length > 0
            ? (successfulTx / recentTransactions.length) * 100
            : 0;

        return {
          monthlyGrowth,
          successRate,
          data: Object.entries(monthlyData).map(([name, revenue]) => ({
            name,
            revenue,
          })),
        };
      } catch (error) {
        if ((error as Error)?.message === "No transactions found") {
          return getDefaultRevenueStats();
        }
        throw error;
      }
    },
  });
};

// Helper function for default revenue stats
const getDefaultRevenueStats = (): RevenueStats => ({
  monthlyGrowth: 0,
  successRate: 0,
  data: [
    { name: "Jan", revenue: 0 },
    { name: "Feb", revenue: 0 },
    { name: "Mar", revenue: 0 },
    { name: "Apr", revenue: 0 },
    { name: "May", revenue: 0 },
    { name: "Jun", revenue: 0 },
  ],
});

// Fetch recent payment links
export const useRecentPaymentLinks = () => {
  return useQuery<PaymentLink[]>({
    queryKey: ["recentPaymentLinks"],
    queryFn: async () => {
      try {
        const links = await fetchWithAuth<PaymentLink[]>("/payment-links")
          .catch(error => {
            // Return empty array for any error
            console.log('Payment links fetch error:', error);
            return [];
          });

        // Handle null/undefined case
        if (!links) return [];

        // Filter active links and take first 3
        return links
          .filter(link => link.status === "ACTIVE")
          .slice(0, 3);
      } catch (error) {
        // Log error and return empty array
        console.log('Payment links error:', error);
        return [];
      }
    },
  });
};
