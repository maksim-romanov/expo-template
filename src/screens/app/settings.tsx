import { Trans } from "@lingui/react/macro";
import { Link } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { ThemedText } from "components/ThemedText";

export const SettingsScreen = function () {
  return (
    <View style={styles.container}>
      <ThemedText>
        <Trans>SettingsScreen</Trans>
      </ThemedText>

      <Link href="/personal-info">
        <ThemedText>Personal info</ThemedText>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});
