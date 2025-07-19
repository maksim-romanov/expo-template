import { useState } from "react";

import { Trans, useLingui } from "@lingui/react/macro";
import { Button } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { container } from "tsyringe";

import { ThemedText } from "components/ThemedText";
import { ThemedView } from "components/ThemedView";
import { AuthService } from "modules/auth/services/auth-service";
import { TOKENS } from "modules/container/tokens";

const authService = container.resolve<AuthService>(TOKENS.AUTH_SERVICE);

export const LoginScreen = function () {
  const { t } = useLingui();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await authService.login("test@test.com", "123456");
    setIsLoading(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText>
        <Trans>LoginScreen</Trans>
      </ThemedText>
      <Button title={isLoading ? t`Logging in...` : t`Login`} onPress={handleLogin} disabled={isLoading} />
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
