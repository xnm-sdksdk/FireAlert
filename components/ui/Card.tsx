import { ALERT_CONFIG, CardProps } from "@/constants/alertType";
import React, { useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import alertStore from "../../store/alert.store";
import authStore from "@/store/auth.store";

export default function Card({
  id,
  description,
  type,
  time,
  location,
}: CardProps) {
  const config = ALERT_CONFIG[type];

  const store = useRef(alertStore.getState()).current;
  const { removeAlert } = store;

  const userStore = useRef(authStore.getState()).current;
  const { user } = userStore;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: config.color }]}>{type}</Text>
        <EvilIcons
          name="trash"
          size={32}
          color="red"
          onPress={() => removeAlert(id)}
        />
      </View>
      <Text style={styles.creator}>{user?.username}</Text>
      <Text style={styles.description}>{description || "No description"}</Text>
      <Text style={styles.time}>{time.toString().slice(0, 25)}</Text>
      <Text style={styles.location}>{location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginVertical: 6,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginVertical: 4,
    flexShrink: 1,
    marginBottom: 10,
  },
  creator: {
    fontSize: 16,
    fontWeight: 600,
    color: "#333",
    marginVertical: 4,
    flexShrink: 1,
    marginBottom: 10,
  },
  time: {
    fontSize: 12,
    marginTop: 6,
    color: "#555",
    marginBottom: 10,
  },
  location: {
    fontSize: 12,
    color: "#555",
    marginVertical: 4,
    flexShrink: 1,
  },
});
