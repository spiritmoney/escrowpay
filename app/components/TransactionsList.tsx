import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/app/components/EmptyState";
import { Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "@/app/dashboard/api";
import { TransactionStatus, Currency } from "@/app/dashboard/api";

// Define the Transaction type
interface Transaction {
  id: string;
  createdAt: string;
  amount: number;
  currency: Currency;
  status: TransactionStatus;
  customerId: string;
}

// Add a hook to fetch transactions
const useTransactions = () => {
  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      try {
        const transactions = await fetchWithAuth<Transaction[]>("/transactions")
          .catch(error => {
            if (error?.message === "No transactions found") return [];
            throw error;
          });
        return transactions || [];
      } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
      }
    },
  });
};

const TransactionsList: React.FC = () => {
  const { data: transactions, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!transactions?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <EmptyState
            icon={Activity}
            title="No transactions yet"
            description="Your recent transactions will appear here."
            compact
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.customerId}</TableCell>
                <TableCell>
                  {transaction.currency} {transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.status === TransactionStatus.COMPLETED
                        ? "secondary"
                        : transaction.status === TransactionStatus.PENDING
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {transaction.status.toLowerCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionsList;
