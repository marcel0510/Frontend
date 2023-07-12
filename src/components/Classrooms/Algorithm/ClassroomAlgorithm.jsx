import { Box, Paper, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

export default function ClassroomAlgorithm() {
  const navigate = useNavigate();
  const [, , , , , calendar] = useOutletContext();
  const [isForm, setIsForm] = useState(true);


  useEffect(() => {
    return () => {
      if(localStorage.getItem("parameters"))
        localStorage.removeItem("parameters");
    }
  }, [])
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Paper sx={{ mt: 2, mb: 3, padding: "10px 2.5%", width: "75%", display:"flex", alignItems: "center" }}>
        <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
          {isForm ? "Insertar parámetros" : "Disponibilidad"}
        </Typography>
        {
          !isForm && <IconButton onClick={() => navigate("/Main/Aulas/Algoritmo/Parametros")}>
          <ArrowBackIcon color="primary" />
        </IconButton>
        }
      </Paper>
      <Outlet
        context={[calendar, setIsForm]}
      />
    </Box>
  );
}
