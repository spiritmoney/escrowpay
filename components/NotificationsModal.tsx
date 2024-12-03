import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const NotificationsModal = () => {
  const [open, setOpen] = React.useState(false);
  const notifications = [
    { title: "New payment received", time: "2 minutes ago", isRead: false },
    { title: "KYC verification approved", time: "1 hour ago", isRead: false },
    { title: "New feature available", time: "2 hours ago", isRead: true },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-10 w-10 border-blue-200 bg-white shadow-sm hover:bg-blue-50"
        >
          <Bell className="h-4 w-4 text-blue-600" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
            3
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Notifications</DialogTitle>
            <Button
              variant="ghost"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Mark all as read
            </Button>
          </div>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto mt-4">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`p-4 border-b last:border-0 ${
                notification.isRead ? "bg-white" : "bg-blue-50"
              }`}
            >
              <p className="font-medium text-gray-900">{notification.title}</p>
              <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/dashboard/notifications">
            <Button
              variant="ghost"
              className="text-sm text-blue-600 hover:text-blue-700 w-full"
            >
              View all notifications
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
