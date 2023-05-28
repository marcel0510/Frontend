import {
  Paper,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";

import { distinct, findClassroom } from "../services/Building.Services";

export default function ClassroomHeader({ isLoading,  buildings, build, setBuild, floor, setFloor }) {
    var floors = [];
    var classrooms = [];

  if (isLoading) return;

  if(build !== 0)  {
    floors = distinct(buildings[build - 1], "floor");
    floors.sort();
  }

  if(build !== 0 && floors !== ""){
    classrooms = findClassroom(buildings[build - 1].classrooms, floor)
  }


  return (
    <Paper sx={{ padding: "1.5%" }} elevation={3}>
      <Typography variant="h3" align="center">
        Aulas
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-evenly", marginTop: "3.5%"}}>
        <FormControl sx={{ minWidth: "17%" }} size="small">
          <InputLabel id="edificio-label">Edificio</InputLabel>
          <Select
            labelId="edificio-label"
            id="edificio-select"
            label="Edificio"
            defaultValue={"Edificio"}
            value={build}
            onChange={(e) => setBuild(e.target.value)}
          >
            <MenuItem value={0}>{}</MenuItem>
            {buildings.map((building, index) => {
              return (
                <MenuItem key={index} value={building.id}>
                  {building.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: "8%" }} size="small">
          <InputLabel id="piso-label">Piso</InputLabel>
          <Select
            labelId="piso-label"
            id="piso-select"
            label="Piso"
            defaultValue={"Piso"}
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          >
            <MenuItem value={""}>{}</MenuItem>
            {floors.map((floor, index) => {
              return (
                <MenuItem key={index} value={floor}>
                  {floor}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}
