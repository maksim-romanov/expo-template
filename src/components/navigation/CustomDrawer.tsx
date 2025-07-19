import { DrawerContentScrollView, DrawerContentComponentProps } from "@react-navigation/drawer";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

import { ThemedText } from "components/ThemedText";
import { ThemedView } from "components/ThemedView";

interface DrawerItem {
  label: string;
  route: string;
}

const drawerItems: DrawerItem[] = [
  { label: "Home", route: "/(drawer)/home" },
  { label: "Orders", route: "/(drawer)/(top-tabs)/orders" },
  { label: "Status", route: "/(drawer)/(top-tabs)/status" },
  { label: "Settings", route: "/settings" },
  { label: "Options", route: "/options" },
];

export function CustomDrawer(props: DrawerContentComponentProps) {
  const { navigation } = props;

  const handleItemPress = (route: string) => {
    navigation.closeDrawer();
    router.push(route as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title">Menu</ThemedText>
          <ThemedText>Welcome back!</ThemedText>
        </ThemedView>

        {/* Navigation Items */}
        <ThemedView style={styles.menuSection}>
          {drawerItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleItemPress(item.route)}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.menuLabel}>{item.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>

        {/* Footer */}
        <ThemedView style={styles.footer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              navigation.closeDrawer();
              router.navigate("/logout");
            }}
          >
            <ThemedText>Logout</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme, runtime) => ({
  container: {
    flex: 1,
  },

  scrollView: {
    paddingTop: 0,
    flex: 1,
  },

  header: {
    padding: 20,
    // paddingTop: runtime.insets.top + 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary + "20",
  },

  menuSection: {
    paddingTop: 20,
    paddingHorizontal: 12,
    flex: 1,
  },

  menuItem: {
    padding: 16,
    marginVertical: 2,
    borderRadius: 8,
  },

  menuLabel: {
    fontSize: 16,
  },

  footer: {
    marginTop: 40,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.primary + "20",
  },

  logoutButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: theme.colors.secondary,
  },
}));
