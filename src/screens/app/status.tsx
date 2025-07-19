import { Trans } from "@lingui/react/macro";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { ThemedText } from "components/ThemedText";

export const StatusScreen = function () {
  return (
    <View style={styles.container}>
      <ThemedText>
        <Trans>StatusScreen</Trans>
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
