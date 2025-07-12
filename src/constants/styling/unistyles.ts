import { StyleSheet } from "react-native-unistyles";

import { breakpoints } from "./breakpoints";
import { appThemes } from "./themes";

export const settings = {
  // initialTheme: "light",
  adaptiveThemes: true,
};

StyleSheet.configure({
  themes: appThemes,
  breakpoints,
  settings,
});
