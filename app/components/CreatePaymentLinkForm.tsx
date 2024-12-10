import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const paymentLinkSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Invalid amount. Use format: 0.00",
  }),
  currency: z.string().min(1, { message: "Please select a currency." }),
  description: z.string().optional(),
  type: z.enum(["product", "service", "digital", "crypto"]),
  paymentMethods: z
    .array(z.enum(["card", "bank_transfer", "crypto"]))
    .min(1, { message: "Select at least one payment method" }),
});

type PaymentLinkFormValues = z.infer<typeof paymentLinkSchema>;

interface CreatePaymentLinkFormProps {
  onClose: () => void;
}

const CreatePaymentLinkForm: React.FC<CreatePaymentLinkFormProps> = ({
  onClose,
}) => {
  const form = useForm<PaymentLinkFormValues>({
    resolver: zodResolver(paymentLinkSchema),
    defaultValues: {
      name: "",
      amount: "",
      currency: "USD",
      description: "",
      type: "product",
      paymentMethods: [],
    },
  });

  const onSubmit = (values: PaymentLinkFormValues) => {
    console.log(values);
    // Here you would typically send the data to your API to create the payment link
    alert("Payment link created successfully!");
    onClose();
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Payment Link</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Premium Product" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="0.00" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Currency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="JPY">JPY</SelectItem>
                          <SelectItem value="ESPEE">ESPEE</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe your product or service"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="product">
                          Physical Product
                        </SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="digital">Digital Product</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethods"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Methods</FormLabel>
                    <FormControl>
                      <div className="flex space-x-4">
                        {["card", "bank_transfer", "crypto"].map((method) => (
                          <label
                            key={method}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              value={method}
                              checked={field.value?.includes(method as "card" | "bank_transfer" | "crypto")}
                              onChange={(e) => {
                                const updatedValue = e.target.checked
                                  ? [...field.value, method as "card" | "bank_transfer" | "crypto"]
                                  : field.value?.filter(
                                      (val) => val !== method
                                    );
                                field.onChange(updatedValue);
                              }}
                            />
                            <span>
                              {method
                                .replace("_", " ")
                                .charAt(0)
                                .toUpperCase() +
                                method.replace("_", " ").slice(1)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Create Payment Link</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePaymentLinkForm;
