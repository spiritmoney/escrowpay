import React from "react";
import { FileText, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeaderActions = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative h-10 w-10 border-blue-200 bg-white shadow-sm hover:bg-blue-50"
          >
            <Bell className="h-5 w-5 text-blue-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              3
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <span className="font-medium">Notifications</span>
            <Button variant="ghost" className="text-xs text-blue-600 hover:text-blue-700">
              Mark all as read
            </Button>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {[
              { title: "New payment received", time: "2 minutes ago" },
              { title: "KYC verification approved", time: "1 hour ago" },
              { title: "New feature available", time: "2 hours ago" },
            ].map((notification, index) => (
              <DropdownMenuItem key={index} className="px-4 py-3 cursor-pointer">
                <div>
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
          <div className="p-2 border-t text-center">
            <Button variant="ghost" className="text-sm text-blue-600 hover:text-blue-700 w-full">
              View all notifications
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Settings */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-blue-200 bg-white shadow-sm hover:bg-blue-50"
          >
            <Settings className="h-5 w-5 text-blue-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href="/dashboard/profile" className="flex items-center">
              Account Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/plan" className="flex items-center">
              Subscription Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/profile#api" className="flex items-center">
              API Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Documentation */}
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
  );
};

export default HeaderActions; 