import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import { CustomDrawer } from "components/navigation/CustomDrawer";

export default function Layout() {
  const unistyles = useUnistyles();

  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer
        initialRouteName="home"
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          drawerType: unistyles.rt.breakpoint === "xl" ? "permanent" : "front",
        }}
      >
        <Drawer.Screen name="(top-tabs)" />
        <Drawer.Screen name="home" />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create((theme, runtime) => ({
  container: {
    flex: 1,
  },
}));
