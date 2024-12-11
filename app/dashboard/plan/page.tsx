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
import { 
  usePaymentMethods, 
  useAddPaymentMethod, 
  useSetDefaultPaymentMethod,
  useDeletePaymentMethod,
  useUpdateAutoPaymentSettings,
  useBillingHistory,
  useCurrentPlan,
  useUpgradePlan,
  type PaymentMethodType,
  type PaymentMethod
} from './api';
import { toast } from 'sonner';
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { validateCard, formatCardNumber, validateExpiryDate, type CardType } from './utils';
import { CreditCard as VisaIcon, CreditCard as MastercardIcon, CreditCard as AmexIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
    price: "$20",
    features: [
      "Up to 2,000 transactions per month",
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
  const [paymentType, setPaymentType] = React.useState<PaymentMethodType>('CARD');
  const [isOpen, setIsOpen] = React.useState(false);
  const [cardValidation, setCardValidation] = React.useState<{ isValid: boolean; type: CardType }>({ 
    isValid: false, 
    type: 'unknown' 
  });
  const [errors, setErrors] = React.useState<{
    cardNumber?: string;
    expiryDate?: string;
  }>({});
  const addPaymentMethod = useAddPaymentMethod();

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = formatCardNumber(value);
    e.target.value = formatted;

    if (value.length >= 13) {
      const validation = validateCard(value);
      setCardValidation(validation);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, cardNumber: 'Invalid card number' }));
      } else {
        setErrors(prev => ({ ...prev, cardNumber: undefined }));
      }
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;

    if (value.length === 5) {
      const isValid = validateExpiryDate(value);
      if (!isValid) {
        setErrors(prev => ({ ...prev, expiryDate: 'Invalid expiry date' }));
      } else {
        setErrors(prev => ({ ...prev, expiryDate: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      if (paymentType === 'CARD') {
        const cardNumber = formData.get('cardNumber')?.toString().replace(/\s/g, '') || ''; // Remove spaces
        const expiryDate = formData.get('expiryDate')?.toString() || '';
        const cvc = formData.get('cvc')?.toString() || '';
        const cardholderName = formData.get('cardholderName')?.toString() || '';
        
        // Validate before submission
        const cardValidation = validateCard(cardNumber);
        const isExpiryValid = validateExpiryDate(expiryDate);

        if (!cardValidation.isValid || !isExpiryValid) {
          setErrors({
            cardNumber: !cardValidation.isValid ? 'Invalid card number' : undefined,
            expiryDate: !isExpiryValid ? 'Invalid expiry date' : undefined,
          });
          return;
        }

        const payload = {
          cardNumber,         // Clean number without spaces
          expiryDate,        // Already in MM/YY format
          cvc,
          cardholderName,
          setAsDefault: formData.get('isDefault') === 'on'
        };

        await addPaymentMethod.mutateAsync({ 
          type: 'CARD', 
          payload 
        });
      } else {
        // Bank transfer logic remains the same
        const bankCode = formData.get('bankName') as string;
        const bank = banksData.banks.find(b => b.code === bankCode);
        
        const payload = {
          accountHolderName: formData.get('accountHolderName'),
          accountNumber: formData.get('accountNumber'),
          accountType: formData.get('accountType'),
          bankName: bank?.name,
          setAsDefault: formData.get('isDefault') === 'on'
        };

        await addPaymentMethod.mutateAsync({ 
          type: 'BANK', 
          payload 
        });
      }
      
      toast.success('Payment method added successfully');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to add payment method');
      console.error('Error adding payment method:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={paymentType === 'CARD' ? 'default' : 'outline'}
              className={`flex-1 ${paymentType === 'CARD' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}`}
              onClick={() => setPaymentType('CARD')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Card
            </Button>
            <Button
              type="button"
              variant={paymentType === 'BANK' ? 'default' : 'outline'}
              className={`flex-1 ${paymentType === 'BANK' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}`}
              onClick={() => setPaymentType('BANK')}
            >
              <Building2 className="mr-2 h-4 w-4" />
              Bank Transfer
            </Button>
          </div>

          {paymentType === 'BANK' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm md:text-base font-medium">Bank Name</label>
                <Select name="bankName" required>
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
                <Input 
                  name="accountHolderName"
                  placeholder="Full name on account" 
                  className="h-10 md:h-11"
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm md:text-base font-medium">Account Number</label>
                <Input 
                  name="accountNumber"
                  placeholder="Account number" 
                  className="h-10 md:h-11"
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm md:text-base font-medium">Account Type</label>
                <Select name="accountType" required>
                  <SelectTrigger className="h-10 md:h-11">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAVINGS">Savings</SelectItem>
                    <SelectItem value="CURRENT">Current</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm md:text-base font-medium">Card Number</label>
                <div className="relative">
                  <Input 
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456" 
                    className="h-10 md:h-11 pl-10"
                    maxLength={19}
                    onChange={handleCardNumberChange}
                    required 
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    {cardValidation.type === 'visa' && <VisaIcon className="h-4 w-4 text-blue-600" />}
                    {cardValidation.type === 'mastercard' && <MastercardIcon className="h-4 w-4 text-red-600" />}
                    {cardValidation.type === 'amex' && <AmexIcon className="h-4 w-4 text-green-600" />}
                  </div>
                </div>
                {errors.cardNumber && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium">Expiry Date</label>
                  <Input 
                    name="expiryDate"
                    placeholder="MM/YY" 
                    className="h-10 md:h-11"
                    maxLength={5}
                    onChange={handleExpiryDateChange}
                    required 
                  />
                  {errors.expiryDate && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.expiryDate}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium">CVC</label>
                  <Input 
                    name="cvc"
                    type="password" 
                    maxLength={4} 
                    placeholder="123" 
                    className="h-10 md:h-11"
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm md:text-base font-medium">Cardholder Name</label>
                <Input 
                  name="cardholderName"
                  placeholder="Name on card" 
                  className="h-10 md:h-11"
                  required 
                />
              </div>
            </>
          )}

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="default" 
              name="isDefault"
              className="rounded border-gray-300" 
            />
            <label htmlFor="default" className="text-sm text-gray-600">
              Set as default payment method
            </label>
          </div>

          <Button 
            type="submit"
            className="w-full h-10 md:h-11 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={addPaymentMethod.isPending}
          >
            {addPaymentMethod.isPending ? (
              <span className="flex items-center">
                <LoadingSpinner />
                Adding...
              </span>
            ) : (
              <span>{paymentType === 'CARD' ? 'Add Card' : 'Add Bank Account'}</span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const currentPlanName = "Starter"; // Replace with dynamic value if needed

// Add these interfaces based on the API responses
interface Usage {
  monthlyTransactions: number;
  monthlyTransactionLimit: number;
  apiCalls: number;
  apiCallLimit: number;
  monthlyPaymentLinks: number;
  paymentLinkLimit: number;
}

interface SubscriptionPlan {
  type: 'STARTER' | string;
  price: number;
  isActive: boolean;
  usage: Usage;
}

// Helper function to calculate percentage safely
const calculatePercentage = (current?: number, limit?: number): number => {
  if (!current || !limit || limit === 0) return 0;
  return (current / limit) * 100;
};

const PlanPage: React.FC = () => {
  const { data: currentPlan, isLoading: isLoadingPlan } = useCurrentPlan();
  const { data: paymentMethodsData } = usePaymentMethods();
  const { data: billingHistoryData, isLoading: isLoadingBillingHistory } = useBillingHistory();
  const setDefaultPaymentMethod = useSetDefaultPaymentMethod();
  const deletePaymentMethod = useDeletePaymentMethod();
  const updateAutoPayment = useUpdateAutoPaymentSettings();

  const handleSetDefault = async (paymentMethodId: string) => {
    try {
      await setDefaultPaymentMethod.mutateAsync(paymentMethodId);
      toast.success('Default payment method updated');
    } catch (error) {
      toast.error('Failed to update default payment method');
    }
  };

  const handleDelete = async (paymentMethodId: string) => {
    try {
      await deletePaymentMethod.mutateAsync(paymentMethodId);
      toast.success('Payment method deleted successfully');
    } catch (error) {
      toast.error('Failed to delete payment method');
      console.error('Error deleting payment method:', error);
    }
  };

  const handleAutoPaymentUpdate = async (settings: any) => {
    try {
      await updateAutoPayment.mutateAsync(settings);
      toast.success('Auto-payment settings updated');
    } catch (error) {
      toast.error('Failed to update auto-payment settings');
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (isLoadingPlan) {
    return (
      <DashboardLayout>
        <div className="h-full w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

  // Calculate usage percentages safely
  const transactionPercentage = calculatePercentage(
    currentPlan?.usage?.monthlyTransactions,
    currentPlan?.usage?.monthlyTransactionLimit
  );

  const apiCallsPercentage = calculatePercentage(
    currentPlan?.usage?.apiCalls,
    currentPlan?.usage?.apiCallLimit
  );

  const paymentLinksPercentage = calculatePercentage(
    currentPlan?.usage?.monthlyPaymentLinks,
    currentPlan?.usage?.paymentLinkLimit
  );

  const isApproachingLimits = transactionPercentage > 80 || apiCallsPercentage > 80 || paymentLinksPercentage > 80;

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
                <h3 className="text-2xl font-bold text-gray-900">{currentPlan?.type || 'Loading...'} Plan</h3>
                <p className="text-sm text-gray-500 mt-1">${currentPlan?.price || 0}</p>
              </div>
              <span className={`px-4 py-2 ${currentPlan?.isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'} rounded-full text-sm font-medium`}>
                {currentPlan?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Monthly Transactions</span>
                  <span className="text-blue-600 font-medium">
                    {currentPlan?.usage?.monthlyTransactions || 0}/
                    {currentPlan?.usage?.monthlyTransactionLimit || 0}
                  </span>
                </div>
                <Progress 
                  value={transactionPercentage}
                  className="h-2 bg-blue-100" 
                  indicatorClassName="bg-blue-600" 
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">API Calls</span>
                  <span className="text-blue-600 font-medium">
                    {currentPlan?.usage?.apiCalls || 0}/
                    {currentPlan?.usage?.apiCallLimit || 0}
                  </span>
                </div>
                <Progress 
                  value={apiCallsPercentage}
                  className="h-2 bg-blue-100" 
                  indicatorClassName="bg-blue-600" 
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Payment Links</span>
                  <span className="text-blue-600 font-medium">
                    {currentPlan?.usage?.monthlyPaymentLinks || 0}/
                    {currentPlan?.usage?.paymentLinkLimit || 0}
                  </span>
                </div>
                <Progress 
                  value={paymentLinksPercentage}
                  className="h-2 bg-blue-100" 
                  indicatorClassName="bg-blue-600" 
                />
              </div>
            </div>

            {/* Show warning only if approaching limits */}
            {isApproachingLimits && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Approaching Limits</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      You're close to your monthly limits. Consider upgrading to avoid any service interruptions.
                    </p>
                  </div>
                </div>
              </div>
            )}
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
            {isLoadingBillingHistory ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : !billingHistoryData || !billingHistoryData.billingHistory || billingHistoryData.billingHistory.length === 0 ? (
              <div className="py-8">
                <Alert variant="default" className="bg-gray-50 border-gray-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No billing history</AlertTitle>
                  <AlertDescription>
                    Your billing history will appear here once you make your first payment.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="space-y-4">
                {billingHistoryData.billingHistory.map((bill) => (
                  <div
                    key={bill.id}
                    className="flex items-center justify-between py-4 border-b last:border-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">{bill.description}</p>
                      <p className="text-sm text-gray-500">
                        {bill.paymentMethod.type === 'CARD' 
                          ? `Card ending in ${bill.paymentMethod.details.lastFour}`
                          : `${bill.paymentMethod.details.bankName} - ${bill.paymentMethod.details.lastFour}`
                        }
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(bill.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium text-gray-900">
                        {formatAmount(bill.amount, bill.currency)}
                      </p>
                      <span 
                        className={`text-xs px-2 py-1 rounded-full ${
                          bill.status === 'PAID' 
                            ? 'bg-green-100 text-green-600'
                            : bill.status === 'FAILED'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}
                      >
                        {bill.status}
                      </span>
                      {bill.failureReason && (
                        <p className="text-xs text-red-500">{bill.failureReason}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
              {paymentMethodsData?.paymentMethods?.map((method) => (
                <div key={method.id} className="p-4 border border-blue-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {method.type === 'CARD' ? (
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Building className="h-5 w-5 text-gray-600" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {method.type === 'CARD' 
                            ? method.details.maskedNumber 
                            : `${method.details.bankName} - ${method.details.lastFour}`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {method.type === 'CARD' 
                            ? `Expires ${method.details.expiryDate}` 
                            : `${method.details.accountType} Account`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {method.details.cardholderName || method.details.accountHolderName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Default</span>
                      )}
                      {!method.isDefault && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={() => handleDelete(method.id)}
                        disabled={deletePaymentMethod.isPending}
                      >
                        {deletePaymentMethod.isPending ? (
                          <LoadingSpinner />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {(!paymentMethodsData?.paymentMethods || paymentMethodsData.paymentMethods.length === 0) && (
                <div className="text-center text-gray-500 py-4">
                  No payment methods added yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PlanPage; 