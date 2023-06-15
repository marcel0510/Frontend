import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { Paper, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Calendar(){
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
            <CalendarMonthIcon sx={{ fontSize: 50, mr: "1.5%" }} />
            <Typography variant="h3" sx={{ flexGrow: 1 }}>
              Módulo de Calendarios
            </Typography>
          </Paper>
          <Outlet />
        </>
      );
}