import { AuthState, User } from "@/constants/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";

const authStore = create<AuthState>((set, get) => ({
    user: null,
    users: [],

    loadUser: async () => {
        const storedUsers = await AsyncStorage.getItem("users");
        const storedCurrent = await AsyncStorage.getItem("currentUser");
        if (storedUsers) set({ users: JSON.parse(storedUsers) });
        if (storedCurrent) set({ user: JSON.parse(storedCurrent) });
    },

    register: async (username, password) => {
        const { users } = get();

        if (users.find((u) => u.username === username)) return false;

        const newUser: User = {
            ...users,
            id: Date.now(),
            username,
            password,
        };
        const newUsers = [...users, newUser];

        await AsyncStorage.setItem("users", JSON.stringify(newUsers));
        set({ users: newUsers, user: newUser });
        return true;
    },

    signIn: async (username, password) => {
        const { users } = get();
        const user = users.find(
            (u) => u.username === username && u.password === password
        );
        if (!user) return false;

        set({ user: user });
        await AsyncStorage.setItem("currentUser", JSON.stringify(user));
        return true;
    },

    signOut: async () => {
        set({ user: null });
        await AsyncStorage.removeItem("currentUser");
        router.replace("/auth");
    },
    updateUser: async (
        username?: string,
        password?: string
    ): Promise<boolean> => {
        try {
            const storedUsers = await AsyncStorage.getItem("users");
            const currentUser = get().user;
            if (!currentUser || !storedUsers) return false;

            const users: User[] = JSON.parse(storedUsers);

            if (username !== undefined) currentUser.username = username;
            if (password !== undefined) currentUser.password = password;

            const updatedUsers = users.map((u) =>
                u.id === currentUser.id ? { ...u, ...currentUser } : u
            );

            await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
            await AsyncStorage.setItem("currentUser", JSON.stringify(currentUser));

            set({ user: currentUser, users: updatedUsers });
            return true;
        } catch (error) {
            console.error("Failed to update user:", error);
            return false;
        }
    },
}));

export default authStore;
