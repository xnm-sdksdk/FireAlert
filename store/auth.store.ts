import { AuthState } from "@/constants/user";
import { create } from "zustand";

export const authStore = create<AuthState>((set) => ({
    user: null,
    signIn: async (user) => { },
    signOut: async () => { },
    loadUser: async () => { },
}))