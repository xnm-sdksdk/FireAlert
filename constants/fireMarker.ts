import { AlertType } from "./alertType";
import { User } from "./user";

export type FireMArker = {
    latitude: number;
    longitude: number;
    severity: AlertType;
    description?: string;
    reportedAt: Date;
    reporter: User;
};
