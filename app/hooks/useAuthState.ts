"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuthState = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
    } else {
      setToken(token);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  return {
    isLoading,
    isAuthenticated,
    token,
  };
}; 