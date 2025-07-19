import { useState } from "react";

import { Trans } from "@lingui/react/macro";
import { ActivityIndicator, Button } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { container } from "tsyringe";

import { ThemedText } from "components/ThemedText";
import { AuthService } from "modules/auth/services/auth-service";
import { TOKENS } from "modules/container/tokens";

import { ScreenModal } from "./shared/modal";

const authService = container.resolve<AuthService>(TOKENS.AUTH_SERVICE);

export const LogoutModal = function () {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await authService.logout();
    setIsLoading(false);
  };

  return (
    <ScreenModal>
      <ThemedText style={styles.container}>
        <Trans>Logout?</Trans>
      </ThemedText>

      {isLoading ? <ActivityIndicator /> : <Button onPress={handleLogout} title="Logout" />}
    </ScreenModal>
  );
};

const styles = StyleSheet.create((theme, runtime) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}));
