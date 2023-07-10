import ApartmentIcon from "@mui/icons-material/Apartment";
import {
  Box,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isAdmin } from "../session/session";

export default function User(){
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [admin] = useState(isAdmin());

    
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
          <ManageAccountsIcon sx={{ fontSize: 50, mr: "1.5%" }} />
          <Typography variant="h3" sx={{ flexGrow: 1 }}>
            {"Módulo de Usuarios"}
          </Typography>
          {isEdit ? (
            <IconButton onClick={() => navigate("/Main/Usuarios/Ver")}>
              <ArrowBackIcon color="primary" />
            </IconButton>
          ) : (
            <p />
          )}
        </Box>

      </Paper>
      <Outlet context={[isEdit, setIsEdit, admin]} />
    </>
  );
}