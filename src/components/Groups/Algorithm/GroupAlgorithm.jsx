import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

export default function GroupAlgorithm() {
  const [calendar] = useOutletContext();
  const [isForm, setIsForm] = useState(true);


  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Paper sx={{ mt: 2, mb: 3, padding: "10px 2.5%", width: "75%" }}>
        <Typography variant="h4" align="center">
          {isForm ? "Insertar parámetros del algoritmo" : "Resultados..."}
        </Typography>
      </Paper>
      <Outlet
        context={[calendar, setIsForm]}
      />
    </Box>
  );
}
