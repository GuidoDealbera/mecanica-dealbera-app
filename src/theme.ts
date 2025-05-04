import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
  }
}

const baseTheme = createTheme({
  palette: {
    primary: {
      light: "#6573c3",
      main: "#3f51b5",
      dark: "#2c387e",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#f73378",
      main: "#f50057",
      dark: "#ab003c",
      contrastText: "#ffffff",
    },
    tertiary: {
      light: "#4aedc4",
      main: "#1de9b6",
      dark: "#14a37f",
      contrastText: "#000000",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  typography: {
    fontFamily: `'Nunito Sans', sans-serif`,
    h1: {
      fontFamily: `'Michroma', sans-serif`,
    },
  },
});

const theme = createTheme({
  ...baseTheme,
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          overflowX: "auto",
        },
        columnHeader: {
          backgroundColor: baseTheme.palette.primary.main,
          ...baseTheme.typography,
          color: baseTheme.palette.primary.contrastText,
        },
        menuIcon: {
          color: baseTheme.palette.primary.contrastText,
        },
        sortIcon: {
          color: baseTheme.palette.primary.contrastText,
        },
        row: {
          "&:nth-of-type(odd)": {
            backgroundColor: baseTheme.palette.grey[50],
          },
          "&:hover": {
            backgroundColor: baseTheme.palette.grey[200], // Fondo al pasar el mouse
          },
        },
        cell: {
          "&:focus": {
            outline: "none", // Quitar el borde al seleccionar la celda
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: baseTheme.palette.primary.main,
          fontSize: 12,
          fontWeight: 700
        }
      }
    },
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: baseTheme.palette.primary.dark,
          color: "white",
          "&:hover": {
            backgroundColor: baseTheme.palette.primary.main
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "contained" && {
            backgroundColor: theme.palette.primary.dark,
            color: "white",
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
            "&:disabled": {
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.primary.light,
            },
          }),
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: baseTheme.palette.grey[500],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: baseTheme.palette.primary.contrastText,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: baseTheme.palette.primary.contrastText,
            borderWidth: 2,
          },
        },
        input: {
          color: baseTheme.palette.primary.contrastText
        }
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: baseTheme.palette.grey[500],
          "&.Mui-focused": {
            color: baseTheme.palette.primary.contrastText,
          },
        },
      },
    },
  },
});

export default theme;
