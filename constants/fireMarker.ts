import { AlertType } from "./alertType";
import { User } from "./user";

export type FireMarker = {
    id: string;
    latitude: number;
    longitude: number;
    severity: AlertType;
    description?: string;
    reportedAt: Date;
    reporter: User;
};

export type FireStore = {
    marker: FireMarker | null;
    markers: FireMarker[];
    addMarker: (marker: FireMarker) => Promise<void>;
    loadMarkers: () => Promise<void>;
    removeMarker: (id: string) => Promise<void>;
};
