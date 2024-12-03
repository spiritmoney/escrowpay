"use client";

import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Settings as LucideSettings,
  FileText,
  CheckCircle2,
  AlertCircle,
  Info
} from "lucide-react";
import Link from "next/link";
import NotificationsModal from "../../../components/NotificationsModal";
import SettingsModal from "../../../components/SettingsModal";

const NotificationsPage: React.FC = () => {
  const notifications = [
    {
      id: 1,
      title: "Payment Received",
      message: "You received a payment of $500.00 from John Doe",
      time: "2 minutes ago",
      type: "success",
      isRead: false,
    },
    {
      id: 2,
      title: "KYC Verification Approved",
      message: "Your KYC verification has been approved",
      time: "1 hour ago",
      type: "success",
      isRead: false,
    },
    {
      id: 3,
      title: "New Feature Available",
      message: "Check out our new payment link feature",
      time: "2 hours ago",
      type: "info",
      isRead: true,
    },
    {
      id: 4,
      title: "Security Alert",
      message: "New login detected from unknown device",
      time: "1 day ago",
      type: "warning",
      isRead: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notifications</h1>
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
          {/* Notification Settings */}
          <Card className="bg-white border-blue-100">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-gray-900">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <Label className="text-sm font-medium">Email Notifications</Label>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-blue-600" />
                    <Label className="text-sm font-medium">Push Notifications</Label>
                  </div>
                  <Switch id="push-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <Label className="text-sm font-medium">SMS Notifications</Label>
                  </div>
                  <Switch id="sms-notifications" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium text-gray-900">Notify me about:</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Payment Received</Label>
                    <Switch id="payment-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Security Alerts</Label>
                    <Switch id="security-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Product Updates</Label>
                    <Switch id="product-notifications" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card className="bg-white border-blue-100">
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Recent Notifications</CardTitle>
                <Button variant="ghost" className="text-sm text-blue-600 hover:text-blue-700">
                  Mark all as read
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${
                      notification.isRead ? 'bg-white' : 'bg-blue-50 border-blue-100'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage; 