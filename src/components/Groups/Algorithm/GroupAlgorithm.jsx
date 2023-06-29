import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

export default function GroupAlgorithm() {
  const [calendar] = useOutletContext();
  const [form, setForm] = useState({
    nameGr: "",
    subjectId: 0,
    isLab: false,
    nameLab: "",
    sessions: [
      {
        day: -1,
        startTime: "07:00",
        endTime: "09:00",
      },
    ],
    capacity: 0,
    building: "",
    floor: "",
    calendar: 0,
  });
  const [isForm, setIsForm] = useState(true);

  useEffect(() => {
    if (calendar) setForm({ ...form, calendar: calendar });
  }, [calendar]);
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Paper sx={{ mt: 2, mb: 5, padding: "10px 2.5%", width: "75%" }}>
        <Typography variant="h4" align="center">
          {isForm ? "Insertar parámetros del algoritmo" : "Resultados"}
        </Typography>
      </Paper>
      <Outlet context={[form, setForm, setIsForm]} />
    </Box>
  );
}
