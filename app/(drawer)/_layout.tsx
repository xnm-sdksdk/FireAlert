import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Map from "./map";
import Alerts from "./alerts";
import Profile from "./profile";
import Settings from "./settings";

const Drawer = createDrawerNavigator();

export default function Layout() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="map"
        component={Map}
        options={{
          drawerLabel: "Map",
          title: "Map",
        }}
      />
      <Drawer.Screen
        name="alerts"
        component={Alerts}
        options={{
          drawerLabel: "Alerts",
          title: "Alerts",
        }}
      />
      <Drawer.Screen
        name="profile"
        component={Profile}
        options={{
          drawerLabel: "Profile",
          title: "Profile",
        }}
      />
      <Drawer.Screen
        name="settings"
        component={Settings}
        options={{
          drawerLabel: "Settings",
          title: "Settings",
        }}
      />
    </Drawer.Navigator>
  );
}
