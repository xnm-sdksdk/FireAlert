import { ALERT_CONFIG, CardProps } from "@/constants/alertType";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Card({ title, description, type, time, location }: CardProps) {
  const config = ALERT_CONFIG[type];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {/* <FontAwesome
          name={config.icon}
          size={24}
          color={config.color}
          style={styles.icon}
        /> */}

        <Text style={[styles.title, { color: config.color }]}>
          {type}
        </Text>
      </View>

      <Text style={styles.description}>{description}</Text>
      <Text style={styles.time}>{time}</Text>
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
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    marginVertical: 4,
  },
  time: {
    fontSize: 12,
    marginTop: 6,
    color: "#555",
  },
  location: {
    fontSize: 12,
    color: "#555",
  },
});