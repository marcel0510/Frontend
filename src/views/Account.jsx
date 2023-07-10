import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
export default function Account(){
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
  
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
            <AccountCircleIcon sx={{ fontSize: 50, mr: "1.5%" }} />
            <Typography variant="h3" sx={{ flexGrow: 1 }}>
              Cuenta
            </Typography>
            {isEdit ? (
              <IconButton onClick={() => navigate("/Main/Calendarios/Ver")}>
                <ArrowBackIcon color="primary" />
              </IconButton>
            ) : (
              <p />
            )}
          </Box>
         
        </Paper>
        <Outlet
          context={[setIsEdit]}
        />
      </>
    );
}