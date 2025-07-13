import { Trans } from "@lingui/react/macro";
import { StyleSheet } from "react-native-unistyles";

import { ThemedText } from "components/ThemedText";
import { ThemedView } from "components/ThemedView";

export const SettingsScreen = function () {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>
        <Trans>SettingsScreen</Trans>
      </ThemedText>
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
