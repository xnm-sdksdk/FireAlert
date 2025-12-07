import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="map"
        options={{
          drawerLabel: 'Map',
          title: 'Map',
        }}
      />
       <Drawer.Screen
        name="alerts"
        options={{
          drawerLabel: 'Alerts',
          title: 'Alerts',
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profile',
          title: 'Profile',
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
        }}
      />
    </Drawer>
  );
}
