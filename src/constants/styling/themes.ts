const lightTheme = {
  colors: {
    primary: "#2c2c2c",
    secondary: "#f8f8f8",
  },
  gap: (v: number) => v * 8,
};

const darkTheme = {
  colors: {
    primary: "#fafafa",
    secondary: "#1a1a1a",
  },
  gap: (v: number) => v * 8,
};

export const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};
