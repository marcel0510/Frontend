import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
//Funcion que maneja el formulario
export const handleForm = (e, form, setForm, formError, setFormError) => {
  if (e.target.name === "code" || e.target.name === "floors")
    setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
  else setForm({ ...form, [e.target.name]: e.target.value });
  setFormError({
    ...formError,
    name: { error: false },
    code: { error: false },
  });
};
const handleAddFloors = (form, setForm) => {
  const newFloor = { code: "" };
  setForm({ ...form, floors: [...form.floors, newFloor] });
};

const handleRemoveFloors = (index, form, setForm) => {
  const updatedFloors = [...form.floors];
  updatedFloors.splice(index, 1);
  setForm({ ...form, floors: updatedFloors });
};

const handleFloorsChange = (index, e, form, setForm) => {
  const updatedFloors = [...form.floors];
  updatedFloors[index] = {
    ...updatedFloors[index],
    code: e.target.value.toUpperCase(),
  };
  setForm({ ...form, floors: updatedFloors });
};
//Funcion que valida el formualrio
export const validateForm = (form, formError, setFormError) => {
  if (form.code === "" && form.name === "") {
    setFormError({
      name: { error: true, message: "No puede dejar este campo vacío" },
      code: { error: true, message: "No puede dejar este campo vacío" },
    });
    return false;
  }
  if (form.code === "") {
    setFormError({
      ...formError,
      code: { error: true, message: "No puede dejar este campo vacío" },
    });
    return false;
  }
  if (form.name === "") {
    setFormError({
      ...formError,
      name: { error: true, message: "No puede dejar este campo vacío" },
    });
    return false;
  } else if (form.name.length < 3) {
    setFormError({
      ...formError,
      name: {
        error: true,
        message: "El nombre debe tener más de 3 caracteres",
      },
    });
    return false;
  }
  return true;
};
//Funcion que maneja el mensaje de exito
export const handleSuccessMessage = (setSuccessMessage, navigate, setIsSee) => {
  setSuccessMessage(false);
  setIsSee(true);
  navigate("/Main/Edificios/Ver");
};
//Funcion para mapear los errores
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
  isEdit,
  setIsSee
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
        {/* Campo de codigo de edificio */}
        <FormControl sx={{ width: "50%" }}>
          <TextField
            size="small"
            label="Codigo"
            name="code"
            variant="outlined"
            inputProps={{ maxLength: 3, style: { textTransform: "uppercase" } }}
            onChange={(e) =>
              handleForm(e, form, setForm, formError, setFormError)
            }
            error={formError.code.error}
            helperText={
              formError.code.error ? formError.code.message : "Ej. E17"
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
            onChange={(e) =>
              handleForm(e, form, setForm, formError, setFormError)
            }
            onKeyDown={(e) => {
              if (/^[0-9]+$/.test(e.key)) e.preventDefault();
            }}
            error={formError.name.error}
            helperText={
              formError.name.error
                ? formError.name.message
                : "Ej. Edificio de..."
            }
            value={form.name}
          />
        </FormControl>

        <Box
          sx={{ display: "flex", alignItems: "center", width: "50%", mt: 2 }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {"Pisos: " + form.floors.length}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleAddFloors(form, setForm)}
          >
            <AddIcon />{" "}
          </Button>
        </Box>

        <Grid
        container
          sx={{
            width: "50%",
            mt: 1.5,
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
                  label={"Piso " + (index + 1)}
                  variant="outlined"
                  size="small"
                  inputProps={{ maxLength: 3 }}
                  onChange={(e) => handleFloorsChange(index, e, form, setForm)}
                  onKeyDown={(e) => {
                    if (!/^[a-zA-Z0-9]*$/.test(e.key)) e.preventDefault();
                  }}
                  value={floor.code}
                  sx={{ mr: 0.5 }}
                />
                <IconButton
                  variant="outlined"
                  size="small"
                  onClick={() => handleRemoveFloors(index, form, setForm)}
                >
                  {" "}
                  <DeleteIcon />{" "}
                </IconButton>
              </Grid>
            );
          })}
        </Grid>

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
          handleSuccessMessage(setSuccessMessage, navigate, setIsSee)
        }
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
