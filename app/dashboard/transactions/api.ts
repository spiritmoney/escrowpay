import { TransactionQueryParams, Transaction, ApiError } from './types';

const BASE_URL = "http://localhost:10000";

export const fetchTransactions = async (params?: TransactionQueryParams): Promise<Transaction[]> => {
  try {
    const searchParams = new URLSearchParams();
    if (params?.type) searchParams.append('type', params.type);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.search) searchParams.append('search', params.search);

    const response = await fetch(`${BASE_URL}/transactions?${searchParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      }
    });

    const data = await response.json();

    if (!response.ok) {
      // Cast the error response to ApiError since we know the structure
      throw {
        statusCode: response.status,
        message: data.message || 'An error occurred',
        timestamp: data.timestamp || new Date().toISOString(),
        path: data.path || window.location.pathname
      } as ApiError;
    }

    return data.data;
  } catch (error) {
    // Handle both API errors and unexpected errors
    if (isApiError(error)) {
      throw error;
    } else {
      // Convert unknown errors to ApiError format
      throw {
        statusCode: 500,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
        path: window.location.pathname
      } as ApiError;
    }
  }
};

// Type guard to check if an error is an ApiError
function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'message' in error &&
    'timestamp' in error &&
    'path' in error
  );
}
