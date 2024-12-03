"use client";

import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Plus, Settings, Edit, Link as LinkIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FileText, Bell, Settings as LucideSettings } from "lucide-react";
import NotificationsModal from "../../../components/NotificationsModal";
import SettingsModal from "../../../components/SettingsModal";

const CreateLinkModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create New Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4 md:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2 mb-4">
          <DialogTitle className="text-xl md:text-2xl">Create Payment Link</DialogTitle>
          <DialogDescription className="text-sm md:text-base">
            Create a new payment link for your customers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2 md:py-4">
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Link Name</label>
            <Input placeholder="e.g., Product Payment" className="h-10 md:h-11" />
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Amount</label>
            <Input type="number" placeholder="0.00" className="h-10 md:h-11" />
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Currency</label>
            <Select>
              <SelectTrigger className="h-10 md:h-11">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="ngn">NGN</SelectItem>
                {/* <SelectItem value="btc">BTC</SelectItem>
                <SelectItem value="eth">ETH</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="recurring" className="text-sm md:text-base font-medium">Recurring Payment</Label>
            <Switch id="recurring" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="expiry" className="text-sm md:text-base font-medium">Set Expiry</Label>
            <Switch id="expiry" />
          </div>
          <Button className="w-full h-10 md:h-11 mt-2 bg-blue-600 hover:bg-blue-700 text-white">
            Create Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EditLinkModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4 md:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2 mb-4">
          <DialogTitle className="text-xl md:text-2xl">Edit Payment Link</DialogTitle>
          <DialogDescription className="text-sm md:text-base">
            Modify your existing payment link.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2 md:py-4">
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Link Name</label>
            <Input defaultValue="Product Payment" className="h-10 md:h-11" />
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Amount</label>
            <Input type="number" defaultValue="99.99" className="h-10 md:h-11" />
          </div>
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Status</label>
            <Select defaultValue="active">
              <SelectTrigger className="h-10 md:h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="edit-recurring" className="text-sm md:text-base font-medium">Recurring Payment</Label>
            <Switch id="edit-recurring" defaultChecked />
          </div>
          <Button className="w-full h-10 md:h-11 mt-2 bg-blue-600 hover:bg-blue-700 text-white">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CopyLinkModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
          <Copy className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4 md:p-6">
        <DialogHeader className="space-y-2 mb-4">
          <DialogTitle className="text-xl md:text-2xl">Payment Link</DialogTitle>
          <DialogDescription className="text-sm md:text-base">
            Copy your payment link to share with customers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input 
              readOnly 
              value="https://escrow-pay.vercel.app/pay/link-1"
              className="h-10 md:h-11"
            />
            <Button 
              className="h-10 md:h-11 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigator.clipboard.writeText("https://escrow-pay.vercel.app/pay/link-1")}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Share via:</p>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50">
                Email
              </Button>
              <Button variant="outline" className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50">
                SMS
              </Button>
              <Button variant="outline" className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50">
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PaymentLinkPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Payment Links</h1>
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
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900">Active Payment Links</CardTitle>
              <CreateLinkModal />
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border border-blue-100 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">Payment Link #{i}</h3>
                    <p className="text-sm text-gray-500">
                      https://escrow-pay.vercel.app/pay/link-{i}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <CopyLinkModal />
                    <EditLinkModal />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-100">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-gray-900">Link Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Currency</label>
              <Select defaultValue="usd">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="ngn">NGN</SelectItem>
                  {/* <SelectItem value="btc">BTC</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Expiration Time (hours)</label>
              <Input type="number" defaultValue="24" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentLinkPage; 