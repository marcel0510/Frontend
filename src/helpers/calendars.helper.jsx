import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { GetDate } from "./date.helper";
import { formToJSON } from "axios";
//Funcion que maneja el formulario
const handleForm = (e, form, setForm, formError, setFormError) => {
  setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
  setFormError({
    ...formError,
    period: { error: false },
    periodInit: { error: false },
    periodEnd: { error: false },
  });
};
//Funcion que valida el formualrio
export const validateForm = (form, formError, setFormError) => {
  if (form.period === "") {
    setFormError({
      period: { error: true, message: "No puede dejar este campo vacío" },
    });
    return false;
  }
  if (form.periodInit === form.periodEnd) {
    setFormError({
      ...formError,
      periodEnd: { error: true, message: "Las fechas no pueden coincidir" },
    });
    return false;
  }
  if(form.needsCopy && form.calendarId == 0){
    setFormError({
      ...formError,
      periodEnd: { error: true, message: "Debe seleccionar un calendario para copiar" },
    });
    return false;
  }
  return true;
};
const handleSuccessMessage = (setSuccessMessage, navigate, setIsSee) => {
  setSuccessMessage(false);
  setIsSee(true);
  navigate("/Main/Calendarios/Ver");
};

//Funcion para mapear los errores
export const ErrorMap = (errorType) => {
  switch (errorType) {
    case 1:
      return "El periodo del calendario ya está registrado";
    case 2:
      return "Ya existe un calendario con ese periodo";
    case 3:
      return "No se lograron eliminar los grupos asociados"
  }
};

export const RenderComponent = (
  navigate,
  handleSubmit,
  form,
  setForm,
  formError,
  setFormError,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
  calendars,
  isEdit,
  setIsSee
) => {
  return (
    //Contenedor
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "5%",
      }}
    >
      {/* Titulo del SubModulo */}
      <Paper sx={{ width: "47%", padding: "1% 0" }}>
        <Typography variant="h4" align="center">
          {isEdit ? "Editar Calendario" : "Agregar Calendario"}
        </Typography>
      </Paper>
      {/* Formulario */}
      <Paper
        onSubmit={handleSubmit}
        component={"form"}
        sx={{
          width: "47%",
          padding: "1% 2%",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Campo del periodo del calendaio */}
        <FormControl sx={{ width: "50%" }}>
          <TextField
            size="small"
            label="Nombre del periodo"
            name="period"
            variant="outlined"
            inputProps={{
              maxLength: 5,
              style: { textTransform: "uppercase" },
            }}
            onChange={(e) => handleForm(e, form, setForm, formError, setFormError)}
            error={formError.period.error}
            helperText={
              formError.period.error ? formError.period.message : "Ej. 2030A"
            }
            value={form.period}
          />
        </FormControl>
        {/* Campo para el inicio del periodo */}
        <DatePicker
          label={"Inicio del periodo"}
          name={"periodInit"}
          value={form.periodInit}
          onChange={(value) => setForm({ ...form, periodInit: GetDate(value) })}
          format="DD-MM-YYYY"
          sx={{ mt: 1.5, width: "50%" }}
        />
        {/* Campo para el fin del periodo */}
        <DatePicker
          label={"Fin del periodo"}
          name={"periodEnd"}
          value={form.periodEnd}
          format="DD-MM-YYYY"
          onChange={(value) => setForm({ ...form, periodEnd: GetDate(value) })}
          sx={{ mt: 2.5, width: "50%" }}
        />
        {
          !isEdit ? <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
            <FormControlLabel control={<Checkbox value={form.needsCopy} onChange={() => setForm({ ...form, needsCopy: !form.needsCopy })} />} label="¿Copiar calendario?" />
            {
              form.needsCopy ?
              <Select
              value={form.calendarId}
              onChange={(e) => setForm({ ...form, calendarId: e.target.value })}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 5,
                minWidth: 100,
                height: 40,
              }}
            >
              <MenuItem key={-1} value={0}></MenuItem>
              {calendars.map((calendar, index) => {
                return (
                  <MenuItem key={index} value={calendar.id}>
                    <Typography>{calendar.period}</Typography>
                  </MenuItem>
                );
              })}
              </Select>: <p />
            }
          </Box> :<p/>
        }
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "35%", mt: 2 }}
        >
          {isEdit ? "Editar" : "Agregar"}
        </Button>
      </Paper>
      {/* Error de las fechas del periodo */}
      <Snackbar
        open={formError.periodEnd.error}
        autoHideDuration={2000}
        onClose={() =>
          setFormError({ ...formError, periodEnd: { error: false } })
        }
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "3%" }} 
      >
        <Alert severity="warning" sx={{ width: "100%" }}>
          <Typography>{formError.periodEnd.message}</Typography>
        </Alert>
      </Snackbar>
      {/* Mensaje de exito */}
      <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={() => handleSuccessMessage(setSuccessMessage, navigate, setIsSee)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "3%" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography>{"El calendario se agregó correctamente!"}</Typography>
        </Alert>
      </Snackbar>
      {/* Mensaje de error */}
      <Snackbar
        open={errorMessage.error}
        autoHideDuration={2000}
        onClose={() => setErrorMessage({ ...errorMessage, error: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "3%" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          <Typography>{errorMessage.message}</Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
};
