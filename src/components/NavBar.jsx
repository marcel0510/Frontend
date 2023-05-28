import {
  AppBar,
  Box,
  Drawer,
  Fab,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import NavList from "./NavList";
import { useState } from "react";
import styled from "@emotion/styled";

import logo from "../assets/logo.png";

const Img = styled("img")({
  width: "100%",
  marginTop: "10%",
});

export default function NavBar() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <AppBar position="static">
        <Toolbar></Toolbar>
      </AppBar>
      <Paper>
        <Drawer
          variant="permanent"
          PaperProps={{ sx: { width: "18.5%" }, elevation: 16 }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Menú
              </Typography>

              <Box sx={{ bgcolor: "#fff", width: "18%", borderRadius: 3,}}>
                <Img src={logo} alt="Escudo de la EPN" />
              </Box>
            </Toolbar>
          </AppBar>
          <NavList />
        </Drawer>
      </Paper>
    </>
  );
}
