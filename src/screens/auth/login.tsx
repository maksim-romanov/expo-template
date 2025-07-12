import { observer } from "mobx-react-lite";
import { Button, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { container } from "tsyringe";

import { AuthService } from "services/auth/auth.service";

const authService = container.resolve(AuthService);

export const LoginScreen = observer(function () {
  const isLoading = authService.authStore.isLoading;

  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <Button title={isLoading ? "Logging in..." : "Login"} onPress={() => authService.login()} disabled={isLoading} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
