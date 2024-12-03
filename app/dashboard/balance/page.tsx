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
  Settings as LucideSettings
} from "lucide-react";
import Link from "next/link";
import NotificationsModal from "../../../components/NotificationsModal";
import SettingsModal from "../../../components/SettingsModal";

const cryptoBalances = [
  { 
    name: "Bitcoin (BTC)", 
    amount: "2.5 BTC", 
    value: "$87,534.23", 
    change: "+5.2%",
    icon: <Bitcoin className="h-4 w-4 text-blue-600" />
  },
  { 
    name: "Ethereum (ETH)", 
    amount: "15.8 ETH", 
    value: "$32,456.78", 
    change: "-2.1%",
    icon: <Coins className="h-4 w-4 text-blue-600" />
  },
  { 
    name: "USDT", 
    amount: "5000 USDT", 
    value: "$5,000.00", 
    change: "0%",
    icon: <DollarSign className="h-4 w-4 text-blue-600" />
  }
];

const fiatBalances = [
  {
    name: "USD",
    amount: "$12,345.67",
    change: "+2.5%",
    icon: <DollarSign className="h-4 w-4 text-blue-600" />
  },
  {
    name: "EUR",
    amount: "€8,234.50",
    change: "+1.8%",
    icon: <Wallet className="h-4 w-4 text-blue-600" />
  }
];

const SendMoneyModal = () => {
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
        <div className="grid gap-4 py-2 md:py-4">
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Asset Type</label>
            <Select>
              <SelectTrigger className="w-full h-10 md:h-11">
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                <SelectItem value="usd">US Dollar (USD)</SelectItem>
                <SelectItem value="eur">Euro (EUR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Recipient Address/Email</label>
            <Input 
              placeholder="Enter recipient" 
              className="h-10 md:h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Amount</label>
            <Input 
              type="number" 
              placeholder="0.00" 
              className="h-10 md:h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Note (Optional)</label>
            <Input 
              placeholder="Add a note" 
              className="h-10 md:h-11"
            />
          </div>
          <Button className="w-full h-10 md:h-11 mt-2 bg-blue-600 hover:bg-blue-700 text-white">
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const RequestPaymentModal = () => {
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
        <div className="grid gap-4 py-2 md:py-4">
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Currency</label>
            <Select>
              <SelectTrigger className="w-full h-10 md:h-11">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                <SelectItem value="usd">US Dollar (USD)</SelectItem>
                <SelectItem value="eur">Euro (EUR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Amount</label>
            <Input 
              type="number" 
              placeholder="0.00" 
              className="h-10 md:h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Payer's Email</label>
            <Input 
              type="email" 
              placeholder="Enter email" 
              className="h-10 md:h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Description</label>
            <Input 
              placeholder="What's this for?" 
              className="h-10 md:h-11"
            />
          </div>
          <Button className="w-full h-10 md:h-11 mt-2 bg-blue-600 hover:bg-blue-700 text-white">
            Create Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ConvertCurrencyModal = () => {
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
        <div className="grid gap-4 py-2 md:py-4">
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">From</label>
            <Select>
              <SelectTrigger className="w-full h-10 md:h-11">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                <SelectItem value="usd">US Dollar (USD)</SelectItem>
                <SelectItem value="eur">Euro (EUR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Amount</label>
            <Input 
              type="number" 
              placeholder="0.00" 
              className="h-10 md:h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">To</label>
            <Select>
              <SelectTrigger className="w-full h-10 md:h-11">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                <SelectItem value="usd">US Dollar (USD)</SelectItem>
                <SelectItem value="eur">Euro (EUR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-2">
            <p className="text-sm md:text-base text-gray-500">Estimated rate: 1 BTC ≈ $45,000</p>
          </div>
          <Button className="w-full h-10 md:h-11 mt-2 bg-blue-600 hover:bg-blue-700 text-white">
            Convert
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const BalancePage: React.FC = () => {
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
              <div className="space-y-4">
                {[
                  { desc: "Received BTC", time: "2 hours ago", amount: "0.05 BTC" },
                  { desc: "Sent USD", time: "5 hours ago", amount: "$123.45" },
                  { desc: "Received ETH", time: "1 day ago", amount: "2.5 ETH" },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{tx.desc}</p>
                      <p className="text-sm text-gray-500">{tx.time}</p>
                    </div>
                    <div className="font-medium">{tx.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BalancePage; 