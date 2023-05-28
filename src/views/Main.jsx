import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import { Box } from "@mui/material";

export default function Main() {
  return (
    <>
      <NavBar />
      <Box sx={{ margin: "1% 0", marginLeft: "19.5%", width: "79.5%" }}>
        <Outlet />
      </Box>
    </>
  );
}
