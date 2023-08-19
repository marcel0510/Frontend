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
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { alpha } from "../../helpers/regularExpressions.helper";
import {
  CustomInputLabel,
  CustomSelect,
  ErrorFormHelperText,
} from "../../Styles/Styled";
import { GetUser, UpdatedAccount } from "../../session/session";
import { ValidateForm, ErrorMap } from "../../helpers/user.helpers";
import { useUser, useUpdateUser } from "../../hooks/User.Hooks";

const roles = [
  "Ninguno",
  "Administrador",
  "Coordinador de Eléctrica",
  "Coordinador de Control",
  "Coordinador de Telecomunicaciones",
  "Coordinador de Tcnologías de la Información",
];

export default function EditUsers() {
  const { Id } = GetUser();
  const { id } = useParams();
  const withoutErrors = {
    name: { error: false },
    email: { error: false },
    role: { error: false },
  };
  const navigate = useNavigate(); //Navegador de la aplicacion
  const [, setIsEdit] = useOutletContext();
  const {
    data: user,
    isLoading: isLoadUser,
    isError: isLoadError,
  } = useUser(id);
  const {
    mutate: edit,
    isLoading: isLoadUpdate,
    isError: isErroUpdate,
  } = useUpdateUser();

  const [form, setForm] = useState({
    id: id,
    name: "",
    email: "",
    role: -1,
    updatedBy: Id,
  });

  const [formErrors, setFormErrors] = useState(withoutErrors);
  const [successMessage, setSuccessMessage] = useState(false);
  //Estado para controlar los errores generales
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });

  const isLoading = isLoadUser || isLoadUpdate;
  const isError = isErroUpdate || isLoadError;

  useEffect(() => {
    if (!isLoadUser) {
      setForm({
        ...form,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
    setIsEdit(true);
    return () => setIsEdit(false);
  }, [isLoadUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ValidateForm(form, setFormErrors, true)) {
      edit(
        { ...form },
        {
          onSuccess: (res) => {
            if (res.data.isSuccess) {
              setSuccessMessage(true);
              if (id == Id) UpdatedAccount(form);
            } else
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
    if (id == Id) location.reload();
    else navigate("/Main/Usuarios/Ver")
  };

  if (isLoading || isError || form.role == -1)
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
            Editar Usuario
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
              onChange={(e) => handleForm(e)}
              error={formErrors.email.error}
              helperText={formErrors.email.message}
              value={form.email}
            />
          </FormControl>

          <FormControl size="small" fullWidth>
            <CustomInputLabel id="role" error={formErrors.role.error}>
              Rol
            </CustomInputLabel>
            <CustomSelect
              labelId="role"
              value={form.role}
              label="Rol"
              name="role"
              onChange={(e) => handleForm(e)}
              error={formErrors.role.error}
            >
              {roles.map((role, index) => {
                return (
                  <MenuItem key={index} value={index}>
                    {role}
                  </MenuItem>
                );
              })}
            </CustomSelect>
            {formErrors.role.error && (
              <ErrorFormHelperText>
                {formErrors.role.message}
              </ErrorFormHelperText>
            )}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "40%" }}
          >
            Editar
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
          <Typography>Usuario editado correctamente!</Typography>
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
