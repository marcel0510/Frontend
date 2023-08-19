import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CustomSelect,
  CustomInputLabel,
  CustomGrid,
  ErrorFormHelperText,
} from "../Styles/Styled";
import { GetTime } from "./date.helper";
import dayjs from "dayjs";

export const ValidateForm = (form, setFormErrors) => {
  const errors = { name: {}, subjectId: {}, classroomId: {}, sessions: {} };
  var validate = true;
  var validateSession1 = true;
  var validateSession2 = true;
  form.sessions.forEach((s) => {
    if (s.day == -1 || s.startTime == "" || s.endTime == "") {
      validateSession1 = false;
    }
    if (s.startTime === s.endTime) {
      validateSession2 = false;
    }
  });
  if (form.name === "") {
    errors["name"]["error"] = true;
    errors["name"]["message"] = "No puede dejar este campo vacio";
    validate = false;
  }

  if (form.subjectId === 0) {
    errors["subjectId"]["error"] = true;
    errors["subjectId"]["message"] = "Debe seleccionar una materia";
    validate = false;
  }

  if (form.classroomId === 0) {
    errors["classroomId"]["error"] = true;
    errors["classroomId"]["message"] = "Debe seleccionar un aula";
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

  if (validate) return true;
  else {
    setFormErrors(errors);
    return false;
  }
};
export const ErrorMap = (errorType, props) => {
  switch (errorType) {
    case 1:
      return `Ya existe un ${props.gr} para la materia ${props.subject} en el aula seleccionada`;
    case 2:
      return `Existe un cruce con el grupo ${props.name} de la materia ${props.subject}`;
    case 3:
      return "No se puede agregar un grupo el jueves de 11:00 - 13:00";
  }
};

const handleForm = (e, form, setForm, setFormErrors, withoutErrors) => {
  if (e.target.name === "name")
    setForm({ ...form, name: e.target.value.toUpperCase() });
  if (e.target.name === "subjectId")
    setForm({ ...form, subjectId: parseInt(e.target.value) });
  if (e.target.name === "classroomId")
    setForm({ ...form, classroomId: parseInt(e.target.value) });

  setFormErrors(withoutErrors);
};

const handleSessionsChange = (
  form,
  setForm,
  index,
  e,
  setFormErrors,
  withoutErrors
) => {
  const updatedSessions = [...form.sessions];
  updatedSessions[index] = {
    ...updatedSessions[index],
    day: e.target.value,
  };
  setForm({ ...form, sessions: updatedSessions });
  setFormErrors(withoutErrors);
};
const handleSessionsChangeInit = (
  form,
  setForm,
  initHours,
  setInitHours,
  index,
  e,
  setFormErrors,
  withoutErrors
) => {
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
const handleSessionsChangeEnd = (
  form,
  setForm,
  endHours,
  setEndHours,
  index,
  e,
  setFormErrors,
  withoutErrors
) => {
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
const handleAddSessions = (
  form,
  setForm,
  initHours,
  setInitHours,
  endHours,
  setEndHours
) => {
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
  }
};
const handleRemoveSessions = (
  form,
  setForm,
  initHours,
  setInitHours,
  endHours,
  setEndHours,
  index
) => {
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
  }
};
const handleSuccessMessage = (setSuccessMessage, navigate) => {
  setSuccessMessage(false);
  navigate("/Main/Grupos/Ver");
};

export const RenderComponent = (
  navigate,
  handleSubmit,
  form,
  setForm,
  formErrors,
  setFormErrors,
  withoutErrors,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
  initHours,
  setInitHours,
  endHours,
  setEndHours,
  days,
  subjects,
  classrooms,
  currentCalendar,
  setCurrentCalendar,
  filters,
  setFilters,
  isEdit
) => {
  return (
    // Contenedor

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "5%",
      }}
    >
      {/* Titulo del SubModulo  */}
      <Paper sx={{ width: "50%", padding: "1% 0" }}>
        <Typography variant="h4" align="center">
          {isEdit ? "Editar Grupo" : "Agregar Grupo"}
        </Typography>
      </Paper>

      {/* Inicio del Formulario */}
      <Paper
        onSubmit={handleSubmit}
        component={"form"}
        sx={{ mt: 2, width: "50%", padding: " 20px 2% " }}
      >
        {/* Primera fila de Formulario */}
        <Box sx={{ display: "flex", gap: "2%", width: "100%" }}>
          {/* TextField Nombre del Grupo */}
          <FormControl sx={{ flex: 1 }}>
            <TextField
              name="name"
              size="small"
              label="Grupo"
              variant="outlined"
              inputProps={{ maxLength: 5 }}
              onChange={(e) =>
                handleForm(e, form, setForm, setFormErrors, withoutErrors)
              }
              helperText={
                formErrors.name.error ? formErrors.name.message : "Ej. GR1"
              }
              error={formErrors.name.error}
              value={form.name}
            />
          </FormControl>

          {/* Select para escoger Materia */}
          <FormControl size="small" sx={{ flex: 3 }}>
            <CustomInputLabel id="materia" error={formErrors.subjectId.error}>
              Materia
            </CustomInputLabel>
            <CustomSelect
              labelId="materia"
              value={form.subjectId}
              label="Materia"
              name="subjectId"
              onChange={(e) =>
                handleForm(e, form, setForm, setFormErrors, withoutErrors)
              }
              error={formErrors.subjectId.error}
            >
              {/* Filtro para el Select de Materia */}
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
                    subjectName: e.target.value.toUpperCase(),
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

        {/* Segunda fila del Formulario */}
        <Box sx={{ mt: 2, display: "flex", gap: "2%", width: "100%" }}>
          {/* Select para escoger Aula */}
          <FormControl size="small" sx={{ flex: 3.5 }}>
            <CustomInputLabel id="Aula" error={formErrors.subjectId.error}>
              Aula
            </CustomInputLabel>
            <CustomSelect
              labelId="Aula"
              value={form.classroomId}
              label="Aula"
              name="classroomId"
              onChange={(e) =>
                handleForm(e, form, setForm, setFormErrors, withoutErrors)
              }
              error={formErrors.subjectId.error}
            >
              <TextField
                value={filters.classroomCode}
                size="small"
                sx={{ width: "100%" }}
                variant="standard"
                label="Filtrar..."
                inputProps={{ style: { textTransform: "uppercase" } }}
                onKeyDown={(e) => e.stopPropagation()}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    classroomCode: e.target.value.toUpperCase(),
                  })
                }
              />
              <MenuItem value={""}></MenuItem>
              {classrooms.map((classroom, index) => {
                return (
                  <MenuItem key={index} value={classroom.id}>
                    {classroom.isLab
                      ? classroom.name
                      : classroom.building.code +
                        "/" +
                        classroom.floor +
                        "/" +
                        classroom.code}
                  </MenuItem>
                );
              })}
            </CustomSelect>
            {formErrors.classroomId.error && (
              <ErrorFormHelperText>
                {formErrors.classroomId.message}
              </ErrorFormHelperText>
            )}
          </FormControl>

          {/* TextField con el calendario del GR */}
          <Box sx={{ flex: 2, display: "flex", alignItems: "center" }}>
            <Typography variant="h6" mr={1.2} sx={{ fontWeight: 200 }}>
              Calendario:
            </Typography>
            <TextField
              disabled
              size="small"
              variant="outlined"
              value={currentCalendar.period}
              onChange={(e) =>
                setCurrentCalendar({
                  ...currentCalendar,
                  period: e.target.value,
                })
              }
            />
          </Box>
        </Box>

        {/* Tercera fila: Sesiones */}
        <Box
          sx={{
            display: "flex",
            gap: "2%",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {/* Label del numero de sesiones y el boton para agregar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "50%",
              mt: 2,
            }}
          >
            {/* Label para mostrar el numero de sesiones */}
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 300 }}>
              {"Sesiones: " + form.sessions.length}
            </Typography>
            {/* Boton para agregar una sesion */}
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                handleAddSessions(
                  form,
                  setForm,
                  initHours,
                  setInitHours,
                  endHours,
                  setEndHours
                )
              }
            >
              <AddIcon />{" "}
            </Button>
          </Box>

          {/* Contenedor para las sesiones */}
          <CustomGrid
            container
            error={formErrors.sessions.error ? 1 : 0}
            sx={{
              width: "100%",
              mt: 1.5,
              padding: "3%",
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
                  {/* Dia de la sesion */}
                  <FormControl size="small" sx={{ flex: 0.8 }}>
                    <InputLabel id="dia">Día</InputLabel>
                    <Select
                      labelId="dia"
                      value={session.day}
                      label="Día"
                      name="day"
                      onChange={(e) =>
                        handleSessionsChange(
                          form,
                          setForm,
                          index,
                          e,
                          setFormErrors,
                          withoutErrors
                        )
                      }
                    >
                      <MenuItem value={""}></MenuItem>
                      {days.map((day, index) => {
                        return (
                          <MenuItem key={index} value={index}>
                            {day}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  {/* Hora de inicio de la sesion */}
                  <TimePicker
                    label="Hora de inicio"
                    sx={{ flex: 1 }}
                    slotProps={{ textField: {size : "small"} }}
                    value={initHours[index]}
                    size="small"
                    onChange={(e) =>
                      handleSessionsChangeInit(
                        form,
                        setForm,
                        initHours,
                        setInitHours,
                        index,
                        e,
                        setFormErrors,
                        withoutErrors
                      )
                    }
                  />

                  {/* Hora de fin de la sesion */}
                  <TimePicker
                    label="Hora de Fin"
                    sx={{ flex: 1 }}
                    slotProps={{ textField: {size : "small"} }}
                    value={endHours[index]}
                    size="small"
                    onChange={(e) =>
                      handleSessionsChangeEnd(
                        form,
                        setForm,
                        endHours,
                        setEndHours,
                        index,
                        e,
                        setFormErrors,
                        withoutErrors
                      )
                    }
                  />

                  {/* Boton para borrar la session */}
                  <IconButton
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      handleRemoveSessions(
                        form,
                        setForm,
                        initHours,
                        setInitHours,
                        endHours,
                        setEndHours,
                        index
                      )
                    }
                  >
                    {" "}
                    <DeleteIcon />{" "}
                  </IconButton>
                </Grid>
              );
            })}
          </CustomGrid>
          {/* Mensaje de error para las sesiones */}
          {formErrors.sessions.error && (
            <ErrorFormHelperText>
              {formErrors.sessions.message}
            </ErrorFormHelperText>
          )}

          {/* Boton de submit */}
          <Box sx={{ mt: 1.5, display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "35%", mt: 2 }}
            >
              {isEdit ? "Editar" : "Agregar"}
            </Button>
          </Box>
        </Box>

        {/* Fin del Formulario */}
      </Paper>

      {/* Mensaje de exito */}
      <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={() => handleSuccessMessage(setSuccessMessage, navigate)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "5.5%" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography>
            {isEdit
              ? "El grupo se editó correctamente!"
              : "El grupo se agregó correctamente"}
          </Typography>
        </Alert>
      </Snackbar>

      {/* Mensaje de error */}
      <Snackbar
        open={errorMessage.error}
        autoHideDuration={4000}
        onClose={() => setErrorMessage({ ...errorMessage, error: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "1%" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          <Typography>{errorMessage.message}</Typography>
        </Alert>
      </Snackbar>

      {/* Fin del Contenedor */}
    </Box>
  );
};
