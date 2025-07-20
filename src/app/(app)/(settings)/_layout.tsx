import { Stack } from "expo-router";
import Drawer from "expo-router/drawer";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import { ScreenModal } from "components/modals/shared/modal";
import { useMinBreakpoint } from "hooks/unistyles";

export default function Layout() {
  const unistyles = useUnistyles();
  const isLarge = useMinBreakpoint("lg");

  // if (isLarge) {
  //   return (
  //     <GestureHandlerRootView style={styles.container}>
  //       <Drawer
  //         initialRouteName="settings"
  //         screenOptions={{
  //           drawerType: unistyles.rt.breakpoint === "xl" ? "permanent" : "front",
  //           headerBackButtonDisplayMode: "minimal",
  //         }}
  //       >
  //         <Drawer.Screen name="settings" />
  //         <Drawer.Screen name="personal-info)" />
  //       </Drawer>
  //     </GestureHandlerRootView>
  //   );
  // }

  return (
    <Stack initialRouteName="settings">
      <Stack.Screen name="settings" options={{}} />
      <Stack.Screen name="personal-info" options={{}} />
    </Stack>
  );
}

const styles = StyleSheet.create((theme, runtime) => ({
  container: {
    flex: 1,
  },
}));
