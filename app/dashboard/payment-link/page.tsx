"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/DashboardLayout";
import CreatePaymentLinkForm from "../../components/CreatePaymentLinkForm";
import PaymentLinksList from "../../components/PaymentLinkList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { usePaymentLinks } from "./api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const queryClient = new QueryClient();

const PaymentLinksPageContent: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { data, isLoading, error } = usePaymentLinks();

  if (isLoading)
    return (
      <DashboardLayout>
        <div className="h-full w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  if (error) return <div>Error loading payment links</div>;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-3xl font-bold">Payment Links</h1>
          <Button
            onClick={() => setIsCreating(true)}
            className="flex items-center max-md:text-xs"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Link
          </Button>
        </div>

        {isCreating ? (
          <CreatePaymentLinkForm onClose={() => setIsCreating(false)} />
        ) : (
          <PaymentLinksList links={data?.links || []} />
        )}
      </div>
    </DashboardLayout>
  );
};

const PaymentLinksPage: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <PaymentLinksPageContent />
  </QueryClientProvider>
);

export default PaymentLinksPage;
