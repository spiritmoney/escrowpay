import { BaseNotification, NotificationType } from '../../types/notifications';

const API_BASE_URL = "https://api.paylinc.org";
// const API_BASE_URL = "http://localhost:10000";

export interface NotificationsResponse {
  notifications: BaseNotification[];
  unreadCount: number;
}

export const getNotifications = async (): Promise<NotificationsResponse> => {
  const response = await fetch(`${API_BASE_URL}/notifications`, {
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }
  
  return response.json();
};

export const markAllNotificationsAsRead = async (): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/notifications/mark-all-read`, {
    method: 'PUT',
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Failed to mark notifications as read');
  }
  
  return response.json();
};
