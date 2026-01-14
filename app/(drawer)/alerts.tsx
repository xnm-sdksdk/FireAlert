import Card from "@/components/ui/Card";
import { AlertType, AlertI } from "@/constants/alertType";
import alertStore from "@/store/alert.store";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import authStore from "@/store/auth.store";
import * as Location from "expo-location";

const Alerts = () => {
  const [alerts, setAlerts] = useState<AlertI[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState<AlertType>(
    AlertType.Medium
  );

  const [image, setImage] = useState<any | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const currentUserId = authStore.getState().user?.id;
    if (!currentUserId) return;

    alertStore
      .getState()
      .loadAlerts()
      .then(() => {
        const allAlerts = alertStore.getState().alerts;
        setAlerts(allAlerts.filter((alert) => alert.userId === currentUserId));
      });

    const unsub = alertStore.subscribe((state) => {
      setAlerts(state.alerts.filter((alert) => alert.userId === currentUserId));
    });

    return () => unsub();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      quality: 1,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const coords = `${loc.coords.latitude.toFixed(
      5
    )}, ${loc.coords.longitude.toFixed(5)}`;
    setLocation(coords);
  };

  const handleAddAlert = () => {
    const userId = authStore.getState().user?.id;
    if (!userId) return;

    alertStore.getState().addAlert({
      userId,
      type: selectedSeverity,
      severity: selectedSeverity,
      description,
      location: location || "",
      image: image,
    });

    setDescription("");
    setLocation("");
    setImage(null);
    setSelectedSeverity(AlertType.Medium);
    setOpenModal(false);
  };

  // if (alerts.length === 0) {
  //   return <Text>No alerts at the moment!</Text>;
  // }

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
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              id={alert.id}
              type={alert.type}
              description={alert.description}
              time={alert.time}
              location={alert.location}
            />
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={{ position: "absolute", bottom: 20, right: 20 }}
        onPress={() => setOpenModal(true)}
      >
        <MaterialIcons name="add-circle" size={60} color="darkgrey" />
      </TouchableOpacity>

      <Modal
        visible={openModal}
        animationType="slide"
        transparent
        onRequestClose={() => setOpenModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "90%",
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Alert</Text>
              <TouchableOpacity onPress={() => setOpenModal(false)}>
                <AntDesign name="close-circle" size={26} color="darkgrey" />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{ marginBottom: 10 }}>GPS Location</Text>
              <TextInput
                placeholder="Location"
                style={styles.location}
                value={location}
                onChangeText={(text) => setLocation(text)}
              />
              <Text
                onPress={getLocation}
                style={{ color: "lightblue", marginTop: 10 }}
              >
                Update Location
              </Text>
            </View>

            <Picker
              selectedValue={selectedSeverity}
              onValueChange={(value) => setSelectedSeverity(value)}
              style={styles.severityPicker}
            >
              {Object.values(AlertType).map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>

            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Describe what you see (size, location, details, nearby landmarks...)"
              style={styles.description}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            <View style={styles.warningBox}>
              <Text style={styles.warningTopText}>Important!</Text>
              <Text style={styles.warningDownText}>
                Only report actual fires. False reports may delay emergency
                response and put lives at risk.
              </Text>
            </View>

            <View style={styles.photoRow}>
              <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                <Text style={styles.photoButtonText}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
                <Text style={styles.photoButtonText}>Camera</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddAlert}
            >
              <Text style={styles.submitButtonText}>Submit Alert</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  photoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  label: {},
  photoButton: {
    flex: 1,
    backgroundColor: "#FF4500",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 6,
  },
  photoButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  location: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    marginBottom: 8,
    marginTop: 8,
  },
  description: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    height: 120,
    padding: 12,
    textAlignVertical: "top",
    marginBottom: 16,
    marginTop: 8,
  },
  warningBox: {
    backgroundColor: "#fce6de",
    borderColor: "#ffa787",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  warningTopText: {
    color: "#ed470a",
    fontWeight: "600",
    marginBottom: 12,
  },
  warningDownText: {
    color: "#ed470a",
    fontWeight: "600",
  },
  severityPicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 8,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#FF4500",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
