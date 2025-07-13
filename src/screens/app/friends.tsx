import { StyleSheet } from "react-native-unistyles";

import { ThemedText } from "components/ThemedText";
import { ThemedView } from "components/ThemedView";

export const FriendsScreen = function () {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>FriendsScreen</ThemedText>
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
