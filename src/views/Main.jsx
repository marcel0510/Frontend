import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import NavList from "../components/NavList";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import logo from "../assets/logo.png";
import { RoleMap } from "../helpers/user.helpers";
import { useCalendars } from "../hooks/Calendar.Hooks";

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
  marginTop: 8,
});

const userInfo = JSON.parse(localStorage.getItem("UserInfo"));

export default function Main() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [calendar, setCalendar] = useState(0);
  const { isLoading, data: calendars } = useCalendars();

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

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CircularProgress size={"8%"} sx={{ marginTop: "15%" }} />
      </Box>
    );

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <AppBar
        position="fixed"
        open={open}
        sx={{ height: "10%", padding: 0, margin: 0 }}
        
      >
        <Toolbar disableGutters>
          <Paper
            sx={{
              backgroundColor: "#001f3e",
              width: "18%",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
            elevation={10}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexGrow: 1,
                paddingTop: 0.5,
                mt: 0.45
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#fff",
                  ml: 2,
                  borderRadius: 4,
                  height: 65,
                 
                }}
              >
                <Img src={logo} />
              </Box>
              <Typography variant="h2" color={"#fff"} noWrap sx={{ ml: 1 }}>
                FIEE
              </Typography>
            </Box>
            <IconButton
              disableRipple
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              sx={{
                backgroundColor: "#e31d1a",
                borderRadius: 5,
                height: "55%",
              }}
            >
              {open ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
          </Paper>
          <Box
            sx={{
              ml: 5,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <Typography>Usuario: {userInfo["user"]["name"]}</Typography>
            <Typography>Perfil: {RoleMap(userInfo["user"]["role"])}</Typography>
          </Box>
         
            <Typography mr={3}>Calendario: </Typography>
            <Select
              value={calendar}
              labelId="calendario-select"
              onChange={(e) => setCalendar(e.target.value)}
              sx={{  backgroundColor: "#fff", mr: 10, borderRadius: 5, minWidth: 100, height: 40}}
            >
              <MenuItem key={-1} value={0}></MenuItem>
              {calendars.map((calendar, index) => {
                return (
                  <MenuItem key={index} value={calendar.id}>
                    <Typography>{calendar.period}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          

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
        <Outlet context={[calendar, setCalendar]} />
      </Body>
    </Box>
  );
}
