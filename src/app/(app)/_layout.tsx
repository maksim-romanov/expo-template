import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="options"
        options={{
          presentation: "transparentModal",
          gestureEnabled: true,
          gestureDirection: "vertical",
          headerShown: false,
          contentStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.35)",
          },
        }}
      />
    </Stack>
  );
}
