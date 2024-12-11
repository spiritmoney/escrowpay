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
import { useProfile, useUpdatePersonalInfo, useUpdateSecuritySettings, useUpdateApiSettings, useRegenerateApiKey, useKycStatus, useUpdateProfilePhoto, useDeleteProfilePhoto, type ProfileData } from "./api";
import { toast } from "sonner";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useQueryClient } from "@tanstack/react-query";
import PhoneInput from "@/app/components/PhoneInput";

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

const PhotoManagementDialog = ({ profile }: { profile: ProfileData | undefined }) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [showFallback, setShowFallback] = React.useState(!profile?.photoUrl);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const updatePhoto = useUpdateProfilePhoto();
  const deletePhoto = useDeleteProfilePhoto();

  // Update showFallback when profile changes
  React.useEffect(() => {
    setShowFallback(!profile?.photoUrl);
  }, [profile?.photoUrl]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowFallback(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle photo upload
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    try {
      await updatePhoto.mutateAsync(selectedFile);
      toast.success("Profile photo updated successfully");
      setSelectedFile(null);
      setPreviewUrl(null);
      setShowFallback(false);
    } catch (error) {
      toast.error("Failed to update profile photo");
    }
  };

  // Handle photo deletion
  const handleDelete = async () => {
    try {
      await deletePhoto.mutateAsync();
      setShowFallback(true);
      setPreviewUrl(null);
      setSelectedFile(null);
      toast.success("Profile photo removed");
    } catch (error) {
      toast.error("Failed to remove profile photo");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto border-blue-200 text-blue-600 hover:bg-blue-50">
          Change Photo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Photo</DialogTitle>
          <DialogDescription>
            Upload a new profile photo or remove the existing one.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-center">
            <Avatar className="h-24 w-24 border-2 border-blue-200">
              {!showFallback && (
                <AvatarImage 
                  src={previewUrl || profile?.photoUrl || undefined} 
                  onError={() => setShowFallback(true)}
                />
              )}
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {profile ? `${profile.firstName[0]}${profile.lastName[0]}` : 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => fileInputRef.current?.click()}
              >
                Select Photo
              </Button>
              {!showFallback && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deletePhoto.isPending}
                >
                  {deletePhoto.isPending ? "Removing..." : "Remove"}
                </Button>
              )}
            </div>
          </div>
          {selectedFile && (
            <Button
              className="w-full"
              onClick={handleUpload}
              disabled={updatePhoto.isPending}
            >
              {updatePhoto.isPending ? "Uploading..." : "Upload Photo"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProfilePage: React.FC = () => {
  const [showApiKey, setShowApiKey] = React.useState(false);
  const queryClient = useQueryClient();
  
  // Fetch profile data
  const { data: profile, isLoading } = useProfile();
  const { data: kycStatus } = useKycStatus();
  
  // Mutations
  const updatePersonalInfo = useUpdatePersonalInfo();
  const updateSecurity = useUpdateSecuritySettings();
  const updateApiSettings = useUpdateApiSettings();
  const regenerateApiKey = useRegenerateApiKey();

  // Add state for switches
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  const [apiAccess, setApiAccess] = React.useState(false);
  const [webhookNotifications, setWebhookNotifications] = React.useState(false);

  // Update states when profile data loads
  React.useEffect(() => {
    if (profile) {
      setTwoFactorEnabled(profile.twoFactorEnabled);
      setApiAccess(profile.apiAccess);
      setWebhookNotifications(profile.webhookNotifications);
    }
  }, [profile]);

  // Handle security settings toggle
  const handleTwoFactorToggle = async (checked: boolean) => {
    try {
      await updateSecurity.mutateAsync({
        twoFactorEnabled: checked,
        currentPassword: '', // You might want to prompt for this
        newPassword: '', // Only required when changing password
      });
      setTwoFactorEnabled(checked);
      toast.success("2FA settings updated successfully");
    } catch (error) {
      toast.error("Failed to update 2FA settings");
      // Revert the toggle if the API call fails
      setTwoFactorEnabled(!checked);
    }
  };

  // Handle API settings toggles
  const handleApiSettingsToggle = async (setting: 'apiAccess' | 'webhooks', checked: boolean) => {
    try {
      await updateApiSettings.mutateAsync({
        apiAccess: setting === 'apiAccess' ? checked : apiAccess,
        webhookNotifications: setting === 'webhooks' ? checked : webhookNotifications,
      });
      
      if (setting === 'apiAccess') {
        setApiAccess(checked);
      } else {
        setWebhookNotifications(checked);
      }
      
      toast.success("API settings updated successfully");
    } catch (error) {
      toast.error("Failed to update API settings");
      // Revert the toggle if the API call fails
      if (setting === 'apiAccess') {
        setApiAccess(!checked);
      } else {
        setWebhookNotifications(!checked);
      }
    }
  };

  // Add the handlePhoneUpdate function
  const handlePhoneUpdate = async () => {
    const phoneInput = document.querySelector('input[name="phone"]') as HTMLInputElement;
    const phoneValue = phoneInput?.value;
    
    try {
      await updatePersonalInfo.mutateAsync({
        phone: phoneValue || null,
      });
      toast.success("Phone number updated successfully");
    } catch (error) {
      toast.error("Failed to update phone number");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="h-full w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

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
                  {profile?.photoUrl && (
                    <AvatarImage 
                      src={profile.photoUrl} 
                      onError={() => console.log('Avatar image failed to load')}
                    />
                  )}
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {profile ? `${profile.firstName[0]}${profile.lastName[0]}` : 'U'}
                  </AvatarFallback>
                </Avatar>
                <PhotoManagementDialog profile={profile} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input 
                  value={profile ? `${profile.firstName} ${profile.lastName}` : ''} 
                  readOnly
                  disabled
                  className="border-blue-200 bg-gray-50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  value={profile?.email || ''} 
                  readOnly
                  disabled
                  className="border-blue-200 bg-gray-50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Organisation</label>
                <Input 
                  value={profile?.organisation || ''} 
                  readOnly
                  disabled
                  className="border-blue-200 bg-gray-50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <PhoneInput
                  value={profile?.phone || null}
                  onChange={(value) => {
                    const phoneInput = document.querySelector('input[name="phone"]') as HTMLInputElement;
                    if (phoneInput) {
                      phoneInput.value = value;
                    }
                  }}
                  className="border-blue-200"
                />
                <input type="hidden" name="phone" value={profile?.phone || ''} />
              </div>
              <Button 
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={updatePersonalInfo.isPending}
                onClick={handlePhoneUpdate}
              >
                {updatePersonalInfo.isPending ? "Updating..." : "Update Phone Number"}
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
                <Switch 
                  id="2fa"
                  checked={twoFactorEnabled}
                  onCheckedChange={handleTwoFactorToggle}
                  disabled={updateSecurity.isPending}
                />
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
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">API Key</label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Input 
                        type={showApiKey ? "text" : "password"} 
                        value={profile?.apiKey || ''} 
                        readOnly 
                        className="pr-10 border-blue-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        if (profile?.apiKey) {
                          navigator.clipboard.writeText(profile.apiKey);
                          toast.success("API key copied to clipboard");
                        }
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="api-access" className="text-sm font-medium">API Access</Label>
                  <Switch 
                    id="api-access"
                    checked={apiAccess}
                    onCheckedChange={(checked) => handleApiSettingsToggle('apiAccess', checked)}
                    disabled={updateApiSettings.isPending}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="webhooks" className="text-sm font-medium">Webhook Notifications</Label>
                  <Switch 
                    id="webhooks"
                    checked={webhookNotifications}
                    onCheckedChange={(checked) => handleApiSettingsToggle('webhooks', checked)}
                    disabled={updateApiSettings.isPending}
                  />
                </div>
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={async () => {
                    try {
                      await regenerateApiKey.mutateAsync();
                      toast.success("API key regenerated successfully");
                    } catch (error) {
                      toast.error("Failed to regenerate API key");
                    }
                  }}
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