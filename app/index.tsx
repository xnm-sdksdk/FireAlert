import { useEffect } from "react";
import { router } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Entry = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/auth");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>FireAlert</Text>
        <View style={styles.iconSquare}>
          <FontAwesome5 name="fire" size={32} color="#fff" />
        </View>
      </View>
      <ActivityIndicator size={50} color="#FF4500" style={styles.loader} />
    </View>
  );
};

export default Entry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF4500",
  },
  iconSquare: {
    marginLeft: 12,
    marginTop: 0,
    width: 45,
    backgroundColor: "#FF4500",
    padding: 6,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    marginTop: 10,
  },
});
