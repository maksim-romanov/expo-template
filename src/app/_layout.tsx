import "react-native-reanimated";

import React, { Suspense } from "react";

import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import { ActivityIndicator } from "react-native";

import { I18nWrapper } from "components/internationalization";
import { initServices, ServicesProvider, useServices } from "services";

SplashScreen.preventAutoHideAsync();

const RootStack = observer(function () {
  const { authService } = useServices();
  const isAuthenticated = authService.authStore.isAuthenticated;

  return (
    <>
      <Stack initialRouteName="onboarding">
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
  try {
    await initServices();
  } finally {
    SplashScreen.hide();
  }
};

export default function RootLayout() {
  React.useEffect(() => {
    initApp();
  }, []);

  return (
    <Suspense fallback={<ActivityIndicator />}>
      <I18nWrapper>
        <ServicesProvider>
          <RootStack />
        </ServicesProvider>
      </I18nWrapper>
    </Suspense>
  );
}
