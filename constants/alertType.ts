export enum AlertType {
    Critical = "Critical Fire Alert",
    Medium = "Medium Fire Alert",
    Low = "Low Fire Alert",
    Warning = "Fire Warning",
    Contained = "Fire Contained",
    Extinguished = "Fire Extinguished",
    NewFire = "New Fire Detected"
}

export interface CardProps {
    title: string,
    type: AlertType;
    description: string;
    time: string;
    location: string;
}

export interface AlertUIConfig {
    icon: string;
    color: string;
}

export const ALERT_CONFIG: Record<AlertType, AlertUIConfig> = {
    [AlertType.Critical]: {
        icon: "fire",
        color: "#d32f2f",
    },
    [AlertType.Medium]: {
        icon: "fire",
        color: "#f57c00",
    },
    [AlertType.Low]: {
        icon: "fire",
        color: "#ffb300",
    },
    [AlertType.Warning]: {
        icon: "warning",
        color: "#ffa000",
    },
    [AlertType.Contained]: {
        icon: "check-circle",
        color: "#388e3c",
    },
    [AlertType.Extinguished]: {
        icon: "check",
        color: "#4caf50",
    },
    [AlertType.NewFire]: {
        icon: "bell",
        color: "#1976d2",
    },
};
