import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { authStore } from "../store/auth.store";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);

  const signIn = authStore((state) => state.signIn);
  const signOut = authStore((state) => state.signOut);
  const loadUser = authStore((state) => state.loadUser);
  const register = authStore((state) => state.register);

  useEffect(() => {
    loadUser();
  }, []);

  const handleSignIn = async () => {
    if (!username || !password) return;

    if (isSignIn) {
      const successSignIn = await signIn(username, password);
      if (!successSignIn) return Alert.alert("Error", "Invalid Credentials.");
    } else {
      const successRegister = await register(username, password);
      if (!successRegister)
        return Alert.alert("Error", "Username already exists.");
    }

    router.replace("/(drawer)/map");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isSignIn ? "Login" : "Register"}</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>{isSignIn ? "Login" : "Register"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.switchButton]}
        onPress={() => setIsSignIn(!isSignIn)}
      >
        <Text style={[styles.buttonText, styles.switchText]}>
          {isSignIn ? "Switch to Register" : "Switch to Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 20 },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FF4500",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  switchButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF4500",
  },
  switchText: { color: "#FF4500", fontWeight: "600" },
});
