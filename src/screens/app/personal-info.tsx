import { Trans } from "@lingui/react/macro";
import { Link } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { ThemedText } from "components/ThemedText";

export const PersonalInfoScreen = function () {
  return (
    <View style={styles.container}>
      <ThemedText>
        <Trans>Personal info form</Trans>
      </ThemedText>

      <Link href="../">
        <ThemedText>Submit</ThemedText>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
});
