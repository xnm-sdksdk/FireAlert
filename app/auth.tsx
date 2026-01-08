import { router } from "expo-router";
import { View, Button } from "react-native";

const Auth = () => {
  return (
    <View>
      <Button
        title="Login"
        onPress={() => router.replace("/(drawer)/map")}
      />
    </View>
  );
}

export default Auth;