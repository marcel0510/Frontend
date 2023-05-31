import { Box, Paper, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

export default function ScheduleHeader({ classroom }) {
  return (
    
        <Paper sx={{ padding: "1.5%", marginBottom: "1.5%", width: "100%", height: "5%" }} elevation={3}>
      <Typography variant="h4"  marginLeft={"2%"}>
        <SchoolIcon fontSize="large" sx={{ marginRight: "1%" }} />
        Aula: {classroom.building.code + "/" + classroom.floor + "/" + classroom.code}
      </Typography>

      <Typography variant="h6"  marginLeft={"6%"}>
        {classroom.isLab ? classroom.name : "No es laboratorio"}
      </Typography>

      <Typography variant="h6"  marginLeft={"6%"}>
        {classroom.building.name}
      </Typography>
    </Paper>
    

  );
}
