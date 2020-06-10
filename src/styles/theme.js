import { createMuiTheme } from "@material-ui/core";

/**
 * Create global app theme using MUI.
 */
export const appTheme = createMuiTheme({
  spacing: 10,

  // Override the default MUI theme settings for components.
  overrides: {
    // Buttons.
    MuiButton: {
      root: {
        textAlign: "center",
      },
    },
  },
});
