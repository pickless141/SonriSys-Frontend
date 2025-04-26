import { create } from "zustand";
import { AuthState } from "@/interface/auth";
import { loginUser, logoutUser, forgotPassword, resetPassword, getAuthenticatedUser } from "@/api/authApi";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  loadUser: async () => {
    const userData = await getAuthenticatedUser();
    if (userData) {
      set({ user: userData, isAuthenticated: true });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },
  login: async (email, password) => {
    try {
      const userData = await loginUser(email, password);
      set({ user: userData, isAuthenticated: true });
      return userData;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      await logoutUser();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (email) => {
    try {
      await forgotPassword(email);
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (email, resetCode, newPassword) => {
    try {
      await resetPassword(email, resetCode, newPassword);
    } catch (error) {
      throw error;
    }
  },
}));