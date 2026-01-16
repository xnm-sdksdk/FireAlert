import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useRef, useState } from "react";
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
  const MIN_ZOOM_LEVEL = 3;
  const MAX_ZOOM_LEVEL = 20;
  const [zoom, setZoom] = useState(15);
  const [selectedRegion, setSelectedRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const handleView = (zoomIn = false) => {
    let newZoom = zoom;

    if (zoomIn && zoom > MIN_ZOOM_LEVEL) {
      newZoom--;
    } else if (!zoomIn && zoom < MAX_ZOOM_LEVEL) {
      newZoom++;
    } else {
      return;
    }

    const [longitudeDelta, latitudeDelta] = getLatLongDelta(
      newZoom,
      selectedRegion.latitude
    );

    const newRegion = {
      ...selectedRegion,
      latitudeDelta,
      longitudeDelta,
    };

    setZoom(newZoom);
    setSelectedRegion(newRegion);
    if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 250);
    }
  };

  const getLatLongDelta = (
    zoom: number,
    latitude: number
  ): [number, number] => {
    const longitudeDelta = 360 / Math.pow(2, zoom);
    const latitudeDelta =
      longitudeDelta * (1 / Math.cos((latitude * Math.PI) / 180));
    return [longitudeDelta, latitudeDelta];
  };

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
      Alert.alert("Error", "Permission denied, location was not granted.");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = loc.coords;

    setMLat(latitude);
    setMLong(longitude);

    const region = {
      latitude,
      longitude,
      latitudeDelta: selectedRegion.latitudeDelta,
      longitudeDelta: selectedRegion.longitudeDelta,
    };

    setSelectedRegion(region);

    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 500);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        mapType="hybrid"
        initialRegion={selectedRegion}
      >
        <Marker coordinate={{ latitude: mLat, longitude: mLong }} />
      </MapView>

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 100,
          left: 20,
          opacity: zoom === MAX_ZOOM_LEVEL ? 0.2 : 1,
        }}
        onPress={() => handleView(false)}
        disabled={zoom === MAX_ZOOM_LEVEL}
      >
        <MaterialIcons name="add-box" size={32} color="lightgrey" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 65,
          left: 20,
          opacity: zoom === MIN_ZOOM_LEVEL ? 0.2 : 1,
        }}
        onPress={() => handleView(true)}
        disabled={zoom === MIN_ZOOM_LEVEL}
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
