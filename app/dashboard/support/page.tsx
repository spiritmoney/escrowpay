"use client";

import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone, FileText, Bell, Settings as LucideSettings } from "lucide-react";
import Link from "next/link";
import NotificationsModal from "../../../components/NotificationsModal";
import SettingsModal from "../../../components/SettingsModal";

const SupportPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Support</h1>
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

        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          <Card className="bg-white border-blue-100">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-gray-900">Contact Support</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Enter subject" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="Describe your issue..." rows={5} />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Submit Ticket</Button>
            </CardContent>
          </Card>

          <div className="space-y-4 md:space-y-6">
            <Card className="bg-white border-blue-100">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-gray-900">Quick Support Options</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                <Button variant="outline" className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start Live Chat
                </Button>
                <Button variant="outline" className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule a Call
                </Button>
                <Button variant="outline" className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50">
                  <FileText className="mr-2 h-4 w-4" />
                  Browse FAQ
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-blue-100">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-gray-900">Support Status</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Response Time</span>
                    <span className="text-sm">2 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Support Hours</span>
                    <span className="text-sm">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SupportPage; 