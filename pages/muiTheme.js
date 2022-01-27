import { createTheme } from "@mui/material/styles";

export default createTheme({
  typography: {
    fontFamily: ['"Roboto"', "sans-serif"].join(","),
    subtitle1: {
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: "#005B96",
    },
    secondary: {
      main: "#1BC5BD",
    },

    text: {
      primary: "#011F4B",
      secondary: "#7E8299",
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 5,
          backgroundColor: "#F1FAFE",
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderTop: "0",
          marginBottom: 8,
          "&:before": {
            display: "none",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          borderRadius: 10,
          minHeight: 71,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#F1FAFE",
          },
        },
        head: {
          backgroundColor: "white !important",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          minWidth: "inherit !important",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: 0,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: "#1BC5BD",
          color: "white",
        },
        icon: {
          color: "white",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          backgroundColor: "transparent",
          color: "white",
        },
        root: {
          backgroundColor: "#1BC5BD",
          color: "white",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        edgeEnd: {
          color: "white",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});
