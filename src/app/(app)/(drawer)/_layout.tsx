import { Drawer } from "expo-router/drawer";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer>
        <Drawer.Screen name="(top-tabs)" />
        <Drawer.Screen name="home" />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
