import { AuthState } from "@/constants/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const authStore = create<AuthState>((set) => ({
    user: null,
    signIn: async (user) => {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        set({ user });
    },
    signOut: async () => {
        await AsyncStorage.removeItem("user");
        set({ user: null });
    },
    loadUser: async () => {
        const stored = await AsyncStorage.getItem("user");
        if (stored) set({ user: JSON.parse(stored) });
    },
}))