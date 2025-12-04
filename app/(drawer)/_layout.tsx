import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="map"
        options={{
          drawerLabel: 'Map',
          title: 'maps',
        }}
      />
      <Drawer.Screen
        name="history"
        options={{
          drawerLabel: 'History',
          title: 'history',
        }}
      />
       <Drawer.Screen
        name="alerts"
        options={{
          drawerLabel: 'Alerts',
          title: 'alerts',
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profile',
          title: 'profile',
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'settings',
        }}
      />
    </Drawer>
  );
}
