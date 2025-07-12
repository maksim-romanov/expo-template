import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function OrdersScreen() {
  return (
    <View style={styles.container}>
      <Text>OrdersScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
