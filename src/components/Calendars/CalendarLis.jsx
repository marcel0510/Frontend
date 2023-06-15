import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useNavigate } from 'react-router-dom';
import { Divider, Grid, ListItemButton, Typography } from '@mui/material';

export default function CalendarList(){
    const navigate = useNavigate();
  return (
    <Grid container direction="column">
        <Divider />
      <ListItemButton
        sx={{ padding: 0, ml: 4 }}
        onClick={() => navigate("/Main/Calendarios/Ver")}
      >
        <CalendarTodayIcon fontSize="small" sx={{ marginRight: "5%" }} />
        <Typography variant="body2">Ver calendarios</Typography>
      </ListItemButton>
      
      <ListItemButton
        sx={{ padding: 0, ml: 4  }}
        onClick={() => navigate("/Main/Calendarios/Agregar")}
      >
        <AddCardIcon fontSize="small" sx={{ marginRight: "5%" }} />
        <Typography variant="body2">Agregar calendario</Typography>
      </ListItemButton>
      
    </Grid>
  );
    
}