import SchoolIcon from "@mui/icons-material/School";
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
import { Outlet, useNavigate } from "react-router-dom";

export default function Classroom() {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [isSee, setIsSee] = useState(false);
  const [filter, setFilter] = useState({
    code: "",
    name: ""
  });

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          padding: 2,
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <SchoolIcon sx={{ fontSize: 50, mr: "1.5%" }} />
          <Typography variant="h3" sx={{ flexGrow: 1 }}>
            Módulo de Aulas
          </Typography>
          {isEdit ? (
            <IconButton onClick={() => navigate("/Main/Aulas/Ver")}>
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
                label="Codigo de Aula"
                size="small"
                sx={{ mt: 1.7, mr: 2 }}
                value={filter.code}
                inputProps={{ maxLength: 12 }}
                onChange={(e) =>
                  setFilter({ ...filter, code: e.target.value.toUpperCase() })
                }
              />
              <TextField
                label="Nombre de Laboratorio"
                size="small"
                sx={{ mt: 1.7 }}
                value={filter.name}
                inputProps={{ maxLength: 40 }}
                onChange={(e) =>
                  setFilter({ ...filter, name: e.target.value })
                }
              />
            </Box>
          </>
        ) : (
          <p />
        )}
      </Paper>
      <Outlet context={[isEdit, setIsEdit, setIsSee, filter, setFilter]} />
    </>
  );
}
