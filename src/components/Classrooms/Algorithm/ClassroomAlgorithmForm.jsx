import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import {
  CustomSelect,
  CustomInputLabel,
  ErrorFormHelperText,
} from "../../../Styles/Styled";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useBuildings } from "../../../hooks/Building.Hooks";
import { useEffect, useRef, useState } from "react";

const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

export default function ClassroomAlgorithmForm() {
  const navigate = useNavigate();
  const [calendar, setIsForm] = useOutletContext();
  const withoutErrors = {
    day: { error: false },
    building: { error: false },
    floor: { error: false },
    morning: { error: false },
  };
  const {
    data: buildings,
    isLoading: loadBuildings,
    isError: errorBuildings,
  } = useBuildings();
  const isInitialMount = useRef(true);
  const [form, setForm] = useState({
    day: "",
    building: "",
    buildingName: "",
    floor: "",
    morning: "",
    calendar: "",
  });
  const [formErrors, setFormErrors] = useState(withoutErrors);

  useEffect(() => {
    if (!loadBuildings && calendar && isInitialMount.current) {
      setForm({ ...form, calendar: calendar });
      if (localStorage.getItem("parameters"))
        setForm(JSON.parse(localStorage.getItem("parameters")));
      isInitialMount.current = false;
    }
    setIsForm(true);
    return () => setIsForm(false);
  }, [loadBuildings, calendar]);

  const validateForm = () => {
    const errors = {
      day: {},
      building: {},
      floor: {},
      morning: {},
    };
    var validate = true;

    if (form.day === "") {
      errors["day"]["error"] = true;
      errors["day"]["message"] = "Debe seleccionar un día";
      validate = false;
    }

    if (form.building === "") {
      errors["building"]["error"] = true;
      errors["building"]["message"] = "Debe seleccionar un edificio";
      validate = false;
    }

    if (form.floor === "") {
      errors["floor"]["error"] = true;
      errors["floor"]["message"] = "Debe seleccionar un piso";
      validate = false;
    }
    if (form.morning === "") {
      errors["morning"]["error"] = true;
      errors["morning"]["message"] = "Debe seleccionar un periodo";
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
      navigate("/Main/Aulas/Algoritmo/Resultados");
      localStorage.setItem("parameters", JSON.stringify(form));
    }
  };

  if (loadBuildings || errorBuildings)
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
        {errorBuildings ? (
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
          width: "60%",
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
            alignItems: "center",
            gap: 2.5,
            mb: 3,
            pb: 4,
          }}
        >
          <legend>
            <Typography variant="h6" sx={{ mr: 1, ml: 0.5, fontWeight: 400 }}>
              Disponibilidad
            </Typography>
          </legend>
          <Box sx={{ width: "75%", display: "flex", gap: 2 }}>
            {/* Seleccion dle edificio */}
            <FormControl size="small" sx={{ flex: 2 }}>
              <CustomInputLabel id="edificio" error={formErrors.building.error}>
                Edificio
              </CustomInputLabel>
              <CustomSelect
                labelId="edificio"
                value={form.building}
                label="Edificio"
                name="building"
                error={formErrors.building.error}
                onChange={(e) => {
                  const auxBuild = buildings.find(
                    (b) => b.code == e.target.value
                  );
                  setForm({
                    ...form,
                    building: e.target.value,
                    buildingName: auxBuild.name,
                  });
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
              {formErrors.building.error && (
                <ErrorFormHelperText>
                  {formErrors.building.message}
                </ErrorFormHelperText>
              )}
            </FormControl>

            {/* Seleccion del piso */}
            <FormControl size="small" sx={{ flex: 1 }}>
              <CustomInputLabel id="Piso" error={formErrors.floor.error}>
                Piso
              </CustomInputLabel>
              <CustomSelect
                labelId="piso"
                value={form.floor}
                label="Piso"
                name="floor"
                error={formErrors.floor.error}
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
              {formErrors.floor.error && (
                <ErrorFormHelperText>
                  {formErrors.floor.message}
                </ErrorFormHelperText>
              )}
            </FormControl>
          </Box>
          {/* Segunda fila */}
          <Box sx={{ display: "flex", gap: 2, width: "75%" }}>
            {/* Seleccion del dia */}
            <FormControl size="small" sx={{ flex: 3 }}>
              <CustomInputLabel id="materia" error={formErrors.day.error}>
                Día
              </CustomInputLabel>
              <CustomSelect
                labelId="day"
                value={form.day}
                label="Día"
                name="day"
                error={formErrors.day.error}
                onChange={(e) => {
                  setForm({ ...form, day: e.target.value });
                  setFormErrors(withoutErrors);
                }}
              >
                <MenuItem value={""}></MenuItem>
                {days.map((day, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {day}
                    </MenuItem>
                  );
                })}
              </CustomSelect>
              {formErrors.day.error && (
                <ErrorFormHelperText>
                  {formErrors.day.message}
                </ErrorFormHelperText>
              )}
            </FormControl>

            {/* Seleccion del Periodo */}
            <FormControl size="small" sx={{ flex: 3 }}>
              <CustomInputLabel id="materia" error={formErrors.morning.error}>
                Periodo
              </CustomInputLabel>
              <CustomSelect
                labelId="morning"
                value={form.morning}
                label="Periodo"
                name="morning"
                error={formErrors.morning.error}
                onChange={(e) => {
                  setForm({ ...form, morning: e.target.value });
                  setFormErrors(withoutErrors);
                }}
              >
                <MenuItem value={""}></MenuItem>
                <MenuItem value={true}>En la mañana</MenuItem>
                <MenuItem value={false}>En la tarde</MenuItem>
              </CustomSelect>
              {formErrors.morning.error && (
                <ErrorFormHelperText>
                  {formErrors.morning.message}
                </ErrorFormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>

        {/* Boton de submit */}
        <Button type="submit" sx={{ width: "30%" }} variant="contained">
          Ver disponibilidad
        </Button>
      </Paper>
    </>
  );
}
