import PasswordIcon from "@mui/icons-material/Password";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate } from "react-router-dom";
import { Divider, Grid, ListItemButton, Typography } from "@mui/material";
import { GetUser } from "../../session/session";
export default function AccountList() {
  const { Id } = GetUser()
  const navigate = useNavigate();
  return (
    <Grid container direction="column">
      <Divider />

      <ListItemButton sx={{ padding: 0, ml: 4 }} onClick={() => navigate(`/Main/Cuenta/Editar/${Id}`)}>
        <PersonOutlineIcon fontSize="small" sx={{ marginRight: "5%" }} />

        <Typography variant="body2">Editar cuenta</Typography>
      </ListItemButton>
      <ListItemButton sx={{ padding: 0, ml: 4 }} onClick={() => navigate("/Main/Cuenta/CambiarContraseña")}>
        <PasswordIcon fontSize="small" sx={{ marginRight: "5%" }} />

        <Typography variant="body2">Cambiar contraseña</Typography>
      </ListItemButton>
    </Grid>
  );
}
