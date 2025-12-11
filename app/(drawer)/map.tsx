import { GoogleMaps } from "expo-maps";
import { Platform } from "react-native";

export default function Map() {
  if (Platform.OS === "android") {
    return <GoogleMaps.View style={{ flex: 1 }} />;
  }
}
