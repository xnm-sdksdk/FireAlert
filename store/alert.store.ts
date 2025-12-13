import { Alert, AlertsState } from "@/constants/alertType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const alertStore = create<AlertsState>((set, get) => ({
    alerts: [],
    addAlert: async (alert: Alert) => {
        const updated = [alert, ...get().alerts];
        set({ alerts: updated });
        await AsyncStorage.setItem("alerts", JSON.stringify(updated));
    },
    loadAlerts: async () => {
        const stored = await AsyncStorage.getItem("alerts");
        if (stored) set({ alerts: JSON.parse(stored) });
    },
}));
