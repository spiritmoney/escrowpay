import React from "react";
import { Bell, InboxIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotifications, markAllNotificationsAsRead } from '@/app/dashboard/notifications/api';
import { toast } from 'sonner';

const NotificationsModal = () => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  const markAllReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('All notifications marked as read');
    },
    onError: () => {
      toast.error('Failed to mark notifications as read');
    },
  });

  const handleMarkAllRead = () => {
    markAllReadMutation.mutate();
  };

  const unreadCount = data?.unreadCount ?? 0;
  const notifications = data?.notifications ?? [];
  const hasNotifications = notifications.length > 0;

  const EmptyState = () => (
    <div className="py-8 px-4 text-center">
      <div className="flex justify-center mb-3">
        <InboxIcon className="h-12 w-12 text-gray-300" />
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-1">
        No notifications yet
      </h3>
      <p className="text-sm text-gray-500">
        We'll notify you when there's any important updates.
      </p>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-10 w-10 border-blue-200 bg-white shadow-sm hover:bg-blue-50"
        >
          <Bell className="h-4 w-4 text-blue-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Notifications</DialogTitle>
            {hasNotifications && (
              <Button
                variant="ghost"
                className="text-sm text-blue-600 hover:text-blue-700"
                onClick={handleMarkAllRead}
                disabled={markAllReadMutation.isPending}
              >
                Mark all as read
              </Button>
            )}
          </div>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto mt-4">
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : !hasNotifications ? (
            <EmptyState />
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b last:border-0 ${
                  !notification.read ? "bg-blue-50" : "bg-white"
                }`}
              >
                <p className="font-medium text-gray-900">{notification.title}</p>
                <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
        {hasNotifications && (
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
