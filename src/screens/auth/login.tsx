import { Button, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { container } from "tsyringe";

import { AuthService } from "services/auth/auth.service";
import { AUTH_SERVICE } from "services/auth/tokens";

const authService = container.resolve<AuthService>(AUTH_SERVICE);

export function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <Button title="Login" onPress={() => authService.login()} />
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
