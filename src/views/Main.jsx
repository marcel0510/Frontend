import { Outlet, useNavigate } from "react-router-dom";
import { Box, Button, Fab, Icon, IconButton, Paper, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import NavList from "../components/NavList";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import logo from "../assets/logo.png";


const drawerWidth = "18%";

const Body = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}`,
    marginTop: "4%",
    width: `82%`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      marginTop: "4%",
      width: `100%`,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    //width: `calc(100% - ${drawerWidth}px)`,
    //marginLeft: `${drawerWidth}px`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Img = styled("img")({
  width: 50,
  margin: 0,
  marginTop: 8
});

export default function Main() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("UserInfo")) {
      navigate("/");
    }
  }, []);

  const handleCloseSession = () => {
    localStorage.removeItem("UserInfo");
    window.location.href = "./";
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <AppBar
        position="fixed"
        open={open}
        sx={{ height: "10%", padding: 0, margin: 0 }}
        disableGutters
      >
        <Toolbar disableGutters>
          <Paper
            sx={{
              backgroundColor: "#001f3e",
              width: "18%",
              height: "100%",
              display: "flex",
              alignItems: "center"
            }}
            elevation={10}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-start", flexGrow: 1, paddingTop: 0.5 }}>
            <Box sx={{ backgroundColor: "#fff", ml: "3%", borderRadius: 4, height: 65 }}>
            <Img src={logo}  />
            </Box>
            <Typography variant="h2" color={"#fff"} noWrap sx={{ ml: 1 }}>
              FIEE
            </Typography>
            </Box>
            <IconButton
            disableRipple
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            sx={{backgroundColor: "#e31d1a", borderRadius: 5, height: "55%" }}
          >
            {
              open ? <KeyboardArrowLeftIcon />:<KeyboardArrowRightIcon />
            }
          </IconButton>
           
          </Paper>
          <Typography sx={{ flexGrow: 1 }} />
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleCloseSession}
            sx={{ mr: 4 }}
          >
            Cerrar Sesion
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <NavList />
      </Drawer>
      <Body open={open}>
        <Outlet />
      </Body>
    </Box>
  );
}
