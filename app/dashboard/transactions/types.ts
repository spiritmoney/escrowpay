export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
  PAYMENT = 'PAYMENT'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  note?: string;
  recipient: string;
  sender: string;
}

export interface TransactionQueryParams {
  type?: TransactionType;
  status?: TransactionStatus;
  search?: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}