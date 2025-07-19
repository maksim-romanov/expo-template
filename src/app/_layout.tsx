import "react-native-reanimated";

import React, { Suspense } from "react";

import { Toaster } from "burnt/web";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import { ActivityIndicator } from "react-native";
import { container } from "tsyringe";

import { I18nWrapper } from "components/internationalization";
import { BootstrapAppUseCase } from "modules/app/usecases/bootstrap-app";
import { type AuthService } from "modules/auth/services/auth-service";
import { TOKENS } from "modules/container/tokens";

SplashScreen.preventAutoHideAsync();
const authService = container.resolve<AuthService>(TOKENS.AUTH_SERVICE);

const RootStack = observer(function () {
  const isAuthenticated = authService.store.isAuthenticated;

  return (
    <>
      <Stack initialRouteName={isAuthenticated ? "(app)" : "onboarding"}>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="auto" />
    </>
  );
});

const initApp = async () => {
  const bootstrapAppUseCase = container.resolve<BootstrapAppUseCase>(TOKENS.BOOTSTRAP_APP_USE_CASE);
  await bootstrapAppUseCase.execute();
};

export default function RootLayout() {
  React.useEffect(() => {
    initApp();
  }, []);

  return (
    <Suspense fallback={<ActivityIndicator />}>
      <I18nWrapper>
        <RootStack />
        <Toaster />
      </I18nWrapper>
    </Suspense>
  );
}
