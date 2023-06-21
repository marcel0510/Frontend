import ApartmentIcon from "@mui/icons-material/Apartment";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Buildings() {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [isSee, setIsSee] = useState(true);
  const [filter, setFilter] = useState("");

  const editButtonHandle = () => {
    setIsEdit(false);
    setIsSee(true);
    navigate("/Main/Edificios/Ver");
  };

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
          <ApartmentIcon sx={{ fontSize: 50, mr: "1.5%" }} />
          <Typography variant="h3" sx={{ flexGrow: 1 }}>
            Módulo de Edificios
          </Typography>
          {isEdit ? (
            <IconButton onClick={() => editButtonHandle()}>
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
                label="Codigo"
                size="small"
                sx={{ mt: 1.7 }}
                value={filter}
                inputProps={{ maxLength: 3 }}
                onChange={(e) => setFilter(e.target.value.toUpperCase())}
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
