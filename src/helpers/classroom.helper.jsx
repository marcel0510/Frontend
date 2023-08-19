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
import {
  CustomInputLabel,
  CustomSelect,
  ErrorFormHelperText,
} from "../Styles/Styled";
import { alpha, alphaNumeric } from "../helpers/regularExpressions.helper";


export const validateForm = (form, setFormErrors) => {
  const errors = { code: {}, name: {}, floor: {}, buildingId: {} };
  var validate = true;
  if (form.buildingId === 0) {
    errors["buildingId"]["error"] = true;
    errors["buildingId"]["message"] = "Debe seleccionar un edificio";
    validate = false;
  }
  if (form.floor === "") {
    errors["floor"]["error"] = true;
    errors["floor"]["message"] = "Debe seleccionar un piso";
    validate = false;
  }
  if (form.code === "") {
    errors["code"]["error"] = true;
    errors["code"]["message"] = "No puede dejar este campo vacío";
    validate = false;
  }
  if (form.isLab && form.name === "") {
    errors["name"]["error"] = true;
    errors["name"]["message"] = "No puede dejar este campo vacío";
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
      return "El código del aula ya está registrado";
    case 2:
      return "Ya existe un aula con ese código";
    case 3:
      return "No se lograron eliminar los grupos asociadas";
  }
};

const handleForm = (e, form, setForm, setFormErrors, withoutErrors) => {
  if (e.target.name === "capacity") {
    if (parseInt(e.target.value) >= 10 && parseInt(e.target.value) <= 50)
      setForm({ ...form, capacity: parseInt(e.target.value) });
  }
  if (e.target.name == "buildingId")
    setForm({ ...form, buildingId: parseInt(e.target.value) });
  if (e.target.name === "name") setForm({ ...form, name: e.target.value });
  if (e.target.name === "code" || e.target.name == "floor")
    setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });

  setFormErrors(withoutErrors);
};

//Funcion que maneja el mensaje de exito
export const handleSuccessMessage = (setSuccessMessage, navigate) => {
  setSuccessMessage(false);
  navigate("/Main/Aulas/Ver");
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
  buildings,
  isEdit,
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
          {isEdit ? "Editar Aula" : "Agregar Aula"}
        </Typography>
      </Paper>
      {/* Formulario */}
      <Paper
        onSubmit={handleSubmit}
        component={"form"}
        sx={{
          width: "50%",
          padding: "1.8% 2.5%",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Primera fila de formulario */}
        <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
          {/* Campo para seleccionar el edificio */}
          <FormControl size="small" sx={{ flex: 2 }}>
            <CustomInputLabel id="edificio" error={formErrors.buildingId.error}>
              Edificio
            </CustomInputLabel>
            <CustomSelect
              labelId="edificio"
              value={form.buildingId}
              label="Edificio"
              name="buildingId"
              error={formErrors.buildingId.error}
              onChange={(e) =>
                handleForm(e, form, setForm, setFormErrors, withoutErrors)
              }
            >
              <MenuItem value={""}></MenuItem>
              {buildings.map((building, index) => {
                return (
                  <MenuItem key={index} value={building.id}>
                    {building.name}
                  </MenuItem>
                );
              })}
            </CustomSelect>
            {formErrors.buildingId.error && (
              <ErrorFormHelperText error={formErrors.buildingId.error}>
                {formErrors.buildingId.message}
              </ErrorFormHelperText>
            )}
          </FormControl>

          {/* Campo para seleccionar el piso */}
          <FormControl size="small" sx={{ flex: 1 }}>
            <CustomInputLabel id="Piso" error={formErrors.floor.error}>
              Piso
            </CustomInputLabel>
            <CustomSelect
              labelId="piso"
              value={form.floor}
              label="Edificio"
              name="floor"
              error={formErrors.floor.error}
              onChange={(e) =>
                handleForm(e, form, setForm, setFormErrors, withoutErrors)
              }
            >
              {form.buildingId === "" ? (
                <MenuItem value={""}></MenuItem>
              ) : (
                buildings[
                  buildings.findIndex((b) => b.id === form.buildingId)
                ].floors.map((floor, index) => {
                  return (
                    <MenuItem key={index} value={floor.code}>
                      {floor.code}
                    </MenuItem>
                  );
                })
              )}
            </CustomSelect>
            {formErrors.floor.error && (
              <ErrorFormHelperText error={formErrors.floor.error}>
                {formErrors.floor.message}
              </ErrorFormHelperText>
            )}
          </FormControl>
        </Box>

        {/* Segunda fila del formulario */}
        <Box sx={{ mt: 2, width: "100%", display: "flex", gap: 1 }}>
          {/* Campo del Codigo del Aula */}
          <FormControl sx={{ width: "30%" }}>
            <TextField
              name="code"
              size="small"
              label="Codigo del aula"
              variant="outlined"
              inputProps={{ maxLength: 6 }}
              onKeyDown={e => { if(!alphaNumeric.test(e.key)) e.preventDefault() }}
              onChange={(e) =>
                handleForm(e, form, setForm, setFormErrors, withoutErrors)
              }
              value={form.code}
              error={formErrors.code.error}
              helperText={
                formErrors.code.error ? formErrors.code.message : "Ej. E002"
              }
            />
          </FormControl>

          {/* Campo Capacidad del Aula */}
          <FormControl sx={{ width: "25%" }}>
            <TextField
              name="capacity"
              size="small"
              label="Capacidad"
              variant="outlined"
              inputProps={{ type: "number" }}
              onChange={(e) => handleForm(e, form, setForm, setFormErrors, withoutErrors)}
              value={form.capacity}
            />
          </FormControl>
        </Box>

        {/* Campo para agregar un nombre de laboratorio */}
        <Box sx={{ mt: 0.5, width: "100%", display: "flex", gap: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isLab}
                onChange={() => setForm({ ...form, isLab: !form.isLab })}
              />
            }
            label={"¿Laboratorio?"}
          />
          {form.isLab ? (
            <TextField
              name="name"
              size="small"
              label="Nombre del Laboratorio"
              variant="outlined"
              inputProps={{ maxLength: 90 }}
              value={form.name}
              onKeyDown={e => { if(!alpha.test(e.key)) e.preventDefault() }}

              onChange={(e) =>
                handleForm(e, form, setForm, setFormErrors, withoutErrors)
              }
              sx={{ flex: 2 }}
              error={formErrors.name.error}
              helperText={
                formErrors.name.error
                  ? formErrors.name.message
                  : "Ej. Laboratorio de..."
              }
            />
          ) : (
            <p />
          )}
        </Box>
        {/* Boton de submit */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "35%", mt: 2 }}
        >
          {isEdit ? "Editar" : "Agregar"}
        </Button>
      </Paper>
      {/* Mensaje de exito */}
      <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={() =>
          handleSuccessMessage(setSuccessMessage, navigate)
        }
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "5.5%" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography>
            {isEdit
              ? "El aula se editó correctamente!"
              : "El aula se agregó correctamente"}
          </Typography>
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
