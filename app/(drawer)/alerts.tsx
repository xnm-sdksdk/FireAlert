import Card from "@/components/ui/Card";
import { alertStore } from "@/store/alert.store";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";

export default function Alerts() {
  const alerts = alertStore((state) => state.alerts);
  const addAlert = alertStore((state) => state.addAlert);
  const removeAlert = alertStore((state) => state.removeAlert);
  const loadAlerts = alertStore((state) => state.loadAlerts);


  useEffect(() => {
    loadAlerts();
  }, []);
  
  if (!alerts || alerts.length === 0) return null;

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
