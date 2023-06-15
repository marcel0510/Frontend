import ApartmentIcon from "@mui/icons-material/Apartment";
import { Paper, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Buildings() {
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          height: "13%",
          padding: "17px 1.5%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ApartmentIcon sx={{ fontSize: 50, mr: "1.5%" }} />
        <Typography variant="h3" sx={{ flexGrow: 1 }}>
          Módulo de Edificios
        </Typography>
      </Paper>
      <Outlet />
    </>
  );
}
