import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AlertsState } from "@/constants/alertType";

export const alertStore = create<AlertsState>((set, get)) => ({
    alerts: [],
    addAlert: async (alert) => { },
    loadAlerts: async () => { }
})