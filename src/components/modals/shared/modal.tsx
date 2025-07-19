import { Link, router, useNavigation } from "expo-router";
import { Pressable, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";

export const ScreenModal = function ({ children }: React.PropsWithChildren) {
  const navigation = useNavigation();
  const isPresented = router.canGoBack();

  const pan = Gesture.Pan().onUpdate((event) => {
    if (event.translationY > 100 && isPresented) runOnJS(navigation.goBack)();
  });

  return (
    <GestureHandlerRootView style={styles.flex}>
      <GestureDetector gesture={pan}>
        <View style={[styles.flex, styles.wrapper]}>
          <Link href={"../"} asChild>
            <Pressable style={StyleSheet.absoluteFill} />
          </Link>

          <View style={styles.container}>{children}</View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create((theme, runtime) => ({
  flex: {
    flex: 1,
  },

  wrapper: {
    justifyContent: {
      lg: "center",
    },
    alignItems: {
      lg: "center",
    },
    flexDirection: "column-reverse",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  container: {
    backgroundColor: "white",
    paddingBottom: runtime.insets.bottom,
    minHeight: 200,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderRadius: 16,

    width: "100%",

    maxWidth: {
      lg: runtime.screen.width * 0.5,
    },
  },
}));
