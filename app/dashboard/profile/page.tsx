"use client";

import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Shield, 
  Key, 
  Copy, 
  Eye, 
  EyeOff,
  RefreshCw,
  AlertCircle,
  Bell,
  Settings as LucideSettings
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { FileText } from "lucide-react";
import NotificationsModal from "../../../components/NotificationsModal";
import SettingsModal from "../../../components/SettingsModal";

const KYCVerificationModal = () => {
  const [selectedIdType, setSelectedIdType] = React.useState("national_id");

  const renderFormFields = () => {
    switch (selectedIdType) {
      case "passport":
        return (
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">Upload Passport (Front Side)</label>
            <Input type="file" accept="image/*" className="h-10 md:h-11" />
          </div>
        );
      case "nin":
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">Upload NIN Card (Front Side)</label>
              <Input type="file" accept="image/*" className="h-10 md:h-11" />
            </div>
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">NIN Number (11 digits)</label>
              <Input type="text" maxLength={11} className="h-10 md:h-11" />
            </div>
          </>
        );
      case "bvn":
        return (
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">BVN Number (10 digits)</label>
            <Input type="text" maxLength={10} className="h-10 md:h-11" />
          </div>
        );
      default: // national_id
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">Upload National ID (Front Side)</label>
              <Input type="file" accept="image/*" className="h-10 md:h-11" />
            </div>
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">Upload National ID (Back Side)</label>
              <Input type="file" accept="image/*" className="h-10 md:h-11" />
            </div>
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">Selfie with ID</label>
              <Input type="file" accept="image/*" className="h-10 md:h-11" />
            </div>
          </>
        );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Complete KYC Verification
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4 md:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2 mb-4">
          <DialogTitle className="text-xl md:text-2xl">KYC Verification</DialogTitle>
          <DialogDescription className="text-sm md:text-base">
            Complete your identity verification to unlock higher transaction limits.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2 md:py-4">
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium">ID Type</label>
            <select 
              className="w-full h-10 md:h-11 rounded-md border border-gray-200 px-3"
              value={selectedIdType}
              onChange={(e) => setSelectedIdType(e.target.value)}
            >
              <option value="national_id">National ID</option>
              <option value="passport">Passport</option>
              <option value="nin">NIN</option>
              <option value="bvn">BVN</option>
            </select>
          </div>
          {renderFormFields()}
          <Button className="w-full h-10 md:h-11 mt-2 bg-blue-600 hover:bg-blue-700 text-white">
            Submit for Verification
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProfilePage: React.FC = () => {
  const [showApiKey, setShowApiKey] = React.useState(false);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile</h1>
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
          {/* Personal Information Card */}
          <Card className="bg-white border-blue-100">
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-gray-900">Personal Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-blue-200">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="w-full sm:w-auto border-blue-200 text-blue-600 hover:bg-blue-50">
                  Change Photo
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input defaultValue="John Doe" className="border-blue-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="john@example.com" type="email" className="border-blue-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input defaultValue="+1 234 567 8900" type="tel" className="border-blue-200" />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings Card */}
          <Card className="bg-white border-blue-100">
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-gray-900">Security Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <Input type="password" className="border-blue-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" className="border-blue-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <Input type="password" className="border-blue-200" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Label htmlFor="2fa" className="text-sm font-medium">Two-Factor Authentication</Label>
                <Switch id="2fa" />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Update Security Settings
              </Button>
            </CardContent>
          </Card>

          {/* KYC Verification Card */}
          <Card className="bg-white border-blue-100">
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-gray-900">KYC Verification</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Verification Required</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Complete KYC verification to increase your transaction limits and unlock additional features.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Current Level</span>
                  <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">Level 1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Transaction Limit</span>
                  <span className="text-sm">$1,000/day</span>
                </div>
              </div>
              <KYCVerificationModal />
            </CardContent>
          </Card>

          {/* API Settings Card */}
          <Card className="bg-white border-blue-100">
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-gray-900">API Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">API Key</label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Input 
                        type={showApiKey ? "text" : "password"} 
                        value="sk_test_123456789" 
                        readOnly 
                        className="pr-10 border-blue-200"
                      />
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() => navigator.clipboard.writeText("sk_test_123456789")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">API Access</span>
                  <Switch id="api-access" defaultChecked />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Webhook Notifications</span>
                  <Switch id="webhooks" />
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage; 