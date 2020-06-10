import { createMuiTheme } from "@material-ui/core";

/**
 * Create global app theme using MUI.
 */
export const appTheme = createMuiTheme({
  spacing: 10,

  // Override the default MUI theme settings for components.
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          overflow: "hidden",
          position: "relative",
          height: "100vh",

          "& > #__next": {
            height: "100%",
          },
        },

        "ul, li": {
          paddingInlineStart: 0,
          marginBlockStart: 0,
          marginBlockEnd: 0,
          listStyle: "none",
        },

        p: {
          marginBlockStart: 0,
          marginBlockEnd: 0,
        },

        "a, button": {
          cursor: "pointer",
        },

        "input, a, button, textarea": {
          outline: "none",
          textDecoration: "none",
          boxShadow: "none",

          "-webkit-appearance": "none",

          "&:hover, &:active, &:focus, &:required": {
            textDecoration: "none",
            outline: "none",
            boxShadow: "none",
          },

          "&[disabled]": {
            cursor: "default",
          },
        },

        img: {
          maxWidth: "100%",
          maxHeight: "100%",
          height: "auto",
        },
      },
    },

    // Buttons.
    MuiButton: {
      root: {
        textAlign: "center",
      },
    },
  },
});
