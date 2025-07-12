import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const FriendsScreen = function () {
  return (
    <View style={styles.container}>
      <Text>FriendsScreen</Text>
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
