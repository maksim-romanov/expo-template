import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text>OnboardingScreen</Text>
      <Button title="Login" onPress={() => router.replace("/login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
