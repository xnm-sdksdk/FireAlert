import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import authStore from "@/store/auth.store";

export default function Layout() {
  const signOut = authStore((state) => state.signOut);

  return (
    <Drawer
      screenOptions={{ headerShown: true }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItem
            label="Map"
            onPress={() => props.navigation.navigate("map")}
          />
          <DrawerItem
            label="Alerts"
            onPress={() => props.navigation.navigate("alerts")}
          />
          <DrawerItem
            label="Profile"
            onPress={() => props.navigation.navigate("profile")}
          />
          <DrawerItem
            label="Settings"
            onPress={() => props.navigation.navigate("settings")}
          />

          {/* separator is optional */}
          <DrawerItem label="Sign Out" onPress={signOut} />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen name="map" options={{ title: "Map" }} />
      <Drawer.Screen name="alerts" options={{ title: "Alerts" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
    </Drawer>
  );
}
