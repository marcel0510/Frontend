import DomainAddIcon from '@mui/icons-material/DomainAdd';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';

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
        <HolidayVillageIcon fontSize="small" sx={{ marginRight: "5%" }} />
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
