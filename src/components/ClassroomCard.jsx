import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function ClassroomCard({ classroom, buildName, buildCode }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Aula: {classroom.code}</Typography>
        <Typography variant="h6">
          {classroom.isLab ? classroom.name : "No es laboratorio"}
        </Typography>
        <Typography variant="body1">Capacidad: {classroom.capacity}</Typography>
        <Typography variant="body1">{buildName}</Typography>
        <Typography variant="body1">Piso: {classroom.floor}</Typography>
        <Typography variant="body1">
          Codigo SAEw:{" "}
          {buildCode + "/" + classroom.floor + "/" + classroom.code}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={() => navigate(`/Horario/${classroom.id}`)}>Ver horario</Button>
        <Button variant="outlined" color="warning">
          Editar
        </Button>
        <Button variant="outlined" color="secondary">
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
}
