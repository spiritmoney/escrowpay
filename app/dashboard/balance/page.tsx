"use client";

import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  Bitcoin, 
  DollarSign,
  Coins,
  FileText,
  Bell,
  Settings as LucideSettings,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import NotificationsModal from "../../../components/NotificationsModal";
import SettingsModal from "../../../components/SettingsModal";
import { useBalances, useSendMoney, useRequestPayment, useConvertCurrency, useRecentActivity } from "./api";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FiatBalance {
  NGN: number;
  USD: number;
  EUR: number;
  NGN_change: number;
  USD_change: number;
  EUR_change: number;
}

interface CryptoBalance {
  ESP: {
    amount: number;
    usdValue: number;
  };
  ESP_change: number;
}

interface Balances {
  fiat: FiatBalance;
  crypto: CryptoBalance;
}

const SendMoneyModal = () => {
  const sendMoney = useSendMoney();
  const [formData, setFormData] = useState({
    assetType: "FIAT",
    currency: "",
    recipientAddress: "",
    amount: 0,
    note: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        amount: formData.amount,
        assetType: formData.assetType,
        recipient: formData.recipientAddress,
        currency: formData.currency,
        note: formData.note
      };
      const response = await sendMoney.mutateAsync(payload);
      toast.success(response.message || "Money sent successfully");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to send money";
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <ArrowUpRight className="mr-2 h-4 w-4" /> Send Money/Crypto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4 md:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2 mb-4">
          <DialogTitle className="text-xl md:text-2xl">Send Money or Crypto</DialogTitle>
          <DialogDescription className="text-sm md:text-base">
            Enter the recipient and amount details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2 md:py-4">
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Asset Type</label>
            <Select 
              defaultValue="FIAT"
              onValueChange={(value) => setFormData(prev => ({ 
                ...prev, 
                assetType: value,
                currency: "" // Reset currency when asset type changes
              }))}
            >
              <SelectTrigger className="w-full h-10 md:h-11">
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FIAT">Fiat Currency</SelectItem>
                <SelectItem value="CRYPTO">Cryptocurrency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Currency</label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
              <SelectTrigger className="w-full h-10 md:h-11">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {formData.assetType === "FIAT" ? (
                  <>
                    <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="ESP">Espees (ESP)</SelectItem>
                    {/* Add other crypto options as needed */}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">
              {formData.assetType === "FIAT" ? "Recipient Email" : "Recipient Email or Wallet Address"}
            </label>
            <Input 
              value={formData.recipientAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, recipientAddress: e.target.value }))}
              placeholder={formData.assetType === "FIAT" 
                ? "Enter recipient email" 
                : "Enter recipient email or wallet address"
              }
              type={formData.assetType === "FIAT" ? "email" : "text"}
              className="h-10 md:h-11"
            />
            {formData.assetType === "CRYPTO" && (
              <p className="text-sm text-gray-500">
                You can enter either an email address or a valid wallet address
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Amount</label>
            <Input 
              type="number" 
              placeholder="0.00" 
              className="h-10 md:h-11"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Note (Optional)</label>
            <Input 
              placeholder="Add a note" 
              className="h-10 md:h-11"
              value={formData.note}
              onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
            />
          </div>
          <Button type="submit" className="w-full h-10 md:h-11 mt-2 bg-blue-600 hover:bg-blue-700 text-white">
            {sendMoney.isPending ? "Sending..." : "Send"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};


const RequestPaymentModal = () => {
  const requestPayment = useRequestPayment();
  const [formData, setFormData] = useState({
    currency: "",
    amount: 0,
    payerEmail: "",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await requestPayment.mutateAsync(formData);
      toast.success(response.message || "Payment request created successfully");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to create payment request";
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <ArrowDownLeft className="mr-2 h-4 w-4" /> Request Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4 md:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2 mb-4">
          <DialogTitle className="text-xl md:text-2xl">Request Payment</DialogTitle>
          <DialogDescription className="text-sm md:text-base">
            Create a payment request to share with others.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2 md:py-4">
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Currency</label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
              <SelectTrigger className="w-full h-10 md:h-11">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                <SelectItem value="ESP">Espees (ESP)</SelectItem>
                {/* <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                <SelectItem value="eth">Ethereum (ETH)</SelectItem> */}
                <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
                <SelectItem value="USD">US Dollar (USD)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Amount</label>
            <Input 
              type="number" 
              placeholder="0.00" 
              className="h-10 md:h-11"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Payer's Email</label>
            <Input 
              type="email" 
              placeholder="Enter email" 
              className="h-10 md:h-11"
              value={formData.payerEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, payerEmail: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Description</label>
            <Input 
              placeholder="What's this for?" 
              className="h-10 md:h-11"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <Button type="submit" className="w-full h-10 md:h-11 mt-2 bg-blue-600 hover:bg-blue-700 text-white">
            Create Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ConvertCurrencyModal = () => {
  const convertCurrency = useConvertCurrency();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: 0
  });
  const [conversionRate, setConversionRate] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await convertCurrency.mutateAsync(formData);
      toast.success(response.message || "Currency converted successfully");
    } catch (error: any) {
      const errorMessage = error.message || "Failed to convert currency or Insufficient balance for conversion";
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full border-blue-200 text-blue-600 hover:bg-blue-50" variant="outline">
          <Coins className="mr-2 h-4 w-4" /> Convert Currency
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4 md:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2 mb-4">
          <DialogTitle className="text-xl md:text-2xl">Convert Currency</DialogTitle>
          <DialogDescription className="text-sm md:text-base">
            Convert between different currencies and cryptocurrencies.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2 md:py-4">
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">From</label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, from: value }))}>
              <SelectTrigger className="w-full h-10 md:h-11">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                <SelectItem value="ESP">Espees (ESP)</SelectItem>
                {/* <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                <SelectItem value="eth">Ethereum (ETH)</SelectItem> */}
                <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
                <SelectItem value="USD">US Dollar (USD)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Amount</label>
            <Input 
              type="number" 
              placeholder="0.00" 
              className="h-10 md:h-11"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">To</label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, to: value }))}>
              <SelectTrigger className="w-full h-10 md:h-11">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                <SelectItem value="ESP">Espees (ESP)</SelectItem>
                {/* <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                <SelectItem value="eth">Ethereum (ETH)</SelectItem> */}
                <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
                <SelectItem value="USD">US Dollar (USD)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-2">
            {conversionRate && (
              <p className="text-sm md:text-base text-gray-500">
                Estimated rate: 1 {formData.from} ≈ {conversionRate} {formData.to}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full h-10 md:h-11 mt-2 bg-blue-600 hover:bg-blue-700 text-white">
            Convert
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const BalancePage: React.FC = () => {
  const { data: balances, isLoading: isBalancesLoading, error: balancesError } = useBalances();
  const { data: recentActivity, isLoading: isActivityLoading, error: activityError } = useRecentActivity();

  if (isBalancesLoading || isActivityLoading) return <LoadingSpinner />;

  if (balancesError || activityError) {
    return (
      <DashboardLayout>
        <div className="p-4 md:p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {balancesError ? "Failed to load balance information" : "Failed to load recent activity"}
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  if (!balances) {
    return (
      <DashboardLayout>
        <div className="p-4 md:p-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Data Available</AlertTitle>
            <AlertDescription>
              No balance information is currently available. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  const fiatBalances = [
    {
      name: "NGN",
      amount: `₦${balances.fiat.NGN.toLocaleString()}`,
      change: `${balances.fiat.NGN_change ? (balances.fiat.NGN_change >= 0 ? '+' : '') + balances.fiat.NGN_change : '0'}%`,
      icon: <Wallet className="h-4 w-4 text-blue-600" />
    },
    {
      name: "USD",
      amount: `$${balances.fiat.USD.toLocaleString()}`,
      change: `${balances.fiat.USD_change ? (balances.fiat.USD_change >= 0 ? '+' : '') + balances.fiat.USD_change : '0'}%`,
      icon: <Wallet className="h-4 w-4 text-blue-600" />
    },
    {
      name: "EUR",
      amount: `€${balances.fiat.EUR.toLocaleString()}`,
      change: `${balances.fiat.EUR_change ? (balances.fiat.EUR_change >= 0 ? '+' : '') + balances.fiat.EUR_change : '0'}%`,
      icon: <Wallet className="h-4 w-4 text-blue-600" />
    },
  ];

  const cryptoBalances = [
    {
      name: "Espees (ESP)",
      amount: `${balances.crypto.ESP.amount} ESP`,
      value: `$${balances.crypto.ESP.usdValue.toLocaleString()}`,
      change: `${balances.crypto.ESP_change ? (balances.crypto.ESP_change >= 0 ? '+' : '') + balances.crypto.ESP_change : '0'}%`,
      icon: <Coins className="h-4 w-4 text-blue-600" />
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Balance</h1>
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
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Fiat Balance Card */}
          <Card className="bg-white border-blue-100">
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-gray-900">Fiat Balance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-6">
                {fiatBalances.map((balance, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {balance.icon}
                      <div>
                        <p className="font-medium text-gray-900">{balance.name}</p>
                        <p className="text-2xl font-bold text-gray-900">{balance.amount}</p>
                      </div>
                    </div>
                    <p className="text-sm text-blue-600">{balance.change}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Crypto Balance Card */}
          <Card className="bg-white border-blue-100">
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <Bitcoin className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-gray-900">Crypto Balance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-6">
                {cryptoBalances.map((crypto, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {crypto.icon}
                      <div>
                        <p className="font-medium text-gray-900">{crypto.name}</p>
                        <p className="text-2xl font-bold text-gray-900">{crypto.amount}</p>
                        <p className="text-sm text-gray-600">≈ {crypto.value}</p>
                      </div>
                    </div>
                    <p className={`text-sm ${
                      crypto.change.startsWith('+') ? 'text-green-600' : 
                      crypto.change.startsWith('-') ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {crypto.change}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
          <Card className="bg-white border-blue-100">
            <CardHeader>
              <CardTitle className="text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SendMoneyModal />
              <RequestPaymentModal />
              <ConvertCurrencyModal />
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100">
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity && recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((tx, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">{tx.desc}</p>
                        <p className="text-sm text-gray-500">{tx.time}</p>
                      </div>
                      <div className="font-medium">{tx.amount}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <Alert className="bg-gray-50 border-gray-200">
                  <div className="flex items-center gap-x-2">
                    <AlertCircle className="h-4 w-4 text-gray-500" />
                    <AlertTitle className="text-gray-600">No Recent Activity</AlertTitle>
                  </div>
                  <AlertDescription className="text-gray-500 mt-2">
                    When you make transactions, they will appear here.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BalancePage; 