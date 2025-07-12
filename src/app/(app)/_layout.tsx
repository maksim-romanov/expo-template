import { Stack } from "expo-router";

import { ServicesProvider } from "services";

export const appWrapper = <T extends object>(Component: React.ComponentType<T>) => {
  return function WrappedComponent(props: T) {
    return (
      <ServicesProvider>
        <Component {...props} />
      </ServicesProvider>
    );
  };
};

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
}
