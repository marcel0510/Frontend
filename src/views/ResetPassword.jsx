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
import logo from "../assets/logo.png";

import styled from "@emotion/styled";
import { useState } from "react";
import { useChangePassword } from "../hooks/User.Hooks";
import { useNavigate } from "react-router-dom";
import { GetUser, Restored } from "../session/session";

const Img = styled("img")({
  width: "13%",
});
export default function ResetPassword() {
  const { Id } = GetUser();
  const withoutErrors = {
    newPassword: { error: false },
    repNewPassword: { error: false },
  };
  const navigate = useNavigate();
  const { mutate: edit, isLoading, isError } = useChangePassword();
  const [form, setForm] = useState({
    userId: Id,
    newPassword: "",
    repNewPassword: "",
    isRestore: false,
  });
  const [formErrors, setFormErrors] = useState(withoutErrors);

  const [successMessage, setSuccessMessage] = useState(false);
  //Estado para controlar los errores generales
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (ValidateForm()) {
      edit(
        { ...form },
        {
          onSuccess: (res) => {
            if (res.data.isSuccess) {
              setSuccessMessage(true);
              Restored();
            } else
              setErrorMessage({
                error: true,
                message: ErrorMap(res.data.errorType),
              });
          },
        }
      );
    }
  };

  const ValidateForm = () => {
    const errors = { newPassword: {}, repNewPassword: {} };
    var validate = true;
    if (form.newPassword === "") {
      errors["newPassword"]["error"] = true;
      errors["newPassword"]["message"] = "No puede dejar este campo vacío";
      validate = false;
    }else if (form.newPassword.length <= 8) {
        errors["newPassword"]["error"] = true;
        errors["newPassword"]["message"] =
          "La contraseña debe tener más de 8 caracteres ";
        validate = false;
      }

    if (form.repNewPassword === "") {
      errors["repNewPassword"]["error"] = true;
      errors["repNewPassword"]["message"] = "No puede dejar este campo vacío";
      validate = false;
    }

    if (
      form.newPassword !== "" &&
      form.repNewPassword !== "" &&
      form.repNewPassword !== form.newPassword
    ) {
      errors["newPassword"]["error"] = true;
      errors["newPassword"]["message"] = "Las contraseñas deben coincidir";
      errors["repNewPassword"]["error"] = true;
      errors["repNewPassword"]["message"] = "Las contraseñas deben coincidir";
      validate = false;
    }

    if (validate) return true;
    else {
      setFormErrors(errors);
      return false;
    }
  };

  const handleSuccessMessage = () => {
    setSuccessMessage(false);
    navigate("/Main");
  }

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
      <Img src={logo} />
      <Typography align="center" variant="h4">
        Cambiar contraseña
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
            name="newPassword"
            label="Nueva contraseña"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setForm({ ...form, newPassword: e.target.value });
              setFormErrors(withoutErrors);
            }}
            error={formErrors.newPassword.error}
            helperText={formErrors.newPassword.message}
            value={form.newPassword}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            name="repNewPassword"
            label="Confirmar nueva contraseña"
            type="password"
            variant="outlined"
            onChange={(e) => {
              setForm({ ...form, repNewPassword: e.target.value });
              setFormErrors(withoutErrors);
            }}
            error={formErrors.repNewPassword.error}
            helperText={formErrors.repNewPassword.message}
            value={form.repNewPassword}
          />
        </FormControl>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "50%", mt: 2 }}
          >
            Cambiar contraseña
          </Button>
      </Paper>
         {/* Mensaje de exito */}
         <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={() => handleSuccessMessage()}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mr: "5.5%" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography>La contraseña ha sido cambiada!</Typography>
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
    </Box>
  );
}
