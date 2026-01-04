import { AlertsState, AlertType } from "@/constants/alertType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const alertStore = create<AlertsState>((set, get) => ({
    alerts: [
        {
            type: AlertType.Critical,
            title: "Fire near forest",
            description: "Location: North Park",
            time: "2 min ago",
            location: "3.2 km",
        },
        {
            type: AlertType.Medium,
            title: "Smoke detected",
            description: "Location: Downtown",
            time: "5 min ago",
            location: "1.1 km",
        },
        {
            type: AlertType.Contained,
            title: "Cleared area",
            description: "No danger now",
            time: "10 min ago",
            location: "0 km",
        },
    ],

    addAlert: async (alert) => {
        const updated = [alert, ...get().alerts];
        set({ alerts: updated });
        await AsyncStorage.setItem("alerts", JSON.stringify(updated));
    },

    removeAlert: async (index) => {
        const updated = [...get().alerts];
        updated.splice(index, 1);
        set({ alerts: updated });
        AsyncStorage.setItem("alerts", JSON.stringify(updated));
    },

    loadAlerts: async () => {
        const stored = await AsyncStorage.getItem("alerts");
        if (stored) {
            set({ alerts: JSON.parse(stored) });
        } else {
            await AsyncStorage.setItem("alerts", JSON.stringify(get().alerts));
        }
    },
}));
