import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import { styled, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems } from "./MainListItems";
import UserAvatar from "../components/UserAvatar";
import mdTheme from "./muiTheme";
import Image from "next/image";
import logo from "../assets/logo.PNG";

import "../styles/globals.css";

const queryClient = new QueryClient();
function Copyright() {
  return (
    <Typography variant="subtitle1" align="left" color="primary" sx={{ pt: 4 }}>
      Terms&Conditions | Privacy policy
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  borderBottom: "1px solid #F3F6F9",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    borderRight: "0",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function MyApp({ Component, pageProps }) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open} color="inherit" elevation={0}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >

                <Image src={logo} alt="me" width="40" height="50" />


              <Typography sx={{ flexGrow: 1 }} noWrap>
                <IconButton
                  edge="start"
                  color="primary"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginLeft: "36px",

                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Typography>
              <UserAvatar />
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open} elevation={0}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List><MainListItems /></List>
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="false" sx={{ mt: 8, mb: 8 }}>
              <Grid container spacing={3}>
                <Component {...pageProps} />
              </Grid>
              <Copyright />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
