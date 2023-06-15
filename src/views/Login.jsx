import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Modal,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../assets/logo.png";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useValidateUser } from "../hooks/User.Hooks";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
  width: "13%",
});

export default function Login() {
  const navigate = useNavigate();
  const { mutate: validate, isLoading, isError } = useValidateUser();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorEmail, setErrorEmail] = useState({
    error: false,
    message: "",
  });

  const [errorPassword, setErrorPassword] = useState({
    error: false,
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("UserInfo")) {
      navigate("/Main");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const bool1 = validateEmail(form.email);
    const bool2 = validatePassword(form.password);
    if (bool1 && bool2) {
      validate(form, {
        onSuccess: (res) => {
          const data = res.data;
          setErrorEmail({
            error: false,
          });
          setErrorPassword({
            error: false,
          });
          if (data.isSuccess) {
            localStorage.setItem("UserInfo", JSON.stringify(data));
            setSuccessMessage(true);
          } else {
            setErrorMessage(true);
          }
        },
      });
    }
  };

  const validateEmail = (email) => {
    const exp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (email === "") {
      setErrorEmail({
        error: true,
        message: "No puede dejar este campo vacio",
      });
      return false;
    } else if (!exp.test(email)) {
      setErrorEmail({
        error: true,
        message: "Debe ingresar una dirección de correo válida",
      });
      return false;
    }

    return true;
  };

  const validatePassword = (password) => {
    if (password === "") {
      setErrorPassword({
        error: true,
        message: "No puede dejar este campo vacio",
      });
      return false;
    } else if (password.length < 8) {
      setErrorPassword({
        error: true,
        message: "La contraseña debe tener 8 o más caracteres",
      });
      return false;
    }
    return true;
  };

  const handleSuccessMessage = () => {
    setSuccessMessage(false);
    navigate("/Main");
  };

  const handleErrorMessage = () => {
    setErrorMessage(false);
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={handleSuccessMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography>Usuario iniciado correctamente!</Typography>
        </Alert>
      </Snackbar>
      <Img src={logo} />
      <Snackbar
        open={errorMessage}
        autoHideDuration={1500}
        onClose={handleErrorMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          <Typography>El correo o la contraseña no son correctos!</Typography>
        </Alert>
      </Snackbar>
      <Typography align="center" variant="h4">
        Inicio de Sesión
      </Typography>
      <Paper
        component={"form"}
        onSubmit={submitHandler}
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
            id="email"
            label="Correo electrónico"
            variant="outlined"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errorEmail.error}
            helperText={errorEmail.message}
            value={form.email}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="password"
            label="Contraseña"
            variant="outlined"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errorPassword.error}
            helperText={errorPassword.message}
            value={form.password}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "40%" }}
        >
          Ingresar
        </Button>
      </Paper>

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
    </Box>
  );
}
