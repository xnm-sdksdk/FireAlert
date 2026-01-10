import { AlertsState, AlertType } from "@/constants/alertType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const alertStore = create<AlertsState>((set, get) => ({
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

        if (stored === null) {
            // First app launch → seed storage
            const initial = get().alerts;
            await AsyncStorage.setItem("alerts", JSON.stringify(initial));
            set({ alerts: initial });
            return;
        }

        const parsed = JSON.parse(stored);

        // Guard against corrupted / empty data
        if (!Array.isArray(parsed)) {
            const fallback = get().alerts;
            await AsyncStorage.setItem("alerts", JSON.stringify(fallback));
            set({ alerts: fallback });
            return;
        }

        set({ alerts: parsed });
    },
}));

export default alertStore;
