import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
export const handleForm = (
  e,
  form,
  setForm,
  formError,
  setFormError,
) => {
  if (
    e.target.name === "code" ||
    e.target.name === "name" ||
    e.target.name === "alias"
  ) {
    setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
  } else {
    if (e.target.name === "numCredits") {
      if (parseInt(e.target.value) >= 1 && parseInt(e.target.value) <= 3)
        setForm({ ...form, [e.target.name]: parseInt(e.target.value) });
    }
    if (e.target.name === "numHours") {
      if (parseInt(e.target.value) >= 1 && parseInt(e.target.value) <= 5)
        setForm({ ...form, [e.target.name]: parseInt(e.target.value) });
    }
    if (e.target.name === "numSemester") {
      if (parseInt(e.target.value) >= 1 && parseInt(e.target.value) <= 9)
        setForm({ ...form, [e.target.name]: parseInt(e.target.value) });
    }
  }
  setFormError({
    ...formError,
    name: { error: false },
    code: { error: false },
  });
};

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
  }else if (form.name.length < 3) {
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
  navigate("/Main/Materias/Ver");
};

//Funcion para mapear los errores
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
  alias,
  setAlias,
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
        {/* Campos Codigo y nombre */}
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
              onChange={(e) =>
                handleForm(e, form, setForm, formError, setFormError)
              }
              error={formError.code.error}
              helperText={
                formError.code.error ? formError.code.message : "Ej. ITID843"
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
              onChange={(e) =>
                handleForm(e, form, setForm, formError, setFormError)
              }
              onKeyDown={(e) => {
                if (/^[0-9]+$/.test(e.key)) e.preventDefault();
              }}
              error={formError.name.error}
              helperText={formError.name.message}
              value={form.name}
            />
          </FormControl>
          {/* Campos Creditos, Horas y Semestre */}
        </Box>
        <Box sx={{ width: "100%", display: "flex", gap: 2, mt: 2.5 }}>
          {/* Creditos */}
          <FormControl sx={{ flex: 1 }}>
            <TextField
              size="small"
              label="Número de créditos"
              name="numCredits"
              variant="outlined"
              inputProps={{
                type: "number",
              }}
              onChange={(e) =>
                handleForm(e, form, setForm, formError, setFormError)
              }
              value={form.numCredits}
            />
          </FormControl>
          {/* Campo de horas */}
          <FormControl sx={{ flex: 1 }}>
            <TextField
              name="numHours"
              size="small"
              label="Número de horas"
              variant="outlined"
              inputProps={{ type: "number" }}
              onChange={(e) =>
                handleForm(e, form, setForm, formError, setFormError)
              }
              value={form.numHours}
            />
          </FormControl>
          {/* Campo de Semestre */}
          <FormControl sx={{ flex: 1 }}>
            <TextField
              name="numSemester"
              size="small"
              label="Número de semestre"
              variant="outlined"
              inputProps={{ type: "number" }}
              onChange={(e) =>
                handleForm(e, form, setForm, formError, setFormError)
              }
              value={form.numSemester}
            />
          </FormControl>
          <Box sx={{ flex: 0.6 }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            mt: 2.3,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isLab}
                onChange={() => setForm({ ...form, isLab: !form.isLab })}
              />
            }
            label="¿Es un laboratorio?"
          />
          <FormControlLabel
            control={
              <Checkbox checked={alias} onChange={() => setAlias(!alias)} />
            }
            label={isEdit ? "Alias" : "¿Agregar alias?"}
          />
          {alias ? (
            <TextField
              name="alias"
              size="small"
              label="Alias de la Materia"
              variant="outlined"
              inputProps={{ maxLength: 90 }}
              onChange={(e) =>
                handleForm(e, form, setForm, formError, setFormError, alias)
              }
              onKeyDown={(e) => {
                if (/^[0-9]+$/.test(e.key)) e.preventDefault();
              }}
              error={formError.alias.error}
              helperText={formError.alias.message}
              value={form.alias}
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
          handleSuccessMessage(setSuccessMessage, navigate, setIsSee)
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
