import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import {
  PermissionsAndroid,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";

const Map = () => {
  const [mLat, setMLat] = useState(0);
  const [mLong, setMLong] = useState(0);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const [zoom, setZoom] = useState(15);
  const handleView = (isZoomIn = false) => {};

  const requestLocationPermission = async () => {
    try {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (!hasPermission) {
        console.log("No location permission");
        return;
      }
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "FireAlert needs access to your location",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        return permission === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        console.log("Location permission denied");
        return permission === PermissionsAndroid.RESULTS.DENIED;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setMLat(loc.coords.latitude);
    setMLong(loc.coords.longitude);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} mapType="hybrid">
        <Marker coordinate={{ latitude: mLat, longitude: mLong }} />
      </MapView>

      <TouchableOpacity
        style={{ position: "absolute", bottom: 100, left: 20 }}
        onPress={() => handleView(true)}
      >
        <MaterialIcons name="add-box" size={32} color="lightgrey" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ position: "absolute", bottom: 65, left: 20 }}
        onPress={() => handleView(true)}
      >
        <Entypo name="squared-minus" size={32} color="lightgrey" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ position: "absolute", bottom: 65, right: 20 }}
        onPress={getLocation}
      >
        <MaterialIcons name="my-location" size={32} color="lightgrey" />
      </TouchableOpacity>
    </View>
  );
};

export default Map;
