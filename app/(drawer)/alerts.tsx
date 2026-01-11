import Card from "@/components/ui/Card";
import { ALERT_CONFIG, AlertType } from "@/constants/alertType";
import alertStore from "@/store/alert.store";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const Alerts = () => {
  const [alerts, setAlerts] = useState(alertStore.getState().alerts);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState();
  
  const [image, setImage] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
    
  useEffect(() => {
    const unsub = alertStore.subscribe((state) => {
      setAlerts(state.alerts);
    });
    alertStore.getState().loadAlerts();

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

  const handleAddAlert = () => {
    // alertStore.getState().addAlert({
    //   id: Date.now(),
    //   type: AlertType.Medium,
    //   title: "Test Alert",
    //   description: "This is a mock alert",
    //   time: Date.now(),
    //   location: "Lisbon",
    // });
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
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
              Add Alert
            </Text>

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
            />

            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
              <Text style={styles.photoButtonText}>
                {image ? "Change photo" : "Add photo"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "#FF4500",
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={pickImage}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "#FF4500",
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={takePhoto}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Take</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  description: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    marginBottom: 20,
    height: 120,
    flex: 1,
    flexDirection: "row",
    textAlign: "left",
  },
  label: {},
  photoButton: {
    backgroundColor: "#555",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  photoButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  severityPicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
});
