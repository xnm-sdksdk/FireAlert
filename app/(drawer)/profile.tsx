import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import authStore from "../../store/auth.store";

const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitData = (data: string) => {
    console.log(data);
  };
  const editData = (data: string) => {
    console.log(data);
  };

  const [username, onChangeText] = useState("");
  const [password, onChangeNumber] = useState("");

  const store = useRef(authStore.getState()).current;
  const { loadUser } = store;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome to your profile {store.user?.username}
      </Text>
      <TextInput
        placeholder="Change Username"
        style={styles.input}
        onChangeText={onChangeText}
        value={store.user?.username}
      />
      <TextInput
        placeholder="Change Password"
        style={styles.input}
        onChangeText={onChangeNumber}
        secureTextEntry
        value={store.user?.password}
      />
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput onChangeText={onChange} value={value} />
        )}
      />

      <SafeAreaView style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(editData)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(submitData)}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -40,
  },
  button: {
    flex: 1,
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
