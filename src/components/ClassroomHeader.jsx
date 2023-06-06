import {
  Paper,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  TextField,
} from "@mui/material";

import { distinct, findClassroom } from "../services/Building.Services";

export default function ClassroomHeader({ isLoading,  buildings, build, floor, findClassrooms, findClassroomsByFloor }) {
    var floors = [];

  if (isLoading) return;

  if(build !== 0)  {
    floors = distinct(buildings[build - 1], "floor");
    floors.sort();
  }


  return (
    <Paper sx={{ padding: "1.5%", width: "100%" }} elevation={3}>
      <Typography variant="h3" align="center">
        Aulas
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-evenly", marginTop: "3.5%", width: "100%"}}>
        <Box sx={{ width: "47%", display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
        <FormControl sx={{ minWidth: "32%" }} size="small">
          <InputLabel id="edificio-label">Edificio</InputLabel>
          <Select
            label="Edificio"
            value={build}
            onChange={(e) => findClassrooms(e.target.value)}
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

        <FormControl sx={{ minWidth: "15%" }} size="small">
          <InputLabel id="piso-label">Piso</InputLabel>
          <Select
            label="Piso"
            defaultValue={"Piso"}
            value={floor}
            onChange={(e) => findClassroomsByFloor(e.target.value)}
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
        <Box sx={{ width: "47%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FormControl>
            <TextField 
            id="aula-textField"
            size="small"
            label="Codigo del SAEw"
            />
          </FormControl>
        </Box>
      </Box>
    </Paper>
  );
}
