import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMap } from "../../helpers/building.helper";
import { useBuilding, useUpdateBuilding } from "../../hooks/Building.Hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBuilding() {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: building,
    isLoading: isLoadingBuilding,
    isError: isErrorBuilding,
  } = useBuilding(id);
  const {
    mutate: edit,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
  } = useUpdateBuilding();
  const [form, setForm] = useState({
    id: "",
    code: "",
    name: "",
    updatedBy: 0,
  });
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });
  const [formError, setFormError] = useState({
    code: {
      error: false,
      message: "",
    },
    name: {
      error: false,
      message: "",
    },
  });
  useEffect(() => {
    if (!isLoadingBuilding) {
      setForm({
        ...form,
        id: building.id,
        code: building.code,
        name: building.name,
      });
    }
  }, [isLoadingBuilding, building]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormError({
        ...formError,
        name: { error: false },
        code: { error: false },
      });
      setForm({
        ...form,
        updatedBy: UserInfo.user.id,
      });
      edit(
        { ...form },
        {
          onSuccess: (res) => {
            if (res.data.isSuccess) setSuccessMessage(true);
            else
              setErrorMessage({
                error: true,
                message: ErrorMap(res.data.errorType),
              });
          },
          onError: (error) => {
            console.log(error);
            setErrorMessage({ error: true, message: error.message });
          },
        }
      );
    }
  };

  const handleForm = (e) => {
    if (e.target.name === "code")
      setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
    else setForm({ ...form, [e.target.name]: e.target.value });
    setFormError({
      ...formError,
      name: { error: false },
      code: { error: false },
    });
  };

  const handleSuccessMessage = () => {
    setSuccessMessage(false);
    navigate("/Main/Edificios/Ver");
  };

  const validateForm = () => {
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
    }
    return true;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "5%",
      }}
    >
      <Paper sx={{ width: "47%", padding: "1% 0" }}>
        <Typography variant="h4" align="center">
          {"Editar un edificio"}
        </Typography>
      </Paper>

      <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={handleSuccessMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "3%" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography>{"El edificio de actualizó correctamente!"}</Typography>
        </Alert>
      </Snackbar>
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
        <FormControl sx={{ width: "50%" }}>
          <TextField
            size="small"
            label="Codigo"
            name="code"
            variant="outlined"
            inputProps={{ maxLength: 3, style: { textTransform: "uppercase" } }}
            onChange={(e) => handleForm(e)}
            error={formError.code.error}
            helperText={formError.code.message}
            value={form.code}
          />
        </FormControl>
        <FormControl sx={{ width: "50%", mt: 3 }}>
          <TextField
            name="name"
            size="small"
            label="Nombre del Edificio"
            variant="outlined"
            onChange={(e) => handleForm(e)}
            onKeyDown={(e) => {if(/^[0-9]+$/.test(e.key)) e.preventDefault()}}

            error={formError.name.error}
            helperText={formError.name.message}
            value={form.name}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "35%", mt: 2 }}
        >
          {"Editar"}
        </Button>
      </Paper>

      {isLoadingBuilding ||
      isLoadingUpdate ||
      isErrorBuilding ||
      isErrorUpdate ? (
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
          {isErrorBuilding || isErrorUpdate ? (
            <Typography mb={"1.5%"} variant="h5" color="secondary">
              Error de conexión con el servidor!
            </Typography>
          ) : (
            <p></p>
          )}
          <CircularProgress size={100} />
        </Backdrop>
      ) : (
        <p />
      )}
    </Box>
  );
}
