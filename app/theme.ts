// theme.ts
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
} from "react-native-paper";
import { Platform } from "react-native";

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee",
    accent: "#03dac4",
    background: "#f6f6f6",
    surface: "#ffffff",
    text: "#000000",
    onBackground: "#000000",
    onSurface: "#000000",

    ...Platform.select({
      ios: {
        primary: "#007AFF", // iOS blue
      },
      android: {
        primary: "#6200ee", // Android purple
      },
      web: {
        primary: "#6200ee",
      },
    }),
  },
  roundness: 4,
  animation: {
    scale: 1.0,
  },
};

export default customTheme;
