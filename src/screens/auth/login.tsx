import { observer } from "mobx-react-lite";
import { Button } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { container } from "tsyringe";

import { ThemedText } from "components/ThemedText";
import { ThemedView } from "components/ThemedView";
import { AuthService } from "services/auth/auth.service";

const authService = container.resolve(AuthService);

export const LoginScreen = observer(function () {
  const isLoading = authService.authStore.isLoading;

  return (
    <ThemedView style={styles.container}>
      <ThemedText>LoginScreen</ThemedText>
      <Button title={isLoading ? "Logging in..." : "Login"} onPress={() => authService.login()} disabled={isLoading} />
    </ThemedView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
