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
    primary: "#6200ee", // Primary color (adjust as needed)
    accent: "#03dac4", // Accent color (adjust as needed)
    background: "#f6f6f6", // Background color
    surface: "#ffffff", // Surface color (cards, sheets, etc.)
    text: "#000000", // Primary text color
    onBackground: "#000000", // Text color on background
    onSurface: "#000000", // Text color on surface
    // Additional colors to override if needed
    // platform-specific overrides:
    ...Platform.select({
      ios: {
        primary: "#007AFF", // iOS blue
      },
      android: {
        primary: "#6200ee", // Android purple
      },
      web: {
        primary: "#6200ee", // Web purple (same as Android here)
      },
    }),
  },
  roundness: 4, // Adjust for iOS-like roundness
  animation: {
    scale: 1.0, // Default animation scale
  },
};

export default customTheme;
