import React, { useRef, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import authStore from "../../store/auth.store";

const Profile = () => {
  const store = useRef(authStore.getState()).current;
  const { user, updateUser, loadUser } = store;

  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState(user?.password || "");

  const handleUpdate = async () => {
    if (!username && !password) return;

    const success = await updateUser(username, password);
    if (success) {
      Alert.alert("Profile updated successfully");
      loadUser();
    } else {
      Alert.alert("Failed to update profile");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome to your profile {user?.username}
      </Text>

      <TextInput
        placeholder="Change Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Change Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FF4500",
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
