import { Stack } from "expo-router";
import { useUnistyles } from "react-native-unistyles";

export default function Layout() {
  const unistyles = useUnistyles();
  console.log("res.rt.breakpoint: ", unistyles.rt.breakpoint);

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
          animation: "none",
        }}
      />
    </Stack>
  );
}
