import { Trans } from "@lingui/react/macro";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { ThemedText } from "components/ThemedText";

export const SettingsScreen = function () {
  return (
    <View style={styles.container}>
      <ThemedText>
        <Trans>SettingsScreen</Trans>
      </ThemedText>
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
