import { AlertI, AlertsState, AlertType, NewAlert } from "@/constants/alertType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const alertStore = create<AlertsState>((set, get) => ({
    alert: null,
    alerts: [],

    addAlert: async (alert: NewAlert) => {
        const newAlert: AlertI = {
            ...alert,
            id: Date.now(),
            time: new Date(),
            severity: alert.severity || alert.type,
        } as AlertI;

        const updated = [newAlert, ...get().alerts];
        set({ alerts: updated });
        await AsyncStorage.setItem("alerts", JSON.stringify(updated));
    },

    removeAlert: async (id: number) => {
        const updated = get().alerts.filter((alert) => alert.id !== id);
        set({ alerts: updated });
        await AsyncStorage.setItem("alerts", JSON.stringify(updated));
    },
    loadAlerts: async () => {
        const stored = await AsyncStorage.getItem("alerts");

        if (!stored) {
            set({ alerts: [] });
            return;
        }

        try {
            const parsed = JSON.parse(stored);

            if (!Array.isArray(parsed)) {
                throw new Error("Invalid alerts format");
            }

            const alerts: AlertI[] = parsed.map((a: any) => ({
                ...a,
                time: new Date(a.time),
            }));

            set({ alerts });
        } catch {
            await AsyncStorage.setItem("alerts", JSON.stringify([]));
            set({ alerts: [] });
        }
    },
}));

export default alertStore;
