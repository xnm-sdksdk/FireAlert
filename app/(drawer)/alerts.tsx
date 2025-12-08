import Card from "@/components/ui/Card";
import { AlertType, CardProps } from "@/constants/alertType";
import React from "react";
import { ScrollView } from "react-native";

export default function Alerts() {
  const alerts: CardProps[] = [
    {
      type: AlertType.Critical,
      title: "Fire near forest",
      description: "Location: North Park",
      time: "2",
      location: "3.2",
    },
    {
      type: AlertType.Medium,
      title: "Smoke detected",
      description: "Location: Downtown",
      time: "2",
      location: "3.2",
    },
    {
      type: AlertType.Contained,
      title: "Cleared area",
      description: "No danger now",
      time: "2",
      location: "3.2",
    },
  ];

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      {alerts.map((alert, index) => (
        <Card
          key={index}
          type={alert.type}
          title={alert.title}
          description={alert.description}
          time={alert.time}
          location={alert.location}
        />
      ))}
    </ScrollView>
  );
}
