import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SyncLockIcon from '@mui/icons-material/SyncLock';
import { useNavigate } from "react-router-dom";
import { Divider, Grid, ListItemButton, Typography } from "@mui/material";
export default function UserList() {
  const navigate = useNavigate();

  return (
    <Grid container direction="column">
      <Divider />
 
        <>
          <ListItemButton
            sx={{ padding: 0, ml: 4 }}
            onClick={() => navigate("/Main/Usuarios/Ver")}
          >
            <PeopleAltIcon fontSize="small" sx={{ marginRight: "5%" }} />

            <Typography variant="body2">Ver usuarios</Typography>
          </ListItemButton>
          
        
          <ListItemButton
            sx={{ padding: 0, ml: 4 }}
            onClick={() => navigate("/Main/Usuarios/ReestrablecerContraseña")}
          >
            <SyncLockIcon fontSize="small" sx={{ marginRight: "5%" }} />

            <Typography variant="body2">Reestablecer contraseña</Typography>
          </ListItemButton>
        </>
    </Grid>
  );
}
