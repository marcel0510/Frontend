import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import { useNavigate } from "react-router-dom";
import { Divider, Grid, ListItemButton, Typography } from "@mui/material";
export default function GroupList(){
  const navigate = useNavigate();
  return (
    <Grid container direction="column">
      <Divider />
      <ListItemButton
        sx={{ padding: 0, ml: 4 }}
        onClick={() => navigate("/Main/Grupos/Ver")}
      >
        <LibraryBooksIcon fontSize="small" sx={{ marginRight: "5%" }} />
        <Typography variant="body2">Ver grupos</Typography>
      </ListItemButton>

      <ListItemButton
        sx={{ padding: 0, ml: 4 }}
        onClick={() => navigate("/Main/Grupos/Agregar")}
      >
        <LibraryAddIcon fontSize="small" sx={{ marginRight: "5%" }} />
        <Typography variant="body2">Agregar grupo manual</Typography>
      </ListItemButton>
      <ListItemButton
        sx={{ padding: 0, ml: 4 }}
        onClick={() => navigate("/Main/Grupos/Agregar")}
      >
        <QueuePlayNextIcon fontSize="small" sx={{ marginRight: "5%" }} />
        <Typography variant="body2">Agregar grupo automático</Typography>
      </ListItemButton>
    </Grid>
  );

}