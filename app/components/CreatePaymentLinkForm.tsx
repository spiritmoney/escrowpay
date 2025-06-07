import { useState } from "react";
import { useCreatePaymentLink } from "../dashboard/payment-link/api";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "./LoadingSpinner";

interface CreatePaymentLinkFormProps {
  onClose: () => void;
  onSuccess?: (link: any) => void;
}

const CreatePaymentLinkForm: React.FC<CreatePaymentLinkFormProps> = ({
  onClose,
  onSuccess,
}) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    currency: "USD" as const,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const createPaymentLink = useCreatePaymentLink();

  const supportedCurrencies = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "NGN", label: "NGN - Nigerian Naira" },
    { value: "USDC", label: "USDC - USD Coin" },
    { value: "USDT", label: "USDT - Tether" },
    { value: "ESPEES", label: "ESPEES - Platform Token" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Payment link name is required";
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount < 0.01) {
        newErrors.amount = "Amount must be at least 0.01";
      }
    }

    if (!formData.currency) {
      newErrors.currency = "Currency is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await createPaymentLink.mutateAsync({
        name: formData.name.trim(),
        amount: parseFloat(formData.amount),
        currency: formData.currency,
      });

      toast.success("Payment link created successfully!");

      // Refresh the payment links list
      queryClient.invalidateQueries({ queryKey: ["payment-links"] });

      if (onSuccess) {
        onSuccess(response.link);
      }

      onClose();
    } catch (error) {
      console.error("Create payment link error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create payment link";
      toast.error(errorMessage);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Payment Link</CardTitle>
        <CardDescription>
          Create a payment link that customers can use to pay you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium">
              Payment Link Name
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g., Payment for Design Services"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="font-medium">
              Amount
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              placeholder="0.00"
              className={errors.amount ? "border-red-500" : ""}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency" className="font-medium">
              Currency
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formData.currency}
              onValueChange={(value) => handleInputChange("currency", value)}
            >
              <SelectTrigger
                id="currency"
                className={errors.currency ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {supportedCurrencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.currency && (
              <p className="text-sm text-red-500">{errors.currency}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createPaymentLink.isPending}
              className="min-w-[120px]"
            >
              {createPaymentLink.isPending ? (
                <div className="flex items-center gap-2">Creating...</div>
              ) : (
                "Create Link"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePaymentLinkForm;
