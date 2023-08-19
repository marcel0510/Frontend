import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomGrid, ErrorFormHelperText } from "../Styles/Styled";
import { alpha, alphaNumeric } from "./regularExpressions.helper";

export const validateForm = (form, setFormErrors) => {
  const errors = { code: {}, name: {}, floors: {} };
  var validate = true;
  var validateFloors = true;
  form.floors.forEach((f) => {
    if (f.code === "") validateFloors = false;
  });

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

  if (!validateFloors) {
    errors["floors"]["error"] = true;
    errors["floors"]["message"] =
      "Debe poner el codigo en cada uno de los pisos";
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
      return "El código de edificio ya está registrado";
    case 2:
      return "Ya existe un edificio con ese código";
    case 3:
      return "No se lograron eliminar las aulas asociadas";
  }
};
//Funcion que maneja el formulario
const handleForm = (e, form, setForm, setFormError, withoutErrors) => {
  if (e.target.name === "code" || e.target.name === "floors")
    setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
  else setForm({ ...form, [e.target.name]: e.target.value });
  setFormError(withoutErrors);
};
const handleAddFloors = (form, setForm, setFormErrors, withoutErrors) => {
  const newFloor = { code: "" };
  setForm({ ...form, floors: [...form.floors, newFloor] });
  setFormErrors(withoutErrors);
};
const handleRemoveFloors = (
  index,
  form,
  setForm,
  setFormErrors,
  withoutErrors
) => {
  if (form.floors.length > 1) {
    const updatedFloors = [...form.floors];
    updatedFloors.splice(index, 1);
    setForm({ ...form, floors: updatedFloors });
    setFormErrors(withoutErrors);
  }
};
const handleFloorsChange = (
  index,
  e,
  form,
  setForm,
  setFormErrors,
  withoutErrors
) => {
  const updatedFloors = [...form.floors];
  updatedFloors[index] = {
    ...updatedFloors[index],
    code: e.target.value.toUpperCase(),
  };
  setForm({ ...form, floors: updatedFloors });
  setFormErrors(withoutErrors);
};

const handleSuccessMessage = (setSuccessMessage, navigate) => {
  setSuccessMessage(false);
  navigate("/Main/Edificios/Ver");
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
      <Paper sx={{ width: "47%", padding: "1% 0" }}>
        <Typography variant="h4" align="center">
          {isEdit ? "Editar Edificio" : "Agregar Edificio"}
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
        {/* Primera fila: Codigo de edificio */}
        <FormControl sx={{ width: "50%" }}>
          <TextField
            size="small"
            label="Codigo"
            name="code"
            variant="outlined"
            inputProps={{ maxLength: 3, style: { textTransform: "uppercase" } }}
            onKeyDown={(e) => {
              if (!alphaNumeric.test(e.key)) e.preventDefault();
            }}
            onChange={(e) =>
              handleForm(e, form, setForm, setFormErrors, withoutErrors)
            }
            error={formErrors.code.error}
            helperText={
              formErrors.code.error ? formErrors.code.message : "Ej. E17"
            }
            value={form.code}
          />
        </FormControl>

        {/* Campo de nombre de edificio */}
        <FormControl sx={{ width: "50%", mt: 1 }}>
          <TextField
            name="name"
            size="small"
            label="Nombre del Edificio"
            variant="outlined"
            inputProps={{ maxLength: 40 }}
            onKeyDown={(e) => {
              if (!alpha.test(e.key)) e.preventDefault();
            }}
            onChange={(e) =>
              handleForm(e, form, setForm, setFormErrors, withoutErrors)
            }
            error={formErrors.name.error}
            helperText={
              formErrors.name.error
                ? formErrors.name.message
                : "Ej. Edificio de..."
            }
            value={form.name}
          />
        </FormControl>

        {/* Inicia el campo de los pisos */}
        {/* Contenero para Label Pisos y boton Agregar */}
        <Box
          sx={{ display: "flex", alignItems: "center", width: "50%", mt: 2 }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 300 }}>
            {"Pisos: " + form.floors.length}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              handleAddFloors(form, setForm, setFormErrors, withoutErrors)
            }
          >
            <AddIcon />{" "}
          </Button>
        </Box>

        {/* Conjunto de pisos en Grid */}
        <CustomGrid
          container
          error={formErrors.floors.error ? 1 : 0}
          sx={{
            width: "50%",
            mt: 1.5,
            padding: "2.5%",
          }}
        >
          {form.floors.map((floor, index) => {
            return (
              <Grid
                item
                key={index}
                sx={{ mt: 1, display: "flex", alignItems: "center" }}
                md={5.9}
              >
                <TextField
                  label={"Piso"}
                  variant="outlined"
                  size="small"
                  inputProps={{ maxLength: 3 }}
                  onKeyDown={(e) => {
                    if (!alphaNumeric.test(e.key)) e.preventDefault();
                  }}
                  onChange={(e) =>
                    handleFloorsChange(
                      index,
                      e,
                      form,
                      setForm,
                      setFormErrors,
                      withoutErrors
                    )
                  }
                  value={floor.code}
                  sx={{ mr: 0.5 }}
                />
                <IconButton
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    handleRemoveFloors(
                      index,
                      form,
                      setForm,
                      setFormErrors,
                      withoutErrors
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
        {formErrors.floors.error ? (
          <ErrorFormHelperText error={formErrors.floors.error}>
            {formErrors.floors.message}
          </ErrorFormHelperText>
        ) : (
          <FormHelperText>
            Agregue los códigos de los pisos: Ej: PB, P1, ...
          </FormHelperText>
        )}

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
        onClose={() => handleSuccessMessage(setSuccessMessage, navigate)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "5.5%" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography>
            {isEdit
              ? "El edificio se editó correctamente!"
              : "El edificio se agregó correctamente"}
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
