import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const ConfirmationScreen = function () {
  return (
    <View style={styles.container}>
      <Text>ConfirmationScreen</Text>
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
