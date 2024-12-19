export enum NotificationType {
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  KYC_APPROVED = 'KYC_APPROVED',
  NEW_FEATURE = 'NEW_FEATURE',
  SECURITY_ALERT = 'SECURITY_ALERT',
  SYSTEM_UPDATE = 'SYSTEM_UPDATE'
}

// Map notification types to their display properties
export const notificationTypeConfig = {
  [NotificationType.PAYMENT_RECEIVED]: {
    icon: 'success',
    color: 'green'
  },
  [NotificationType.KYC_APPROVED]: {
    icon: 'success',
    color: 'green'
  },
  [NotificationType.NEW_FEATURE]: {
    icon: 'info',
    color: 'blue'
  },
  [NotificationType.SECURITY_ALERT]: {
    icon: 'warning',
    color: 'yellow'
  },
  [NotificationType.SYSTEM_UPDATE]: {
    icon: 'info',
    color: 'blue'
  }
} as const;

export interface NotificationData {
  amount?: string;
  currency?: string;
  featureName?: string;
  deviceInfo?: string;
  [key: string]: any;
}

export interface BaseNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  data?: NotificationData;
}

export interface NotificationsState {
  notifications: BaseNotification[];
  unreadCount: number;
} 