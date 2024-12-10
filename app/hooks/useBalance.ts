import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiCall } from '../utils/api';

interface Balance {
  currency: string;
  amount: number;
  type: 'FIAT' | 'CRYPTO';
}

interface SendMoneyData {
  recipient: string;
  amount: number;
  currency: string;
  note?: string;
}

interface RequestPaymentData {
  payer: string;
  amount: number;
  currency: string;
  description?: string;
}

interface ConvertCurrencyData {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}

export const useBalance = () => {
  const queryClient = useQueryClient();

  // Get balances
  const balances = useQuery({
    queryKey: ['balances'],
    queryFn: () => apiCall('/balance'),
  });

  // Send money mutation
  const sendMoney = useMutation({
    mutationFn: (data: SendMoneyData) => 
      apiCall('/balance/send', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balances'] });
    },
  });

  // Request payment mutation
  const requestPayment = useMutation({
    mutationFn: (data: RequestPaymentData) =>
      apiCall('/balance/request', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balances'] });
    },
  });

  // Convert currency mutation
  const convertCurrency = useMutation({
    mutationFn: (data: ConvertCurrencyData) =>
      apiCall('/balance/convert', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balances'] });
    },
  });

  return {
    balances,
    sendMoney,
    requestPayment,
    convertCurrency,
  };
}; 