import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

export default function Calendar() {
  const navigate = useNavigate();
  const [, calendars, setCalendar] = useOutletContext();
  const [isEdit, setIsEdit] = useState(false);
  const [isSee, setIsSee] = useState(false);
  const [filter, setFilter] = useState("");

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          padding: "17px 1.5%",
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <CalendarMonthIcon sx={{ fontSize: 50, mr: "1.5%" }} />
          <Typography variant="h3" sx={{ flexGrow: 1 }}>
            Módulo de Calendarios
          </Typography>
          {isEdit ? (
            <IconButton onClick={() => navigate("/Main/Calendarios/Ver")}>
              <ArrowBackIcon color="primary" />
            </IconButton>
          ) : (
            <p />
          )}
        </Box>
        {isSee ? (
          <>
            <Divider />
            <Box
              component={"fieldset"}
              sx={{ mt: 1, ml: 9, border: "1px solid #fff" }}
            >
              <legend>
                <Typography variant="body2">Filtrar por :</Typography>
              </legend>
              <TextField
                label="Periodo"
                size="small"
                sx={{ mt: 1.7 }}
                value={filter}
                inputProps={{ maxLength: 5 }}
                onChange={(e) => setFilter(e.target.value.toUpperCase())}
              />
            </Box>
          </>
        ) : (
          <p />
        )}
      </Paper>
      <Outlet
        context={[calendars, setCalendar, isEdit, setIsEdit, setIsSee, filter]}
      />
    </>
  );
}
