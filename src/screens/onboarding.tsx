import { Trans } from "@lingui/react/macro";
import { router } from "expo-router";
import { Button, View } from "react-native";
import Keys from "react-native-keys";
import { StyleSheet } from "react-native-unistyles";

import { ThemedText } from "components/ThemedText";

export const OnboardingScreen = function () {
  return (
    <View style={styles.container}>
      <ThemedText>
        <Trans>OnboardingScreen</Trans>
      </ThemedText>

      <ThemedText>{Keys.secureFor("SUPER_SECRET_KEY")}</ThemedText>

      <Button title="Login" onPress={() => router.replace("/login")} />
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
