import { FireStore } from "@/constants/fireMarker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const fireStore = create<FireStore>((set, get) => ({
    marker: null,
    markers: [],

    addMarker: async (marker) => { },
    removeMarker: async (id) => { },
    loadMarkers: async () => {
        const storedMarkers = await AsyncStorage.getItem("markers");
        if (storedMarkers) set({ marker: JSON.parse(storedMarkers) });
    },
}));

export default fireStore;
