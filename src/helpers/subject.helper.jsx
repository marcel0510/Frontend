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
import { alpha, alphaNumeric } from "./regularExpressions.helper";
import { CustomInputLabel, CustomSelect, ErrorFormHelperText } from "../Styles/Styled";
export const validateForm = (form, setFormErrors, alias) => {
  const errors = { code: {}, name: {}, alias: {}, numHours: {}, numCredits: {}, numSemester: {} };
  var validate = true;
  if (form.code === "") {
    errors["code"]["error"] = true;
    errors["code"]["message"] = "No puede dejar este campo vacío";
    validate = false;
  }
  if (form.name === "") {
    errors["name"]["error"] = true;
    errors["name"]["message"] = "No puede dejar este campo vacío";
    validate = false;
  }
  if(form.numHours === ""){
    errors["numHours"]["error"] = true;
    errors["numHours"]["message"] = "Debe seleccionar un numero de horas";
    validate = false;
  }
  if(form.numCredits === ""){
    errors["numCredits"]["error"] = true;
    errors["numCredits"]["message"] = "Debe seleccionar un numero de creditos";
    validate = false;
  }
  if(form.numHours === ""){
    errors["numSemester"]["error"] = true;
    errors["numSemester"]["message"] = "Debe seleccionar un numero de semestre";
    validate = false;
  }
  if (alias && form.alias === "") {
    errors["alias"]["error"] = true;
    errors["alias"]["message"] = "No puede dejar este campo vacío";
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
      return "El código de la materia ya está registrado";
    case 2:
      return "Ya existe una materia con ese código";
    case 3:
      return "No se lograron eliminar los grupos asociadas";
  }
};
const handleForm = (e, form, setForm, setFormErrors, withtoutErrors) => {
  if (e.target.name === "code" || e.target.name === "name") {
    setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
  } else {
    if (e.target.name === "numCredits") {
      if (parseInt(e.target.value) >= 1 && parseInt(e.target.value) <= 5)
        setForm({ ...form, [e.target.name]: parseInt(e.target.value) });
    }
    if (e.target.name === "numHours") {
        setForm({ ...form, [e.target.name]: parseInt(e.target.value) });
    }
    if (e.target.name === "numSemester") {
      if (parseInt(e.target.value) >= 1 && parseInt(e.target.value) <= 9)
        setForm({ ...form, [e.target.name]: parseInt(e.target.value) });
    }
    if (e.target.name === "alias") {
      setForm({ ...form, alias: e.target.value });
    }
  }
  setFormErrors(withtoutErrors);
};
const onChangeAlias = (form, setForm, alias, setAlias) => {
  setAlias(!alias);
  if (alias) setForm({ ...form, alias: "" });
};
//Funcion que maneja el mensaje de exito
const handleSuccessMessage = (setSuccessMessage, navigate) => {
  setSuccessMessage(false);
  navigate("/Main/Materias/Ver");
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
  alias,
  setAlias,
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
          {isEdit ? "Editar Materia" : "Agregar Materia"}
        </Typography>
      </Paper>
      {/* Formulario */}
      <Paper
        onSubmit={handleSubmit}
        component={"form"}
        sx={{
          width: "50%",
          padding: "1%",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Primera fila */}
        <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
          {/* Campos Codigo */}
          <FormControl sx={{ flex: 1 }}>
            <TextField
              size="small"
              label="Codigo"
              name="code"
              variant="outlined"
              inputProps={{
                maxLength: 7,
                style: { textTransform: "uppercase" },
              }}
              onKeyDown={(e) => {
                if (!alphaNumeric.test(e.key)) e.preventDefault();
              }}
              onChange={(e) =>
                handleForm(e, form, setForm, setFormErrors, withoutErrors)
              }
              error={formErrors.code.error}
              helperText={
                formErrors.code.error ? formErrors.code.message : "Ej. ITID843"
              }
              value={form.code}
            />
          </FormControl>

          {/* Campo de nombre */}
          <FormControl sx={{ flex: 3 }}>
            <TextField
              name="name"
              size="small"
              label="Nombre de la Materia"
              variant="outlined"
              inputProps={{ maxLength: 90 }}
              onKeyDown={(e) => {
                if (!alpha.test(e.key)) e.preventDefault();
              }}
              onChange={(e) =>
                handleForm(e, form, setForm, setFormErrors, withoutErrors)
              }
              error={formErrors.name.error}
              helperText={formErrors.name.message}
              value={form.name}
            />
          </FormControl>
        </Box>

        {/* Segunda fila */}
        <Box sx={{ width: "100%", display: "flex", gap: 2, mt: 2.5 }}>
          {/* Creditos */}
          <FormControl size="small" sx={{ flex: 1.2 }}>
            <CustomInputLabel id="numHoras" error={formErrors.numCredits.error}>
            Núm. de créditos
            </CustomInputLabel>
            <CustomSelect
              labelId="numHoras"
              value={form.numCredits}
              label="Num. Creditos"
              name="numCredits"
              error={formErrors.numCredits.error}
              onChange={(e) =>
                handleForm(e, form, setForm, setFormErrors, withoutErrors)
              }
            >
              <MenuItem value={""}></MenuItem>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              
            </CustomSelect>
            {formErrors.numCredits.error && (
              <ErrorFormHelperText error={formErrors.numCredits.error}>
                {formErrors.numCredits.message}
              </ErrorFormHelperText>
            )}
          </FormControl>

          {/* Horas */}
          <FormControl size="small" sx={{ flex: 0.6 }}>
            <CustomInputLabel id="numHoras" error={formErrors.numHours.error}>
              Horas
            </CustomInputLabel>
            <CustomSelect
              labelId="numHoras"
              value={form.numHours}
              label="Num. Horas"
              name="numHours"
              error={formErrors.numHours.error}
              onChange={(e) =>
                handleForm(e, form, setForm, setFormErrors, withoutErrors)
              }
            >
              <MenuItem value={""}></MenuItem>
              <MenuItem value={48}>48</MenuItem>
              <MenuItem value={96}>96</MenuItem>
              <MenuItem value={144}>144</MenuItem>
              <MenuItem value={240}>240</MenuItem>
              
            </CustomSelect>
            {formErrors.numHours.error && (
              <ErrorFormHelperText error={formErrors.numHours.error}>
                {formErrors.numHours.message}
              </ErrorFormHelperText>
            )}
          </FormControl>
          {/* Num semestre */}
          <FormControl size="small" sx={{ flex: 1.2 }}>
            <CustomInputLabel id="numHoras" error={formErrors.numSemester.error}>
            Núm. de Semestre
            </CustomInputLabel>
            <CustomSelect
              labelId="numHoras"
              value={form.numSemester}
              label="Num. Creditos"
              name="numSemester"
              error={formErrors.numSemester.error}
              onChange={(e) =>
                handleForm(e, form, setForm, setFormErrors, withoutErrors)
              }
            >
              <MenuItem value={""}></MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              
            </CustomSelect>
            {formErrors.numSemester.error && (
              <ErrorFormHelperText error={formErrors.numSemester.error}>
                {formErrors.numSemester.message}
              </ErrorFormHelperText>
            )}
          </FormControl>
          <Box sx={{ flex: 0.6 }} />
        </Box>
        {/* Tercera Fila */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            mt: 2.3,
          }}
        >
          {/* Checkbox para laboratorio */}
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isLab}
                onChange={() => setForm({ ...form, isLab: !form.isLab })}
              />
            }
            label="¿Es un laboratorio?"
          />
          {/* Checkbox para agregar un alias */}
          <FormControlLabel
            control={
              <Checkbox
                checked={alias}
                onChange={() => onChangeAlias(form, setForm, alias, setAlias)}
              />
            }
            label={isEdit ? "Alias" : "¿Agregar alias?"}
          />
          {alias && (
            <TextField
              name="alias"
              size="small"
              label="Alias de la Materia"
              variant="outlined"
              inputProps={{ maxLength: 90 }}
              onKeyDown={(e) => {
                if (!alpha.test(e.key)) e.preventDefault();
              }}
              onChange={(e) =>
                handleForm(e, form, setForm, setFormErrors, withoutErrors)
              }
              error={formErrors.alias.error}
              helperText={ formErrors.alias.error ? formErrors.alias.message : "Nombre corto. Ej: LAN"}
              value={form.alias}
            />
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
              ? "La materia se editó correctamente!"
              : "La materia se agregó correctamente"}
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
