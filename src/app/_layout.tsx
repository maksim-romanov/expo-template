import "react-native-reanimated";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";

import { ServicesProvider, useServices } from "services";

export const appWrapper = <T extends object>(Component: React.ComponentType<T>) => {
  return function WrappedComponent(props: T) {
    return (
      <ServicesProvider>
        <Component {...props} />
      </ServicesProvider>
    );
  };
};

export default appWrapper(
  observer(function RootLayout() {
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
  }),
);
