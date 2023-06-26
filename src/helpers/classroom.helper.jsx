import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
export const handleForm = (e, form, setForm, formError, setFormError, setSelectedBuilding) => {
  if (e.target.name === "capacity") {
    if (parseInt(e.target.value) >= 10 && parseInt(e.target.value) <= 50)
      setForm({ ...form, [e.target.name]: parseInt(e.target.value) });
  }
  if (e.target.name === "code" || e.target.name === "name") 
      setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
  if(e.target.name == "buildingId" || e.target.name == "floor"){
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form)
  }
    
  setFormError({
    ...formError,
    code: { error: false },
    floor: { error: false },
    buildingId: { error: false },
  });
};

export const validateForm = (form, formError, setFormError) => {
  if (form.code === "" && form.floor === "" && form.buildingId == 0) {
    setFormError({
      code: { error: true, message: "No puede dejar este campo vacío" },
      floor: { error: true, message: "Debe seleccionar un piso" },
      buildingId: { error: true, message: "Debe seleccionar un edificio" },
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
  
  if(form.buildingId == 0){
    setFormError({
      ...formError,
      buildingId: { error: true, message: "Debe seleccionar un edificio" },
    });
    return false;
  }

  return true;
};
//Funcion que maneja el mensaje de exito
export const handleSuccessMessage = (setSuccessMessage, navigate, setIsSee) => {
  setSuccessMessage(false);
  setIsSee(true);
  navigate("/Main/Aulas/Ver");
};

const getIndex = (buildings, buildingId) => {
  const foundBuilding = buildings.find(b => b.id === buildingId);
  return foundBuilding.index;
}

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
  buildings,  
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
          {isEdit ? "Editar Aula" : "Agregar Aula"}
        </Typography>
      </Paper>
      {/* Formulario */}
      <Paper
        onSubmit={handleSubmit}
        component={"form"}
        sx={{
          width: "50%",
          padding: "1% 2.5%",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Campos Edificio y piso */}
        <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
          <FormControl size="small" sx={{ flex: 2 }}>
            <InputLabel id="edificio">Edificio</InputLabel>
            <Select
              labelId="edificio"
              value={form.buildingId}
              label="Edificio"
              name="buildingId"
              onChange={(e) => handleForm(e, form, setForm, formError, setFormError)}
            >
              <MenuItem value={0}></MenuItem>
              {buildings.map((building, index) => {
                return (
                  <MenuItem key={index} value={building.id}>
                    {building.name}
                  </MenuItem>
                );
              })}
            </Select>
            {
              formError.buildingId.error ?
              <FormHelperText sx={{color: "#ec1c18"}}>{formError.buildingId.message}</FormHelperText>:
              <p/>

            }
          </FormControl>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel id="Piso">Piso</InputLabel>
            <Select
              labelId="piso"
              value={form.floor}
              label="Edificio"
              name="floor"
              onChange={(e) => handleForm(e, form, setForm, formError, setFormError)}
            >
              {form.buildingId === 0 ? (
                <MenuItem value={""}></MenuItem>
              ) : (
                buildings[buildings.findIndex(b => b.id === form.buildingId)].floors.map((floor, index) => {
                  return (
                    <MenuItem key={index} value={floor.code}>
                      {floor.code}
                    </MenuItem>
                  );
                })
              )}
            </Select>
            {
              formError.floor.error ?
              <FormHelperText sx={{color: "#ec1c18"}}>{formError.floor.message}</FormHelperText>:
              <p/>

            }
          </FormControl>
        </Box>
        <Box sx={{ mt: 2, width: "100%", display: "flex", gap: 1 }} >
        <FormControl sx={{ width: "30%" }}>
            <TextField
              name="code"
              size="small"
              label="Codigo del aula"
              variant="outlined"
              inputProps={{ maxLength: 5 }}
              onChange={(e) =>
                handleForm(e, form, setForm, formError, setFormError)
              }
              value={form.code}
              error={formError.code.error}
              helperText={formError.code.error ? formError.code.message: "Ej. E002"}
            />

          </FormControl>

          <FormControl sx={{ width: "25%" }}>
            <TextField
              name="capacity"
              size="small"
              label="Capacidad"
              variant="outlined"
              inputProps={{ type: "number" }}
              onChange={(e) =>
                handleForm(e, form, setForm, formError, setFormError)
              }
              value={form.capacity}
            />
          </FormControl>
         
          </Box>
          <Box sx={{ mt: 0.5, width: "100%", display: "flex", gap: 1 }} >
          <FormControlLabel
            control={
              <Checkbox checked={form.isLab} onChange={() => setForm({ ...form, isLab: !form.isLab })} />
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
              onChange={(e) =>
                handleForm(e, form, setForm, formError, setFormError)
              }
              onKeyDown={(e) => {
                if (/^[0-9]+$/.test(e.key)) e.preventDefault();
              }}
            sx={{ flex: 2 }}

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
