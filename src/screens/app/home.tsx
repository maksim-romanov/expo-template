import { StyleSheet } from "react-native-unistyles";

import { ThemedText } from "components/ThemedText";
import { ThemedView } from "components/ThemedView";

export const HomeScreen = function () {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>HomeScreen</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
