import { Box, Fab, Paper, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from "react-router-dom";

export default function ScheduleHeader({ classroom }) {
  const navigate = useNavigate();
  return (
    
    <Paper sx={{ padding: "1.5%", marginBottom: "1.5%" }} elevation={3}>
      <Typography variant="h4"  marginLeft={"2%"}>
        <Fab color="secondary" size="small"  onClick={() => navigate("/Main/Aulas")}> <KeyboardArrowLeftIcon  />  </Fab>
        <SchoolIcon fontSize="large" sx={{ marginRight: "1%", marginLeft: "5%" }} />
        Aula: {classroom.building.code + "/" + classroom.floor + "/" + classroom.code}
      </Typography>

      <Typography variant="h6"  marginLeft={"14.5%"}>
        {classroom.isLab ? classroom.name : "No es laboratorio"}
      </Typography>

      <Typography variant="h6"  marginLeft={"14.5%"}>
        {classroom.building.name}
      </Typography>
    </Paper>
    

  );
}
