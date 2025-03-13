import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  checkAuth: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoading: true,
  isLoggedIn: false,

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("user_token");
      set({ isLoggedIn: !!token, isLoading: false });
    } catch (error) {
      console.error("Auth check failed:", error);
      set({ isLoading: false });
    }
  },

  login: async (token: string) => {
    await AsyncStorage.setItem("user_token", token);
    set({ isLoggedIn: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem("user_token");
    set({ isLoggedIn: false });
  },
}));

export default useAuthStore;
