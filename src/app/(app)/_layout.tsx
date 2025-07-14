import { Stack } from "expo-router";

import { useMinBreakpoint } from "hooks/unistyles";

export default function Layout() {
  const isLarge = useMinBreakpoint("lg");

  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="options"
        options={{
          presentation: "transparentModal",
          gestureEnabled: true,
          gestureDirection: isLarge ? "horizontal" : "vertical",
          headerShown: false,
          animation: "none",
        }}
      />
    </Stack>
  );
}
