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
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import authStore from "../../store/auth.store";

const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitData = (data) => {
    console.log(data);
  };
  const editData = (data) => {
    console.log(data);
  };
  const [username, onChangeText] = React.useState("Useless Text");
  const [password, onChangeNumber] = React.useState("");

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
        value={username}
      />
      <TextInput
        placeholder="Change Password"
        style={styles.input}
        onChangeText={onChangeNumber}
        secureTextEntry
        value={password}
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
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(submitData)}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  header: {
    fontSize: 20,
    marginTop: 0,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 18,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 150,
    borderRadius: 18,
    margin: 10,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
