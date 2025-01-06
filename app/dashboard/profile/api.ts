import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "https://escrow-backend-1xw6.onrender.com";

// Types
export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  photoUrl: string | null;
  organisation: string;
  kycLevel: string;
  transactionLimit: string;
  apiKey: string;
  twoFactorEnabled: boolean;
  apiAccess: boolean;
  webhookNotifications: boolean;
}

interface UpdateProfileDto {
  phone: string | null;
}

interface UpdateSecuritySettingsDto {
  currentPassword?: string;
  newPassword?: string;
  twoFactorEnabled?: boolean;
}

interface ApiSettingsDto {
  apiAccess: boolean;
  webhookNotifications: boolean;
}

interface UpdatePhotoResponse {
  photoUrl: string;
}

// API functions
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json() as Promise<ProfileData>;
    },
  });
};

export const useUpdatePersonalInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdateProfileDto) => {
      const response = await fetch(`${BASE_URL}/profile/personal-info`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useUpdateProfilePhoto = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("photo", file);
      
      const response = await fetch(`${BASE_URL}/profile/photo`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      });
      
      if (!response.ok) throw new Error("Failed to update photo");
      return response.json() as Promise<UpdatePhotoResponse>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useUpdateSecuritySettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdateSecuritySettingsDto) => {
      const response = await fetch(`${BASE_URL}/profile/security`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update security settings");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useUpdateApiSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: ApiSettingsDto) => {
      const response = await fetch(`${BASE_URL}/profile/api-settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update API settings");
      return response.json();
    },
    onSuccess: () => {
      // Refetch profile data after successful update
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useRegenerateApiKey = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${BASE_URL}/profile/regenerate-api-key`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to regenerate API key");
      return response.json();
    },
    onSuccess: () => {
      // Refetch profile data after successful regeneration
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useKycStatus = () => {
  return useQuery({
    queryKey: ["kycStatus"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/profile/kyc-status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch KYC status");
      return response.json();
    },
  });
};

export const useDeleteProfilePhoto = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${BASE_URL}/profile/photo`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      
      if (!response.ok) throw new Error("Failed to delete photo");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
