import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  organisation: string;
  role: "DEVELOPER" | "BUSINESS" | "OTHER";
}

interface OTPVerification {
  email: string;
  otp: string;
}

interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

const API_URL = "https://escrow-backend-xnwx.onrender.com";

const handleApiError = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw {
      response: {
        data: data,
        status: response.status,
      },
    };
  }
  return data;
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      return handleApiError(response);
    },
    onSuccess: (data) => {
      // Store the token
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(["user"], data.user);
      router.push("/dashboard");
    },
  });

  const signup = useMutation({
    mutationFn: async (data: SignUpData) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return handleApiError(response);
    },
    onSuccess: () => {
      router.push("/auth/register/verify");
    },
  });

  const verifyOTP = useMutation({
    mutationFn: async (data: OTPVerification) => {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("OTP verification failed");
      }

      return response.json();
    },
    onSuccess: () => {
      router.push("/auth/signin");
    },
  });

  const forgotPassword = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch(`${API_URL}/auth/request-password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset email");
      }

      return response.json();
    },
    onSuccess: () => {
      router.push("/auth/reset-password");
    },
  });

  const resetPassword = useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Password reset failed");
      }

      return response.json();
    },
    onSuccess: () => {
      router.push("/auth/signin");
    },
  });

  return {
    login,
    signup,
    verifyOTP,
    forgotPassword,
    resetPassword,
  };
};
