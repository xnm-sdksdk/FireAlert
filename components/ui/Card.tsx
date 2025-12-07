import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Card({ title, description, type, time, location }) {
  return (
    <View style={styles.card}>
      {/* <FontAwesome name="fire-alt" size={30} color="#fff" style={styles.type}>{type}</FontAwesome> */}
      <Text style={styles.title}>{title}</Text>
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
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  description: {},
  type: {},
  time: {},
  location: {},
});
