"use client";

import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import OverviewPanel from "../components/OverviewPanel";
import PaymentManagement from "../components/PaymentManagement";
import CheckoutInsights from "../components/CheckoutInsights";
import TransactionsList from "../components/TransactionsList";
import Settings from "../components/Settings";
import SupportAccess from "../components/SupportAccess";
import Link from "next/link";
import { FileText, Bell, Settings as LucideSettings } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationsModal from "../../components/NotificationsModal";
import SettingsModal from "../../components/SettingsModal";

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
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
        <OverviewPanel />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PaymentManagement />
          <CheckoutInsights />
        </div>
        <TransactionsList />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Settings />
          <SupportAccess />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
