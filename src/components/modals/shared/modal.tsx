import { Link, useNavigation } from "expo-router";
import { Pressable, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn, runOnJS } from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";

export const ScreenModal = function ({ children }: React.PropsWithChildren) {
  const navigation = useNavigation();

  const pan = Gesture.Pan().onUpdate((event) => {
    if (event.translationY > 100) {
      runOnJS(navigation.goBack)();
    }
  });

  return (
    <GestureHandlerRootView style={styles.flex}>
      <GestureDetector gesture={pan}>
        <Animated.View entering={FadeIn} style={[styles.flex, styles.wrapper]}>
          <Link href={"../"} asChild>
            <Pressable style={StyleSheet.absoluteFill} />
          </Link>

          <View style={styles.container}>{children}</View>
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
    flexDirection: "column-reverse",
  },
  container: {
    backgroundColor: "white",
    paddingBottom: runtime.insets.bottom,
    minHeight: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
}));
