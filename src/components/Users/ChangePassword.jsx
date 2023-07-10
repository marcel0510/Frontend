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
import { useChangePassword } from "../../hooks/User.Hooks";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../../session/session";
import { ErrorMap } from "../../helpers/user.helpers";

export default function ChangePassword() {
  const { Id } = GetUser();
  const withoutErrors = {
    newPassword: { error: false },
    oldPassword: { error: false },
  };
  const navigate = useNavigate();
  const { mutate: edit, isLoading, isError } = useChangePassword();
  const [form, setForm] = useState({
    userId: Id,
    newPassword: "",
    oldPassword: "",
    isRestore: false,
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
    if (ValidateForm()) {
      edit(
        { ...form },
        {
          onSuccess: (res) => {
            if (res.data.isSuccess) {
              setSuccessMessage(true);
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
    const errors = { newPassword: {}, oldPassword: {} };
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

    if (form.oldPassword === "") {
      errors["oldPassword"]["error"] = true;
      errors["oldPassword"]["message"] = "No puede dejar este campo vacío";
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
    localStorage.removeItem("user");
    location.reload();
  };

  if (isLoading || isError)
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
        {isError ? (
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Paper
          component={"form"}
          sx={{
            mt: 3,
            p: "1% 3%",
            width: "50%",
          }}
        >
          <Typography variant="h4" align="center">
            Cambiar contraseña
          </Typography>
        </Paper>

        <Paper
          onSubmit={handleSubmit}
          component={"form"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
            padding: "2.5% 2%",
            gap: 2,
          }}
        >
          <FormControl size="small" fullWidth>
            <TextField
              name="oldPassword"
              label="Contraseña actual"
              type="password"
              variant="outlined"
              onChange={(e) => {
                setForm({ ...form, oldPassword: e.target.value });
                setFormErrors(withoutErrors);
              }}
              error={formErrors.oldPassword.error}
              helperText={formErrors.oldPassword.message}
              value={form.oldPassword}
            />
          </FormControl>

          <FormControl size="small" fullWidth>
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "50%", mt: 2 }}
          >
            Cambiar contraseña
          </Button>
        </Paper>
      </Box>
      {/* Mensaje de exito */}
      <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={() => handleSuccessMessage(setSuccessMessage, navigate)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mr: "2.5%", mt: 9.5 }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography>La contraseña se ha actualizado</Typography>
        </Alert>
      </Snackbar>
      {/* Mensaje de error */}
      <Snackbar
        open={errorMessage.error}
        autoHideDuration={2000}
        onClose={() => setErrorMessage({ ...errorMessage, error: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mr: "2.5%", mt: 9.5 }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          <Typography>{errorMessage.message}</Typography>
        </Alert>
      </Snackbar>
    </>
  );
}
