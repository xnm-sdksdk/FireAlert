import Card from "@/components/ui/Card";
import { AlertType } from "@/constants/alertType";
import { alertStore } from "@/store/alert.store";
import React, { useEffect } from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Alerts() {
   const { alerts, addAlert, loadAlerts } = alertStore();

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleAddAlert = () => {
    addAlert({
      type: AlertType.Medium,
      title: "Test Alert",
      description: "This is a mock alert",
      time: new Date().toISOString(),
      location: "Lisbon",
    });
  };

  if (alerts.length === 0) {
    return <Text>No alerts at the moment!</Text>;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top"]}>
        <ScrollView style={{ flex: 1, height: 100 }}>
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
      </SafeAreaView>
      <TouchableOpacity
        style={{ position: "absolute", bottom: 20, right: 20 }}
        onPress={handleAddAlert}
      >
        <MaterialIcons name="add-circle" size={60} color="darkgrey" />
      </TouchableOpacity>
    </SafeAreaProvider>
  );
}
