"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  getToken,
  login as loginService,
  logout as logoutService,
} from "@/services/auth.service";

interface LoginCredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => loginService(credentials),
    onSuccess: (data) => {
      if (data?.data?.token) {
        setIsAuthenticated(true);
        router.push("/dashboard");
      }
    },
  });

  const logout = useCallback(() => {
    logoutService();
    queryClient.clear();
    setIsAuthenticated(false);
    router.push("/login");
  }, [queryClient, router]);

  return {
    isAuthenticated,
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    logout,
  };
}
