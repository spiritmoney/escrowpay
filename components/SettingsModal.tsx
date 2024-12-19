import React from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useProfile, useUpdateSecuritySettings } from "@/app/dashboard/profile/api";
import { toast } from "sonner";

const SettingsModal = () => {
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { data: profile } = useProfile();
  const updateSecuritySettings = useUpdateSecuritySettings();

  const settingsLinks = [
    { title: "Account Settings", href: "/dashboard/profile" },
    { title: "Subscription Settings", href: "/dashboard/plan" },
    { title: "API Settings", href: "/dashboard/profile#api" },
    { title: "Notification Preferences", href: "/dashboard/profile#notifications" },
    { title: "Security Settings", href: "/dashboard/profile#security" },
  ];

  // Handle dark mode toggle
  const handleDarkModeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  // Handle 2FA toggle
  const handle2FAToggle = async (checked: boolean) => {
    try {
      await updateSecuritySettings.mutateAsync({
        twoFactorEnabled: checked,
      });
      toast.success(`Two-factor authentication ${checked ? 'enabled' : 'disabled'}`);
    } catch (error) {
      toast.error("Failed to update two-factor authentication");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 border-blue-200 bg-white shadow-sm hover:bg-blue-50"
        >
          <Settings className="h-4 w-4 text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {/* Quick Settings
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor-auth" className="text-sm font-medium">
                Two-Factor Authentication
              </Label>
              <Switch 
                id="two-factor-auth"
                checked={profile?.twoFactorEnabled}
                onCheckedChange={handle2FAToggle}
                disabled={updateSecuritySettings.isPending}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="text-sm font-medium">
                Dark Mode
              </Label>
              <Switch 
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
          </div> */}

          {/* Settings Links */}
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Additional Settings</h3>
            <div className="space-y-1">
              {settingsLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* <div className="pt-4 border-t">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setOpen(false)}
            >
              Save Changes
            </Button>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal; 