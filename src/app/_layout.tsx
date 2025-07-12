import "react-native-reanimated";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import { container } from "tsyringe";

import { AuthService } from "services/auth/auth.service";
import { AUTH_SERVICE } from "services/auth/tokens";

const authService = container.resolve<AuthService>(AUTH_SERVICE);

export default observer(function RootLayout() {
  const isAuthenticated = authService.authStore.isAuthenticated;

  return (
    <>
      <Stack initialRouteName="onboarding">
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="auto" />
    </>
  );
});
