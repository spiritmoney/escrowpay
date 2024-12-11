"use client";

import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Bell, Settings as LucideSettings } from "lucide-react";
import Link from "next/link";
import { FileText, FileX, AlertCircle, Loader2 } from "lucide-react";
import NotificationsModal from "../../../components/NotificationsModal";
import SettingsModal from "../../../components/SettingsModal";
import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from './api';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Transaction, 
  TransactionStatus, 
  TransactionQueryParams, 
  ApiError 
} from './types';
import LoadingSpinner from "@/app/components/LoadingSpinner";

const TransactionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<TransactionQueryParams>({});

  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['transactions', filters, searchQuery],
    queryFn: () => fetchTransactions({ ...filters, search: searchQuery }),
  });

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="h-32">
            <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
              <LoadingSpinner />
              <p>Loading transactions...</p>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
      const isApiError = (error: unknown): error is ApiError => {
        return (
          typeof error === 'object' &&
          error !== null &&
          'statusCode' in error &&
          'message' in error &&
          'timestamp' in error &&
          'path' in error
        );
      };

      const errorMessage = isApiError(error) 
        ? error.message 
        : 'An unexpected error occurred';

      return (
        <TableRow>
          <TableCell colSpan={6} className="h-32">
            <Alert variant="destructive" className="mx-auto max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
          </TableCell>
        </TableRow>
      );
    }

    if (!transactions?.length) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="h-32">
            <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
              <FileX className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-600">No transactions found</p>
              {searchQuery && (
                <p className="text-xs text-gray-400">
                  Try adjusting your search or filters
                </p>
              )}
            </div>
          </TableCell>
        </TableRow>
      );
    }

    return transactions.map((tx) => (
      <TableRow key={tx.id} className="border-blue-100">
        <TableCell className="text-gray-900">{tx.id}</TableCell>
        <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
        <TableCell>{tx.type}</TableCell>
        <TableCell>${tx.amount.toFixed(2)}</TableCell>
        <TableCell>
          <span className={getStatusBadgeClass(tx.status)}>
            {tx.status}
          </span>
        </TableCell>
        <TableCell>{tx.recipient}</TableCell>
      </TableRow>
    ));
  };

  const getStatusBadgeClass = (status: TransactionStatus) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case TransactionStatus.COMPLETED:
        return `${baseClasses} bg-green-100 text-green-800`;
      case TransactionStatus.PENDING:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case TransactionStatus.FAILED:
        return `${baseClasses} bg-red-100 text-red-800`;
      case TransactionStatus.CANCELLED:
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return baseClasses;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Transactions</h1>
          <div className="flex items-center space-x-2">
            <NotificationsModal />
            <SettingsModal />
            <Button
              variant="outline"
              className="h-10 border-blue-200 bg-white shadow-sm hover:bg-blue-50 px-3 md:px-4"
              asChild
            >
              <Link href="/api-docs" target="_blank" className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="hidden md:inline text-blue-600">Documentation</span>
              </Link>
            </Button>
          </div>
        </div>

        <Card className="bg-white border-blue-100">
          <CardHeader className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <CardTitle className="text-gray-900">Transaction History</CardTitle>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-blue-600" />
                  <Input 
                    placeholder="Search..." 
                    className="pl-8 w-full border-blue-200" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6 overflow-x-auto">
            <div className="min-w-[600px]">
              <Table>
                <TableHeader>
                  <TableRow className="border-blue-100">
                    <TableHead className="text-blue-600">Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recipient</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {renderTableContent()}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransactionsPage; 