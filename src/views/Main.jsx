import { Outlet, useNavigate } from "react-router-dom";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Toolbar,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
import {
  GetUser,
  EndSession,
  isAdmin,
  thereIsSession,
  thereIsRestore
} from "../session/session";

const drawerWidth = 270;

const Body = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -270,
    marginTop: "5%",
    width: "82%",
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

export default function Main() {
  const navigate = useNavigate();
  const { data: calendars, isLoading, isError } = useCalendars();
  const [open, setOpen] = useState(true);
  const [admin, setIsAdmin] = useState(false);
  const [calendar, setCalendar] = useState(0);
  const [isEditGroup, setIsEditGroup] = useState(false);
  const [user, setUser] = useState({ name: "", role: "" });
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      if (!thereIsSession()){ 
        navigate("/Ingresar");
        isInitialMount.current = false;
      }
      else if (thereIsRestore()){
        navigate("/CambiarContraseña")
        isInitialMount.current = false;
      }
      
      const { Name, Role } = GetUser();
      setUser({ ...user, name: Name, role: Role });
      if (isAdmin()) setIsAdmin(true);
      isInitialMount.current = false;
    }
    if (!isLoading && !isError) {
      calendars.reverse();
      setCalendar(calendars[0].id);
    }
  }, [isLoading, calendars, isError]);

  const handleCloseSession = () => {
    EndSession();
    navigate("/Ingresar");
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (isLoading || isError)
    return (
      <Backdrop
        open={true}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {isError ? (
          <Typography mb={"1.5%"} variant="h5" color="secondary">
            Error de conexión con el servidor!
          </Typography>
        ) : (
          <p></p>
        )}
        <CircularProgress size={100} />
      </Backdrop>
    );

  return (
    <>
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
                width: drawerWidth,
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
                  mt: 0.45,
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
              <Typography>Usuario: {user.name}</Typography>
              <Typography>{RoleMap(user.role)}</Typography>
            </Box>

            <Typography mr={3}>Calendario: </Typography>
            <Select
              value={calendar}
              onChange={(e) => setCalendar(e.target.value)}
              sx={{
                backgroundColor: "#fff",
                mr: 10,
                borderRadius: 5,
                minWidth: 100,
                height: 40,
              }}
              disabled={isEditGroup}
            >
              <MenuItem key={-1} value={0}></MenuItem>
              {calendars.map((calendar, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={calendar.id}
                    sx={{ display: index < 3 ? "block" : "none" }}
                  >
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
            elevation: 16,
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
          <NavList admin={admin} />
        </Drawer>
        <Body open={open}>
          <Outlet
            context={[calendar, calendars, setCalendar, setIsEditGroup]}
          />
        </Body>
      </Box>
      {}
    </>
  );
}
