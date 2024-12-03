"use client";

import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, AlertCircle, CreditCard, ArrowRight, Trash2, Plus, Sparkles, Zap, Shield, Building2, Building, Bell, Settings as LucideSettings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Link from "next/link";
import { FileText } from "lucide-react";
import NotificationsModal from "../../../components/NotificationsModal";
import SettingsModal from "../../../components/SettingsModal";
import banksData from '../../../banks.json'; // Adjust the path as necessary

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "Up to 100 transactions per month",
      "Basic API access",
      "Email support",
      "Basic analytics",
      "Custom checkout pages",
    ],
  },
  {
    name: "Pro",
    price: "$10",
    features: [
      "Up to 1,000 transactions per month",
      "Full API access",
      "Priority email and chat support",
      "Advanced analytics and reporting",
      "Custom checkout pages",
      "Webhook notifications",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited transactions",
      "Full API access",
      "Dedicated account manager",
      "24/7 phone, email, and chat support",
      "Custom integrations",
      "On-premise deployment options",
      "SLA guarantees",
      "Custom contracts",
    ],
  },
];

const UpgradeModal = ({ plan }: { plan: typeof plans[0] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          {plan.price === "Custom" ? "Contact Sales" : "Upgrade"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4 md:p-6">
        <DialogHeader className="space-y-2 mb-4">
          <DialogTitle className="text-xl md:text-2xl">Upgrade to {plan.name}</DialogTitle>
          <DialogDescription className="text-sm md:text-base">
            {plan.price === "Custom" 
              ? "Contact our sales team to get a custom quote for your business needs."
              : `Upgrade to ${plan.name} plan to unlock more features and higher limits.`
            }
          </DialogDescription>
        </DialogHeader>
        {plan.price !== "Custom" ? (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-gray-500">/month</span>
            </div>
            <div className="space-y-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <CreditCard className="mr-2 h-4 w-4" />
              Proceed to Payment
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Contact Sales Team
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const AddPaymentMethodModal = () => {
  const [paymentType, setPaymentType] = React.useState<'card' | 'bank'>('card');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Payment Method
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4 md:p-6">
        <DialogHeader className="space-y-2 mb-4">
          <DialogTitle className="text-xl md:text-2xl">Add Payment Method</DialogTitle>
          <DialogDescription className="text-sm md:text-base">
            Add a new payment method to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2 md:py-4">
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={paymentType === 'card' ? 'default' : 'outline'}
              className={`flex-1 ${paymentType === 'card' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}`}
              onClick={() => setPaymentType('card')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Card
            </Button>
            <Button
              type="button"
              variant={paymentType === 'bank' ? 'default' : 'outline'}
              className={`flex-1 ${paymentType === 'bank' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}`}
              onClick={() => setPaymentType('bank')}
            >
              <Building2 className="mr-2 h-4 w-4" />
              Bank Transfer
            </Button>
          </div>

          {paymentType === 'card' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm md:text-base font-medium">Card Number</label>
                <Input placeholder="1234 5678 9012 3456" className="h-10 md:h-11" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium">Expiry Date</label>
                  <Input placeholder="MM/YY" className="h-10 md:h-11" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium">CVC</label>
                  <Input type="password" maxLength={4} placeholder="123" className="h-10 md:h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm md:text-base font-medium">Cardholder Name</label>
                <Input placeholder="Name on card" className="h-10 md:h-11" />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm md:text-base font-medium">Bank Name</label>
                <Select>
                  <SelectTrigger className="h-10 md:h-11">
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banksData.banks.map((bank) => (
                      <SelectItem key={bank.code} value={bank.code}>
                        {bank.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm md:text-base font-medium">Account Holder Name</label>
                <Input placeholder="Full name on account" className="h-10 md:h-11" />
              </div>
              <div className="space-y-2">
                <label className="text-sm md:text-base font-medium">Account Number</label>
                <Input placeholder="Account number" className="h-10 md:h-11" />
              </div>
              <div className="space-y-2">
                <label className="text-sm md:text-base font-medium">Account Type</label>
                <Select>
                  <SelectTrigger className="h-10 md:h-11">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="flex items-center space-x-2 mt-2">
            <input type="checkbox" id="default" className="rounded border-gray-300" />
            <label htmlFor="default" className="text-sm text-gray-600">
              Set as default payment method
            </label>
          </div>
          <Button className="w-full h-10 md:h-11 mt-2 bg-blue-600 hover:bg-blue-700 text-white">
            {paymentType === 'card' ? 'Add Card' : 'Add Bank Account'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const currentPlanName = "Starter"; // Replace with dynamic value if needed

const PlanPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6 md:space-y-8 bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Subscription Plan</h1>
            <p className="text-gray-500">Manage your subscription and billing details</p>
          </div>
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

        {/* Current Plan Status */}
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 -mr-32 -mt-32" />
          <CardHeader className="p-6">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-gray-900">Current Plan</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Starter Plan</h3>
                <p className="text-sm text-gray-500 mt-1">Free</p>
              </div>
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                Active
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Monthly Transactions</span>
                  <span className="text-blue-600 font-medium">85/100</span>
                </div>
                <Progress value={85} className="h-2 bg-blue-100" indicatorClassName="bg-blue-600" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">API Calls</span>
                  <span className="text-blue-600 font-medium">450/500</span>
                </div>
                <Progress value={90} className="h-2 bg-blue-100" indicatorClassName="bg-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Approaching Limits</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    You're close to your monthly transaction limit. Consider upgrading to avoid any service interruptions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`bg-white border-blue-100 relative overflow-hidden hover:border-blue-200 transition-colors ${
                plan.name === currentPlanName ? "ring-2 ring-green-500 ring-offset-2" : ""
              }`}
            >
              {plan.name === "Pro" && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium transform translate-x-8 translate-y-4 rotate-45">
                  Popular
                </div>
              )}
              <CardHeader className="p-6">
                <div className="flex items-center space-x-2">
                  {plan.name === "Pro" ? (
                    <Zap className="h-5 w-5 text-blue-600" />
                  ) : plan.name === "Enterprise" ? (
                    <Shield className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  )}
                  <CardTitle className="text-gray-900">{plan.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="text-3xl font-bold text-gray-900">
                  {plan.price}
                  {plan.price !== "Free" && plan.price !== "Custom" && (
                    <span className="text-sm font-normal text-gray-500">/month</span>
                  )}
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.name !== currentPlanName && <UpgradeModal plan={plan} />}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Billing History */}
        <Card className="bg-white border-blue-100">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-gray-900">Billing History</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              {[
                { date: "Mar 1, 2024", amount: "Free", status: "Active" },
                { date: "Feb 1, 2024", amount: "Free", status: "Paid" },
                { date: "Jan 1, 2024", amount: "Free", status: "Paid" },
              ].map((bill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{bill.date}</p>
                    <p className="text-sm text-gray-500">Starter Plan</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{bill.amount}</p>
                    <p className="text-sm text-green-600">{bill.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="bg-white border-blue-100">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-gray-900">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 space-y-6">
            <AddPaymentMethodModal />
            <div className="space-y-4">
              {/* Credit Card */}
              <div className="p-4 border border-blue-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/24</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Default</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bank Account */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Chase Bank</p>
                      <p className="text-sm text-gray-500">•••• 8888 (Checking)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      Set Default
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Auto-Payment Settings */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Auto-Payment Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Auto-renew subscription</span>
                    <Switch id="auto-renew" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Send payment notifications</span>
                    <Switch id="payment-notifications" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PlanPage; 