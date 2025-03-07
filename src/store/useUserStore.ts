import { create } from "zustand";
import { IUser } from "../types/user";
import { persist } from "zustand/middleware";

// Define Zustand store types
interface UserState {
    user: IUser | null;
    setUser: (user: IUser) => void;
    logout: () => void;
}

// Create the Zustand store with persist middleware
const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null, // Initial state
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        { name: "user-storage" } // Persistent storage key
    )
);

export default useUserStore;
