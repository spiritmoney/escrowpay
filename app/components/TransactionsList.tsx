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

const transactions = [
  {
    id: 1,
    date: "2023-06-01",
    amount: 100.0,
    status: "completed",
    customer: "John Doe",
  },
  {
    id: 2,
    date: "2023-06-02",
    amount: 75.5,
    status: "pending",
    customer: "Jane Smith",
  },
  {
    id: 3,
    date: "2023-06-03",
    amount: 200.0,
    status: "completed",
    customer: "Bob Johnson",
  },
  {
    id: 4,
    date: "2023-06-04",
    amount: 50.0,
    status: "failed",
    customer: "Alice Brown",
  },
  {
    id: 5,
    date: "2023-06-05",
    amount: 150.0,
    status: "completed",
    customer: "Charlie Wilson",
  },
];

const TransactionsList: React.FC = () => {
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
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.status === "completed"
                        ? "secondary"
                        : transaction.status === "pending"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {transaction.status}
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
