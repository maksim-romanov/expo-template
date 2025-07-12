import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const ProfileScreen = function () {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
