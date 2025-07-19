import { Trans } from "@lingui/react/macro";
import { Link } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { ThemedText } from "components/ThemedText";

export const HomeScreen = function () {
  return (
    <View style={styles.container}>
      <ThemedText>
        <Trans>HomeScreen</Trans>
      </ThemedText>

      <Link href="/options" style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}>
        <ThemedText>Options</ThemedText>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
