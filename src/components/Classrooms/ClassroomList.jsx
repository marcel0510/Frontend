import MarginIcon from '@mui/icons-material/Margin';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { useNavigate } from "react-router-dom";
import { Divider, Grid, ListItemButton, Typography } from "@mui/material";

export default function ClassroomList(){
    const navigate = useNavigate();
    return (
        <Grid container direction="column">
          <Divider />
          <ListItemButton
            sx={{ padding: 0, ml: 4 }}
            onClick={() => navigate("/Main/Aulas/Ver")}
          >
            <MarginIcon fontSize="small" sx={{ marginRight: "5%" }} />
            <Typography variant="body2">Ver aulas</Typography>
          </ListItemButton>
    
          <ListItemButton
            sx={{ padding: 0, ml: 4 }}
            onClick={() => navigate("/Main/Aulas/Agregar")}
          >
            <AddBoxIcon fontSize="small" sx={{ marginRight: "5%" }} />
            <Typography variant="body2">Agregar aulas</Typography>
          </ListItemButton>
          <ListItemButton
            sx={{ padding: 0, ml: 4 }}
            onClick={() => navigate("/Main/Aulas/Algoritmo/Parametros")}
          >
            <FindInPageIcon fontSize="small" sx={{ marginRight: "5%" }} />
            <Typography variant="body2">Buscar disponibilidad</Typography>
          </ListItemButton>
        </Grid>
      );
}