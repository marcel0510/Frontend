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
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers, useChangePassword } from "../../hooks/User.Hooks";
import { GetRandomPassword } from "../../helpers/user.helpers";
import {
  CustomInputLabel,
  CustomSelect,
  ErrorFormHelperText,
} from "../../Styles/Styled";

const randomPassword = GetRandomPassword();

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const isInitialMount = useRef(true);
  const { data, isLoading: isLoadUsers, isError: isErrorUsers } = useUsers();
  const {
    mutate: edit,
    isLoading: isLoadUpdate,
    isError: isErrorUpdate,
  } = useChangePassword();
  const isLoading = isLoadUsers || isLoadUpdate;
  const isError = isErrorUsers || isErrorUpdate;
  const [filter, setFilter] = useState("");
  const [formErrors, setFormErrors] = useState(false);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    userId: 0,
    newPassword: randomPassword,
    isRestore: true,
  });
  const [successMessage, setSuccessMessage] = useState(false);
  //Estado para controlar los errores generales
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    if (!isLoadUsers && isInitialMount.current) {
      setUsers(data);
      isInitialMount.current = false;
    }
    filterData();
  }, [isLoadUsers, data, filter]);

  const filterData = () => {
    if (filter !== "")
      setUsers(data.filter((u) => u.name.toLowerCase().includes(filter)));
    else if (!isLoadUsers) setUsers(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ValidateForm()) {
      edit(
        { ...form },
        {
          onSuccess: (res) => {
            if (res.data.isSuccess) setSuccessMessage(true);
            else {
              setErrorMessage({
                error: true,
                message: ErrorMap(res.data.errorType),
              });
            }
          },
          onError: (error) => {
            setErrorMessage({ error: true, message: error.message });
          },
        }
      );
    }
  };

  const ValidateForm = () => {
    if (form.userId === 0) {
      setFormErrors(true);
      return false;
    } else return true;
  };
  const handleSuccessMessage = () => {
    setSuccessMessage(false);
    navigate("/Main/Usuarios/Ver");
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
          justifyContent: "center",
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
            Reestablecer contraseña
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Typography variant="h6" mr={1.2} sx={{ fontWeight: 200 }}>
              Seleccione un usuario:
            </Typography>
            <FormControl size="small" sx={{ flex: 1 }}>
              <CustomInputLabel id="materia" error={formErrors}>
                Usuario
              </CustomInputLabel>
              <CustomSelect
                labelId="materia"
                value={form.userId}
                label="Usuario"
                name="userId"
                error={formErrors}
                onChange={(e) => {
                  setForm({
                    ...form,
                    userId: e.target.value,
                  });
                  setFormErrors(false);
                }}
              >
                <TextField
                  value={filter}
                  size="small"
                  sx={{ width: "100%" }}
                  variant="standard"
                  label="Filtrar..."
                  onKeyDown={(e) => e.stopPropagation()}
                  onChange={(e) => setFilter(e.target.value)}
                />
                <MenuItem value={0}>{" "}</MenuItem>
                {users.map((user, index) => {
                  return (
                    <MenuItem key={index} value={user.id}>
                      {user.name}
                    </MenuItem>
                  );
                })}
              </CustomSelect>
              {formErrors && (
                <ErrorFormHelperText>
                  Debe seleccionar un usuario
                </ErrorFormHelperText>
              )}
            </FormControl>
          </Box>

          <Box sx={{ flex: 2, display: "flex", alignItems: "center" }}>
            <Typography variant="h6" mr={1.2} sx={{ fontWeight: 200 }}>
              Nueva contraseña:
            </Typography>
            <TextField
              disabled
              size="small"
              variant="outlined"
              defaultValue={randomPassword}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "40%", mt: 2 }}
          >
            Reestablecer
          </Button>
        </Paper>
      </Box>
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
    </>
  );
}
