import Card from "@/components/ui/Card";
import { AlertType } from "@/constants/alertType";
import alertStore from "@/store/alert.store";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Alerts = () => {
  const [alerts, setAlerts] = useState(alertStore.getState().alerts);

  useEffect(() => {
    const unsub = alertStore.subscribe((state) => {
      setAlerts(state.alerts);
    });
    alertStore.getState().loadAlerts();

    return () => unsub();
  }, []);

  const handleAddAlert = () => {
    alertStore.getState().addAlert({
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
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      {alerts.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No alerts at the moment!</Text>
        </View>
      )}

      {alerts.length > 0 && (
        <ScrollView style={{ flex: 1 }}>
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
      )}

      <TouchableOpacity
        style={{ position: "absolute", bottom: 20, right: 20 }}
        onPress={handleAddAlert}
      >
        <MaterialIcons name="add-circle" size={60} color="darkgrey" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Alerts;
