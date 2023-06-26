import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useOutletContext } from "react-router-dom";
import { useSubjects } from "../../../hooks/Subject.Hooks";
import { useBuildings } from "../../../hooks/Building.Hooks";
import { useClassrooms } from "../../../hooks/Classroom.Hooks";
import { useEffect, useState } from "react";
import { TimeField } from "@mui/x-date-pickers";
import { GetTime } from "../../../helpers/date.helper";
import dayjs from "dayjs";

export default function GroupAlgorithmForm() {
  const [filters, setFilters, setIsForm] = useOutletContext();
  const {
    data: subjects,
    isLoading: loadSubjects,
    isError: errorSubjects,
  } = useSubjects();
  const {
    data: buildings,
    isLoading: loadBuildings,
    isError: errorBuildings,
  } = useBuildings();
  const {
    data: classrooms,
    isLoading: loadClassrooms,
    isError: errorClassrooms,
  } = useClassrooms();
  const [ optional, setOptional ] = useState(false);
  const [labs, setLabs] = useState([]);
  const [initHours, setInitHours] = useState([dayjs("0000/00/00T07:00")]);
  const [endHours, setEndHours] = useState([dayjs("0000/00/00T09:00")]);
  const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  const isLoading = loadSubjects || loadBuildings || loadClassrooms;
  const isError = errorSubjects || errorBuildings || errorClassrooms;

  useEffect(() => {
    if (!isLoading) setLabs(classrooms.filter((s) => s.isLab));
  }, [isLoading, classrooms]);

  const handleAddSessions = () => {
    if (filters.sessions.length < 3) {
      const newSession = {
        day: -1,
        hourInit: "",
        hourEnd: "",
      };
      const newInitHour = dayjs("0000/00/00T07:00");
      const newEndHour = dayjs("0000/00/00T07:00");
      setFilters({ ...filters, sessions: [...filters.sessions, newSession] });
      setInitHours([ ...initHours, newInitHour ]);
      setEndHours([ ...endHours, newEndHour ]);
    }
  };

  const handleRemoveSessions = (index) => {
    if (filters.sessions.length > 1) {
      const updatedSessions = [...filters.sessions];
      const updatedInitHours = [...initHours]
      const updatedEndHours = [...endHours]
      updatedSessions.splice(index, 1);
      updatedInitHours.splice(index, 1);
      updatedEndHours.splice(index, 1);
      setFilters({ ...filters, sessions: updatedSessions });
      setInitHours([updatedInitHours])
      setEndHours([updatedEndHours])
    }

  };

  const handleSessionsChange = (index, e) => {
    const updatedSessions = [...filters.sessions];
    updatedSessions[index] = {
      ...updatedSessions[index],
      day: e.target.value,
    };
    setFilters({ ...filters, sessions: updatedSessions });
  };

  const handleSessionsChangeInit = (index, e) => {
    const updatedSessions = [...filters.sessions];
    updatedSessions[index] = {
      ...updatedSessions[index],
      hourInit: GetTime(e),
    };
    const updatedInitHours = [ ...initHours ];
    updatedInitHours[index] = e;
    setFilters({ ...filters, sessions: updatedSessions });
    setInitHours([ ...updatedInitHours  ])
  };

  const handleSessionsChangeEnd = (index, e) => {
    const updatedSessions = [...filters.sessions];
    updatedSessions[index] = {
      ...updatedSessions[index],
      hourEnd: GetTime(e),
    };
    const updatedEndHours = [ ...endHours ];
    updatedEndHours[index] = e;
    setFilters({ ...filters, sessions: updatedSessions });
    setEndHours([...updatedEndHours]);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    console.log(filters);
  } 

  if (isLoading || isError)
    return (
      <Backdrop
        open={true}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {isError ? (
          <Typography mb={"1.5%"} variant="h5" color="secondary">
            Error de conexión con el servidor!
          </Typography>
        ) : (
          <p></p>
        )}
        <CircularProgress size={100} />
      </Backdrop>
    );

  return (
    <>
      <Paper
        component={"form"}
        onSubmit={onSubmitHandle}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 2.5%",
          width: "70%",
        }}
      >
        <Box
          component={"fieldset"}
          sx={{
            mb: 4,
            padding: "15px 4%",
            border: "1px solid #000",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <legend>
            <Typography variant="h6" sx={{ mr: 1, ml: 0.5, fontWeight: 400 }}>
              Parámetros obligatorios:
            </Typography>
          </legend>
          <Box sx={{ display: "flex", gap: "2%", width: "75%" }}>
            <FormControl sx={{ flex: 1 }}>
              <TextField
                name="nameGr"
                size="small"
                label="Grupo"
                variant="outlined"
                inputProps={{ maxLength: 5 }}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    nameGr: e.target.value.toUpperCase(),
                  })
                }
                helperText={"Ej. GR1"}
                value={filters.nameGr}
              />
            </FormControl>
            <FormControl size="small" sx={{ flex: 3 }}>
              <InputLabel id="materia">Materia</InputLabel>
              <Select
                labelId="materia"
                value={filters.subjectId}
                label="Materia"
                name="subjectId"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    subjectId: parseInt(e.target.value),
                  })
                }
              >
                <MenuItem value={0}></MenuItem>
                {subjects.map((subject, index) => {
                  return (
                    <MenuItem key={index} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          {/* Laboratorio */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              mt: 2.3,
              width: "75%",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.isLab}
                  onChange={() =>
                    setFilters({ ...filters, isLab: !filters.isLab })
                  }
                />
              }
              label="¿Laboratorio?"
            />
            {filters.isLab ? (
              <FormControl size="small" sx={{ flex: 3 }}>
                <InputLabel id="lab">Laboratorio</InputLabel>
                <Select
                  labelId="lab"
                  value={filters.name}
                  label="Laboratorio"
                  name="lab"
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      nameLab: e.target.value,
                    })
                  }
                >
                  <MenuItem value={""}></MenuItem>
                  {labs.map((lab, index) => {
                    return (
                      <MenuItem key={index} value={lab.name}>
                        {lab.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            ) : (
              <p />
            )}
          </Box>
          {/* --------------- Sesiones ---------------- */}
          <Box
            sx={{
              display: "flex",
              gap: "2%",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {/*  */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "50%",
                mt: 2,
              }}
            >
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 300 }}>
                {"Sesiones: " + filters.sessions.length}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={handleAddSessions}
              >
                <AddIcon />{" "}
              </Button>
            </Box>

            <Grid
              container
              sx={{
                width: "100%",
                mt: 1.5,
              }}
            >
              {filters.sessions.map((session, index) => {
                return (
                  <Grid
                    item
                    key={index}
                    sx={{
                      mt: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: "2.5%",
                    }}
                    md={12}
                  >
                    <FormControl size="small" sx={{ flex: 1.5 }}>
                      <InputLabel id="dia">Día</InputLabel>
                      <Select
                        labelId="dia"
                        value={session.day}
                        label="Día"
                        name="day"
                        onChange={(e) => handleSessionsChange(index, e)}
                      >
                        <MenuItem value={-1}></MenuItem>
                        {days.map((day, index) => {
                          return (
                            <MenuItem key={index} value={index}>
                              {day}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <TimeField
                      label="Hora de inicio"
                      sx={{ flex: 3 }}
                      value={initHours[index]}
                      size="small"
                      onChange={(e) => handleSessionsChangeInit(index, e) }
                    />
                    <TimeField
                      label="Hora de Fin"
                      sx={{ flex: 3 }}
                      value={endHours[index]}
                      size="small"
                      onChange={(e) =>  handleSessionsChangeEnd(index, e) }
                    />
                    <IconButton
                      variant="outlined"
                      size="small"
                      onClick={() => handleRemoveSessions(index)}
                    >
                      {" "}
                      <DeleteIcon />{" "}
                    </IconButton>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          {/*------------------ End Sessions ---------------- */}
          <FormControlLabel
              control={
                <Checkbox
                  checked={optional}
                  onChange={() => setOptional(!optional)}
                />
              }
              label="Agregar parámetros opcionales"
              sx={{ mt: 4 }}
            />


        </Box>

        {
          optional ?
        <Box
          component={"fieldset"}
          sx={{
            padding: "15px 4%",
            border: "1px solid #000",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <legend>
            <Typography variant="h6" sx={{ mr: 1, ml: 0.5, fontWeight: 400 }}>
              Parámetros opcionales:
            </Typography>
          </legend>
          <Box sx={{ width: "75%", display: "flex", gap: 1 }}>
            <FormControl size="small" sx={{ flex: 2 }}>
              <InputLabel id="edificio">Edificio</InputLabel>
              <Select
                labelId="edificio"
                value={filters.building}
                label="Edificio"
                name="building"
                onChange={(e) =>
                  setFilters({ ...filters, building: e.target.value })
                }
              >
                <MenuItem value={""}></MenuItem>
                {buildings.map((building, index) => {
                  return (
                    <MenuItem key={index} value={building.code}>
                      {building.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ flex: 1 }}>
              <InputLabel id="Piso">Piso</InputLabel>
              <Select
                labelId="piso"
                value={filters.floor}
                label="Piso"
                name="floor"
                onChange={(e) =>
                  setFilters({ ...filters, floor: e.target.value })
                }
              >
                {filters.building === "" ? (
                  <MenuItem value={""}></MenuItem>
                ) : (
                  buildings[
                    buildings.findIndex((b) => b.code === filters.building)
                  ].floors.map((floor, index) => {
                    return (
                      <MenuItem key={index} value={floor.code}>
                        {floor.code}
                      </MenuItem>
                    );
                  })
                )}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "25%" }}>
              <TextField
                name="capacity"
                size="small"
                label="Capacidad"
                variant="outlined"
                inputProps={{ type: "number" }}
                onChange={(e) =>
                  setFilters({ ...filters, capacity: parseInt(e.target.value) })
                }
                value={filters.capacity}
              />
            </FormControl>
          </Box>
        </Box>:<p />
        }
        <Button type="submit" sx={{ mt: 5, width: "30%" }} variant="contained">Enviar</Button>
      </Paper>
    </>
  );
}
