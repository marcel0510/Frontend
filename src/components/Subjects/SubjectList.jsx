import MenuBookIcon from '@mui/icons-material/MenuBook';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useNavigate } from "react-router-dom";
import { Divider, Grid, ListItemButton, Typography } from "@mui/material";

export default function SubjectList() {
  const navigate = useNavigate();
  return (
    <Grid container direction="column">
      <Divider />
      <ListItemButton
        sx={{ padding: 0, ml: 4 }}
        onClick={() => navigate("/Main/Materias/Ver")}
      >
        <MenuBookIcon fontSize="small" sx={{ marginRight: "5%" }} />
        <Typography variant="body2">Ver materias</Typography>
      </ListItemButton>

      <ListItemButton
        sx={{ padding: 0, ml: 4 }}
        onClick={() => navigate("/Main/Materias/Agregar")}
      >
        <NoteAddIcon fontSize="small" sx={{ marginRight: "5%" }} />
        <Typography variant="body2">Agregar materia</Typography>
      </ListItemButton>
    </Grid>
  );
}
