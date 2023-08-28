import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { GetDate } from "./date.helper";
import { CustomSelect, ErrorFormHelperText } from "../Styles/Styled";
import { alphaNumeric } from "../helpers/regularExpressions.helper";

export const validateForm = (form, setFormErrors) => {
  const errors = { period: {}, periodInit: {}, periodEnd: {} };
  var validate = true;
  if (form.period === "") {
    errors["period"]["error"] = true;
    errors["period"]["message"] = "No puede dejar este campo vacío";
    validate = false;
  }
  if (form.needsCopy && form.calendarId == 0) {
    errors["periodInit"]["error"] = true;
    errors["periodInit"]["message"] =
      "Seleccione un calendario";
    validate = false;
  }
  if (form.periodInit === form.periodEnd) {
    errors["periodEnd"]["error"] = true;
    errors["periodEnd"]["message"] =
      "La fecha de inicio y fin del periodo no deben coincidir";
    validate = false;
  }
  if (form.periodInit === form.periodEnd) {
    errors["periodEnd"]["error"] = true;
    errors["periodEnd"]["message"] =
      "La fecha de inicio y fin del periodo no deben coincidir";
    validate = false;
  }
  if (validate) return true;
  else {
    setFormErrors(errors);
    return false;
  }
};
export const ErrorMap = (errorType) => {
  switch (errorType) {
    case 1:
      return "El periodo del calendario ya está registrado";
    case 2:
      return "Ya existe un calendario con ese periodo";
    case 3:
      return "No se lograron eliminar los grupos asociados";
  }
};
const handlePeriodInit = (
  e,
  form,
  setForm,
  setPeriodInit,
  setFormErrors,
  withoutErrors
) => {
  setForm({ ...form, periodInit: GetDate(e) });
  setPeriodInit(e);
  setFormErrors(withoutErrors);
};
const handlePeriodEnd = (
  e,
  form,
  setForm,
  setPeriodEnd,
  setFormError,
  withoutErrors
) => {
  setForm({ ...form, periodEnd: GetDate(e) });
  setPeriodEnd(e);
  setFormError(withoutErrors);
};
const handleSuccessMessage = (setSuccessMessage, navigate) => {
  setSuccessMessage(false);
  navigate("/Main/Calendarios/Ver");
};

//Funcion para mapear los errores

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
  calendars,
  periodInit,
  setPeriodInit,
  periodEnd,
  setPeriodEnd,
  isEdit,
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
        {/* Primera fila: Periodo del calendaio */}
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
            onKeyDown={e => { if(!alphaNumeric.test(e.key)) e.preventDefault() }}
            onChange={(e) =>
              setForm({ ...form, period: e.target.value.toUpperCase() })
            }
            error={formErrors.period.error}
            helperText={
              formErrors.period.error ? formErrors.period.message : "Ej. 2030A"
            }
            value={form.period}
          />
        </FormControl>

        {/* Segunda fila: Inicio del periodo */}
        <DatePicker
          label={"Inicio del periodo"}
          name={"periodInit"}
          value={periodInit}
          onChange={(e) =>
            handlePeriodInit(
              e,
              form,
              setForm,
              setPeriodInit,
              setFormErrors,
              withoutErrors
            )
          }
          format="DD-MM-YYYY"
          sx={{ mt: 1.5, width: "50%" }}
        />

        {/* Tercera fila: Fin del periodo */}
        <DatePicker
          label={"Fin del periodo"}
          name={"periodEnd"}
          value={periodEnd}
          format="DD-MM-YYYY"
          onChange={(e) =>
            handlePeriodEnd(
              e,
              form,
              setForm,
              setPeriodEnd,
              setFormErrors,
              withoutErrors
            )
          }
          sx={{ mt: 2.5, width: "50%" }}
        />
        {
          // Checkbox que nos permite copiar el calendario
          !isEdit ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={form.needsCopy}
                    onChange={() =>
                      setForm({ ...form, needsCopy: !form.needsCopy })
                    }
                  />
                }
                label="¿Copiar calendario?"
              />
              {
                // Select para escoger el calendario del cual copiar
                form.needsCopy ? (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CustomSelect
                      value={form.calendarId}
                      error={formErrors.periodInit.error}
                      onChange={(e) =>
                        setForm({ ...form, calendarId: e.target.value })
                      }
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
                    </CustomSelect>
                    {formErrors.periodInit.error && (
                      <ErrorFormHelperText>
                        {formErrors.periodInit.message}
                      </ErrorFormHelperText>
                    )}
                  </Box>
                ) : (
                  <p />
                )
              }
            </Box>
          ) : (
            <p />
          )
        }

        {/* Button de submit */}
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
        open={formErrors.periodEnd.error}
        autoHideDuration={3000}
        onClose={() =>
          setFormErrors({ ...formErrors, periodEnd: { error: false } })
        }
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "3%" }}
      >
        <Alert severity="warning" sx={{ width: "100%" }}>
          <Typography>{formErrors.periodEnd.message}</Typography>
        </Alert>
      </Snackbar>

      {/* Mensaje de exito */}
      <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={() =>
          handleSuccessMessage(setSuccessMessage, navigate)
        }
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
