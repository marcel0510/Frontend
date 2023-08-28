import {
  Backdrop,
  CircularProgress,
  Typography,
  Alert,
  Box,
  Button,
  FormControl,
  Paper,
  Snackbar,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddUser } from "../hooks/User.Hooks";
import { alpha, email } from "../helpers/regularExpressions.helper";
import { ErrorMap, ValidateForm } from "../helpers/user.helpers";
// import {
//   CustomInputLabel,
//   CustomSelect,
//   ErrorFormHelperText,
// } from "../Styles/Styled";
import styled from "@emotion/styled";

import logo from "../assets/logo.png";
const Img = styled("img")({
  width: "13%",
});


export default function AddUsers() {
  const withoutErrors = {
    name: { error: false },
    email: { error: false },
    password: { error: false },
    repPassword: { error: false },
    //role: { error: false },
  };
  const navigate = useNavigate(); //Navegador de la aplicacion
  const { mutate: add, isLoading, isError } = useAddUser();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repPassword: "",
    role: 0,
    createdBy: 1,
  });

  const [formErrors, setFormErrors] = useState(withoutErrors);
  const [successMessage, setSuccessMessage] = useState(false);
  //Estado para controlar los errores generales
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ValidateForm(form, setFormErrors, false)) {
      add(
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
            setErrorMessage({ error: true, message: error.message });
          },
        }
      );
    }
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors(withoutErrors);
  };

  const handleSuccessMessage = () => {
    setSuccessMessage(false);
    navigate("/Ingresar");
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Img src={logo} />
        <Typography align="center" variant="h4">
          Registrarse
        </Typography>
        <Paper
          onSubmit={handleSubmit}
          component={"form"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "30%",
            padding: "2.5% 2%",
            gap: 2,
          }}
        >
          <FormControl fullWidth>
            <TextField
              size="small"
              label="Nombre"
              name="name"
              variant="outlined"
              inputProps={{
                maxLength: 50,
              }}
              onKeyDown={(e) => {
                if (!alpha.test(e.key)) e.preventDefault();
              }}
              onChange={(e) => handleForm(e)}
              error={formErrors.name.error}
              helperText={formErrors.name.message}
              value={form.name}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              size="small"
              label="Correo"
              name="email"
              variant="outlined"
              inputProps={{
                maxLength: 50,
              }}
              onKeyDown={(e) => {
                if (email.test(e.key)) e.preventDefault();
              }}
              onChange={(e) => handleForm(e)}
              error={formErrors.email.error}
              helperText={formErrors.email.message}
              value={form.email}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              size="small"
              label="Contraseña"
              name="password"
              variant="outlined"
              type="password"
              inputProps={{
                maxLength: 50,
              }}
              onChange={(e) => handleForm(e)}
              error={formErrors.password.error}
              helperText={formErrors.password.message}
              value={form.password}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              size="small"
              label="Confirme contraseña"
              name="repPassword"
              type="password"
              variant="outlined"
              inputProps={{
                maxLength: 50,
              }}
              onChange={(e) => handleForm(e)}
              error={formErrors.repPassword.error}
              helperText={formErrors.repPassword.message}
              value={form.repPassword}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "40%" }}
          >
            Registrarse
          </Button>
        </Paper>
      </Box>
      {/* Mensaje de exito */}
      <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={() => handleSuccessMessage(setSuccessMessage, navigate)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mr: "5.5%" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography>
           Usuario registrado correctamente!
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
      {isLoading || isError ? (
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
          {isError ? (
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
    </>
  );
}
