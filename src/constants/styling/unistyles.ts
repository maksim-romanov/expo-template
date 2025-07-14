import { StyleSheet } from "react-native-unistyles";

import { breakpoints } from "./breakpoints";
import { appThemes } from "./theme";

StyleSheet.configure({
  themes: appThemes,
  breakpoints,
  settings: {
    initialTheme: "light",
  },
});
