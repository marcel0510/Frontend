import DomainAddIcon from '@mui/icons-material/DomainAdd';
import BusinessIcon from '@mui/icons-material/Business';

import { Divider, Grid, ListItemButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BuildingList() {
  const navigate = useNavigate();
  return (
    <Grid container direction="column">
        <Divider />
      <ListItemButton
        sx={{ padding: 0, ml: 4 }}
        onClick={() => navigate("/Main/Edificios/Ver")}
      >
        <BusinessIcon fontSize="small" sx={{ marginRight: "5%" }} />
        <Typography variant="body2">Ver edificios</Typography>
      </ListItemButton>
      
      <ListItemButton
        sx={{ padding: 0, ml: 4  }}
        onClick={() => navigate("/Main/Edificios/Agregar")}
      >
        <DomainAddIcon fontSize="small" sx={{ marginRight: "5%" }} />
        <Typography variant="body2">Agregar edificio</Typography>
      </ListItemButton>
      
    </Grid>
  );
}
