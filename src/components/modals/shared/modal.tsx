import { Link, router, useNavigation } from "expo-router";
import { Pressable } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  runOnJS,
  SlideInDown,
  SlideInRight,
  SlideOutDown,
  SlideOutRight,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";

import { useMinBreakpoint } from "hooks/unistyles";

export const ScreenModal = function ({ children }: React.PropsWithChildren) {
  const isLarge = useMinBreakpoint("lg");
  const navigation = useNavigation();
  const isPresented = router.canGoBack();

  const pan = Gesture.Pan().onUpdate((event) => {
    if (event.translationY > 100 && isPresented) runOnJS(navigation.goBack)();
  });

  return (
    <GestureHandlerRootView style={styles.flex}>
      <GestureDetector gesture={pan}>
        <Animated.View
          entering={isLarge ? FadeIn : FadeInDown}
          exiting={isLarge ? FadeOut : FadeOutDown}
          style={[styles.flex, styles.wrapper]}
        >
          <Link href={"../"} asChild>
            <Pressable style={StyleSheet.absoluteFill} />
          </Link>

          <Animated.View
            entering={isLarge ? SlideInRight : SlideInDown}
            exiting={isLarge ? SlideOutRight : SlideOutDown}
            style={styles.container}
          >
            {children}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create((theme, runtime) => ({
  flex: {
    flex: 1,
  },

  wrapper: {
    flexDirection: {
      md: "column-reverse",
      lg: "row-reverse",
    },
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  container: {
    backgroundColor: "white",
    paddingBottom: runtime.insets.bottom,
    minHeight: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,

    minWidth: runtime.screen.width * 0.3,
  },
}));
