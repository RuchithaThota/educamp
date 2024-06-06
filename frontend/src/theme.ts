// src/theme.js
import { background, extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "Poppins, sans-serif",
        minHeight: "100vh",
        background: "#FAF9F6",
        color: "#000",
      },
      a: {
        _hover: {
          color: "blue",
        },
      },
    },
  },
  colors: {
    primary: {
      300: "#E8FCF5",
      400: "#D1F9EB",
      500: "#0bc279",
      600: "#0aa366",
    },
    secondary: {
      400: "#0f2830",
      500: "#00684a",
      600: "#00563a",
    },
    background: {
      primary: "#FAF9F6",
    },
    grey: {
      200: "#F3F4F7",
      500: "#808e9d",
    },
  },
});

export const flexCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default customTheme;
