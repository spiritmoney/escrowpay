"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/DashboardLayout";
import CreatePaymentLinkForm from "../../components/CreatePaymentLinkForm";
import PaymentLinksList from "../../components/PaymentLinkList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const PaymentLinksPage: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <DashboardLayout>
      <div
        className="p-6 space-y-6"
      >
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
          <PaymentLinksList />
        )}
      </div>
    </DashboardLayout>
  );
};

export default PaymentLinksPage;
