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
import {
  CustomSelect,
  CustomInputLabel,
  CustomGrid,
  ErrorFormHelperText,
} from "../../../Styles/Styled";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSubjects } from "../../../hooks/Subject.Hooks";
import { useBuildings } from "../../../hooks/Building.Hooks";
import { useEffect, useRef, useState } from "react";
import { TimeField, TimePicker } from "@mui/x-date-pickers";
import { GetTime } from "../../../helpers/date.helper";
import dayjs from "dayjs";
import { useClassrooms } from "../../../hooks/Classroom.Hooks";
import { ValidateForm } from "../../../helpers/group.helper";

export default function GroupAlgorithmForm() {
  const navigate = useNavigate();
  const [calendar, setIsForm] = useOutletContext();
  const withoutErrors = {
    nameGr: { error: false },
    subjectId: { error: false },
    sessions: { error: false },
  };
  const {
    data: subjectsData,
    isLoading: loadSubjects,
    isError: errorSubjects,
  } = useSubjects();
  const {
    data: buildings,
    isLoading: loadBuildings,
    isError: errorBuildings,
  } = useBuildings();
  const {
    data: classroomsData,
    isLoading: loadClassrooms,
    isError: errorClassrooms,
  } = useClassrooms();
  const isInitialMount = useRef(true);
  const [optional, setOptional] = useState(false);
  const [initHours, setInitHours] = useState([dayjs("0000/00/00T07:00")]);
  const [endHours, setEndHours] = useState([dayjs("0000/00/00T09:00")]);
  const [subjects, setSubjects] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [form, setForm] = useState({
    nameGr: "",
    subjectId: "",
    subjectCode: "",
    subjectName: "",
    subjectAlias: "",
    isLab: false,
    isParameters: false,
    nameLab: "",
    sessions: [
      {
        day: "",
        startTime: "07:00",
        endTime: "09:00",
      },
    ],
    capacity: 0,
    building: "",
    floor: "",
    calendar: 0,
  });
  const [formErrors, setFormErrors] = useState(withoutErrors);
  const [filters, setFilters] = useState({
    subject: "",
    lab: "",
  });
  const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  const isLoading = loadSubjects || loadClassrooms || loadBuildings;
  const isError = errorSubjects || errorClassrooms || errorBuildings;

  useEffect(() => {
    if (!isLoading && calendar && isInitialMount.current) {
      setSubjects(subjectsData);
      setClassrooms(classroomsData.filter((c) => c.isLab));
      setForm({ ...form, calendar: calendar });
      if (localStorage.getItem("parameters")) {
        const params = JSON.parse(localStorage.getItem("parameters"));
        setForm(params);
      }

      isInitialMount.current = false;
    }
    filterData();
    setIsForm(true);
    return () => setIsForm(false);
  }, [isLoading, filters, subjectsData, classroomsData, calendar]);

  const filterData = () => {
    if (filters.subject !== "")
      setSubjects(
        subjectsData.filter((s) => {
          if (s.alias !== null)
            return (
              s.name.includes(filters.subject) ||
              s.alias.includes(filters.subject) ||
              s.code.includes(filters.subject)
            );
          else
            return (
              s.name.includes(filters.subject) ||
              s.code.includes(filters.subject)
            );
        })
      );
    else if (!isLoading && !isInitialMount.current) setSubjects(subjectsData);

    if (filters.lab !== "")
      setClassrooms(
        classrooms.filter((c) => {
          const code = c.building.code + "/" + c.floor + "/" + c.code;
          return code.includes(filters.lab) || c.name.includes(filters.lab);
        })
      );
    else if (!isLoading && !isInitialMount.current)
      setClassrooms(classroomsData.filter((c) => c.isLab));
  };
  const handleAddSessions = () => {
    if (form.sessions.length < 3) {
      const newSession = {
        day: -1,
        startTime: "07:00",
        endTime: "09:00",
      };
      const newInitHour = dayjs("0000/00/00T07:00");
      const newEndHour = dayjs("0000/00/00T09:00");
      setForm({ ...form, sessions: [...form.sessions, newSession] });
      setInitHours([...initHours, newInitHour]);
      setEndHours([...endHours, newEndHour]);
      setFormErrors(withoutErrors);
    }
  };
  const handleRemoveSessions = (index) => {
    if (form.sessions.length > 1) {
      const updatedSessions = [...form.sessions];
      const updatedInitHours = [...initHours];
      const updatedEndHours = [...endHours];
      updatedSessions.splice(index, 1);
      updatedInitHours.splice(index, 1);
      updatedEndHours.splice(index, 1);
      setForm({ ...form, sessions: updatedSessions });
      setInitHours([...updatedInitHours]);
      setEndHours([...updatedEndHours]);
      setFormErrors(withoutErrors);
    }
  };
  const handleSessionsChange = (index, e) => {
    const updatedSessions = [...form.sessions];
    updatedSessions[index] = {
      ...updatedSessions[index],
      day: e.target.value,
    };
    setForm({ ...form, sessions: updatedSessions });
    setFormErrors(withoutErrors);
  };
  const handleSessionsChangeInit = (index, e) => {
    const updatedSessions = [...form.sessions];
    updatedSessions[index] = {
      ...updatedSessions[index],
      startTime: GetTime(e),
    };
    const updatedInitHours = [...initHours];
    updatedInitHours[index] = e;
    setForm({ ...form, sessions: updatedSessions });
    setInitHours([...updatedInitHours]);
    setFormErrors(withoutErrors);
  };
  const handleSessionsChangeEnd = (index, e) => {
    const updatedSessions = [...form.sessions];
    updatedSessions[index] = {
      ...updatedSessions[index],
      endTime: GetTime(e),
    };
    const updatedEndHours = [...endHours];
    updatedEndHours[index] = e;
    setForm({ ...form, sessions: updatedSessions });
    setEndHours([...updatedEndHours]);
    setFormErrors(withoutErrors);
  };

  const validateForm = () => {
    const errors = {
      nameGr: {},
      subjectId: {},
      sessions: {},
      building: {},
      floor: {},
    };
    var validate = true;
    var validateSession1 = true;
    var validateSession2 = true;
    var validateSession3 = true;
    var validateSession4 = true;
    var validateSession5 = true;
    var validateSession6 = true;
    var validateSession7 = true;

    form.sessions.forEach((s) => {
      const stime = parseInt(s.startTime.split(":")[0], 10);
      const etime = parseInt(s.endTime.split(":")[0], 10);
      if (s.day === "" || s.startTime == "" || s.endTime == "") {
        validateSession1 = false;
      }
      if (s.startTime === s.endTime) {
        validateSession2 = false;
      }
      if (stime > etime) {
        validateSession3 = false;
      }
      if (stime > 20 || etime > 20 || stime < 7 || etime < 7) {
        validateSession4 = false;
      }
      if (etime - stime > 3) {
        validateSession5 = false;
      }
      if (
        (stime == 11 || stime == 12 || etime == 12 || etime == 13) &&
        s.day == 3
      ) {
        validateSession6 = false;
      }
      if (stime == 13 || etime == 14) {
        validateSession7 = false;
      }
    });
    if (form.nameGr === "") {
      errors["nameGr"]["error"] = true;
      errors["nameGr"]["message"] = "No puede dejar este campo vacío";
      validate = false;
    }

    if (form.subjectId === "") {
      errors["subjectId"]["error"] = true;
      errors["subjectId"]["message"] = "Debe seleccionar una materia";
      validate = false;
    }

    if (!validateSession1) {
      errors["sessions"]["error"] = true;
      errors["sessions"]["message"] =
        "Debe llenar cada uno de los campos de las sesiones";
      validate = false;
    }
    if (!validateSession2) {
      errors["sessions"]["error"] = true;
      errors["sessions"]["message"] =
        "La hora de inicio no puede ser igual a la hora de fin";
      validate = false;
    }
    if (!validateSession3) {
      errors["sessions"]["error"] = true;
      errors["sessions"]["message"] =
        "La hora de inicio no puede ser despues de la hora de fin";
      validate = false;
    }
    if (!validateSession4) {
      errors["sessions"]["error"] = true;
      errors["sessions"]["message"] =
        "No puede poner una hora antes de las 07:00 o despues de a 20:00";
      validate = false;
    }
    if (!validateSession5) {
      errors["sessions"]["error"] = true;
      errors["sessions"]["message"] =
        "Solo se puede agregar sesiones de hasta 3 horas";
      validate = false;
    }
    if (!validateSession6) {
      errors["sessions"]["error"] = true;
      errors["sessions"]["message"] =
        "No se puede agregar un grupo el jueves de 11:00 a 13:00";
      validate = false;
    }
    if (!validateSession7) {
      errors["sessions"]["error"] = true;
      errors["sessions"]["message"] =
        "No se puede agregar un grupo durante el almuerzo";
      validate = false;
    }

    if (validate) return true;
    else {
      setFormErrors(errors);
      return false;
    }
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/Main/Grupos/Algoritmo/Resultados");
      localStorage.setItem("parameters", JSON.stringify(form));
    }
  };

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
      {/* Formulario */}

      <Paper
        component={"form"}
        onSubmit={onSubmitHandle}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 2.5%",
          width: "75%",
        }}
      >
        {/* Campos obligatorios */}
        <Box
          component={"fieldset"}
          sx={{
            padding: "15px 4%",
            border: "1px solid #000",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            mb: 3,
          }}
        >
          <legend>
            <Typography variant="h6" sx={{ mr: 1, ml: 0.5, fontWeight: 400 }}>
              Parámetros obligatorios:
            </Typography>
          </legend>
          {/* Primera fila */}
          <Box sx={{ display: "flex", gap: "2%", width: "75%" }}>
            {/* Nombre del grupo */}
            <FormControl sx={{ flex: 1 }}>
              <TextField
                name="nameGr"
                size="small"
                label="Grupo"
                variant="outlined"
                inputProps={{
                  maxLength: 5,
                  style: { textTransform: "uppercase" },
                }}
                onChange={(e) => {
                  setForm({
                    ...form,
                    nameGr: e.target.value.toUpperCase(),
                  });
                  setFormErrors(withoutErrors);
                }}
                helperText={
                  formErrors.nameGr.error
                    ? formErrors.nameGr.message
                    : "Ej. GR1"
                }
                error={formErrors.nameGr.error}
                value={form.nameGr}
              />
            </FormControl>

            {/* Seleccion de la materia */}
            <FormControl size="small" sx={{ flex: 3 }}>
              <CustomInputLabel id="materia" error={formErrors.subjectId.error}>
                Materia
              </CustomInputLabel>
              <CustomSelect
                labelId="materia"
                value={form.subjectId}
                label="Materia"
                name="subjectId"
                error={formErrors.subjectId.error}
                onChange={(e) => {
                  const auxSubject = subjects.find(
                    (s) => s.id == e.target.value
                  );
                  setForm({
                    ...form,
                    subjectId: parseInt(e.target.value),
                    subjectCode: auxSubject.code,
                    subjectName: auxSubject.name,
                    subjectAlias: auxSubject.alias,
                  });
                  setFormErrors(withoutErrors);
                }}
              >
                <TextField
                  value={filters.subjectName}
                  size="small"
                  sx={{ width: "100%" }}
                  variant="standard"
                  label="Filtrar..."
                  inputProps={{ style: { textTransform: "uppercase" } }}
                  onKeyDown={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      subject: e.target.value.toUpperCase(),
                    })
                  }
                />
                <MenuItem value={""}></MenuItem>
                {subjects.map((subject, index) => {
                  return (
                    <MenuItem key={index} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  );
                })}
              </CustomSelect>
              {formErrors.subjectId.error && (
                <ErrorFormHelperText>
                  {formErrors.subjectId.message}
                </ErrorFormHelperText>
              )}
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
                  checked={form.isLab}
                  onChange={() => setForm({ ...form, isLab: !form.isLab })}
                />
              }
              label="¿Laboratorio?"
            />
            {form.isLab ? (
              <FormControl size="small" sx={{ flex: 3 }}>
                <InputLabel id="lab">Laboratorio</InputLabel>
                <Select
                  labelId="lab"
                  value={form.nameLab}
                  label="Laboratorio"
                  name="lab"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nameLab: e.target.value,
                    })
                  }
                >
                  <TextField
                    value={filters.lab}
                    size="small"
                    sx={{ width: "100%" }}
                    variant="standard"
                    label="Filtrar..."
                    inputProps={{ style: { textTransform: "uppercase" } }}
                    onKeyDown={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        lab: e.target.value.toUpperCase(),
                      })
                    }
                  />
                  <MenuItem value={""}></MenuItem>
                  {classrooms.map((lab, index) => {
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
            {/* Label con el numero de sesiones y boton para agregar sesiones */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "50%",
                mt: 2,
              }}
            >
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 300 }}>
                {"Sesiones: " + form.sessions.length}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={handleAddSessions}
              >
                <AddIcon />{" "}
              </Button>
            </Box>

            {/* Contenedor de sesiones */}
            <CustomGrid
              container
              error={formErrors.sessions.error ? 1 : 0}
              sx={{
                width: "100%",
                mt: 1.5,
                padding: "2.5%",
              }}
            >
              {form.sessions.map((session, index) => {
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
                    {/* Dia */}
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

                    {/* Hora de inicio */}
                    <TimePicker
                      label="Hora de inicio"
                      sx={{ flex: 3 }}
                      slotProps={{ textField: { size: "small" } }}
                      value={initHours[index]}
                      size="small"
                      onChange={(e) => handleSessionsChangeInit(index, e)}
                    />

                    {/* Hora de fin */}
                    <TimePicker
                      label="Hora de Fin"
                      sx={{ flex: 3 }}
                      slotProps={{ textField: { size: "small" } }}
                      value={endHours[index]}
                      size="small"
                      onChange={(e) => handleSessionsChangeEnd(index, e)}
                    />

                    {/* Boton para quitar sesiones */}
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
            </CustomGrid>
            {formErrors.sessions.error && (
              <ErrorFormHelperText>
                {formErrors.sessions.message}
              </ErrorFormHelperText>
            )}
          </Box>
          {/*------------------ End Sessions ---------------- */}

          {/* Checkbox para activar los parametros opcionales */}
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isParameters}
                onChange={() => setForm({...form, isParameters: !form.isParameters})}
              />
            }
            label="Agregar parámetros opcionales"
            sx={{ mt: 4 }}
          />
        </Box>

        {/* Parametros opcionales */}
        {form.isParameters && (
          <Box
            component={"fieldset"}
            sx={{
              padding: "15px 4%",
              border: "1px solid #000",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              mb: 3,
            }}
          >
            <legend>
              <Typography variant="h6" sx={{ mr: 1, ml: 0.5, fontWeight: 400 }}>
                Parámetros opcionales:
              </Typography>
            </legend>
            <Box sx={{ width: "75%", display: "flex", gap: 1 }}>
              {/* Seleccion dle edificio */}
              <FormControl size="small" sx={{ flex: 2 }}>
                <CustomInputLabel id="edificio">Edificio</CustomInputLabel>
                <CustomSelect
                  labelId="edificio"
                  value={form.building}
                  label="Edificio"
                  name="building"
                  onChange={(e) => {
                    setForm({ ...form, building: e.target.value });
                    setFormErrors(withoutErrors);
                  }}
                >
                  <MenuItem value={""}></MenuItem>
                  {buildings.map((building, index) => {
                    return (
                      <MenuItem key={index} value={building.code}>
                        {building.name}
                      </MenuItem>
                    );
                  })}
                </CustomSelect>
              </FormControl>

              {/* Seleccion del piso */}
              <FormControl size="small" sx={{ flex: 1 }}>
                <CustomInputLabel id="Piso">Piso</CustomInputLabel>
                <CustomSelect
                  labelId="piso"
                  value={form.floor}
                  label="Piso"
                  name="floor"
                  onChange={(e) => {
                    setForm({ ...form, floor: e.target.value });
                    setFormErrors(withoutErrors);
                  }}
                >
                  {form.building === "" ? (
                    <MenuItem value={""}></MenuItem>
                  ) : (
                    buildings[
                      buildings.findIndex((b) => b.code === form.building)
                    ].floors.map((floor, index) => {
                      return (
                        <MenuItem key={index} value={floor.code}>
                          {floor.code}
                        </MenuItem>
                      );
                    })
                  )}
                </CustomSelect>
              </FormControl>

              {/* Capacidad */}
              <FormControl sx={{ width: "25%" }}>
                <TextField
                  name="capacity"
                  size="small"
                  label="Capacidad"
                  variant="outlined"
                  inputProps={{ type: "number" }}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      capacity: parseInt(e.target.value),
                    });
                    setFormErrors(withoutErrors);
                  }}
                  value={filters.capacity}
                />
              </FormControl>
            </Box>
          </Box>
        )}

        {/* Boton de submit */}
        <Button type="submit" sx={{ width: "30%" }} variant="contained">
          Buscar aulas
        </Button>
      </Paper>
    </>
  );
}
