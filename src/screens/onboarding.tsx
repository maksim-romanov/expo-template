import { Trans } from "@lingui/react/macro";
import { router } from "expo-router";
import { Button } from "react-native";
import Keys from "react-native-keys";
import { StyleSheet } from "react-native-unistyles";

import { ThemedText } from "components/ThemedText";
import { ThemedView } from "components/ThemedView";

export const OnboardingScreen = function () {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>
        <Trans>OnboardingScreen</Trans>
      </ThemedText>

      <ThemedText>{Keys.secureFor("SUPER_SECRET_KEY")}</ThemedText>

      <Button title="Login" onPress={() => router.replace("/login")} />
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
