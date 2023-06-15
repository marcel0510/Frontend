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
import { ErrorMap } from "../../helpers/calendars.helper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddCalendar } from "../../hooks/Calendar.Hooks";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { GetDate, GetToday } from "../../helpers/date.helper";

export default function AddCalendars() {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const navigate = useNavigate();
  const { mutate: add, isLoading: isLoadingAdd, isError } = useAddCalendar();
  const [form, setForm] = useState({
    period: "",
    periodInit: dayjs(GetToday()),
    periodEnd: dayjs(GetToday(5)),
    createdBy: 0,
  });
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });
  const [formError, setFormError] = useState({
    period: {
      error: false,
      message: "",
    },
    periodInit: {
      error: false,
      message: "",
    },
    periodEnd: {
      error: false,
      message: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        setFormError({
          ...formError,
          period: { error: false },
        });
        setForm({
          ...form,
          createdBy: UserInfo.user.id,
        });
        add(
          { ...form },
          {
            onSuccess: (res) => {
                console.log(res)
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
    setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
    setFormError({
      ...formError,
      name: { error: false },
      code: { error: false },
    });
  };

  const handleSuccessMessage = () => {
    setSuccessMessage(false);
    navigate("/Main/Calendarios/Ver");
  };

  const validateForm = () => {
    if (form.period === "") {
      setFormError({
        period: { error: true, message: "No puede dejar este campo vacío" },
      });
      return false;
    }

    if (form.periodInit === form.periodEnd) {
      setFormError({
        ...formError,
        periodEnd: { error: true, message: "Las fechas no pueden coincidir" },
      });
      return false;
    }
    
    return true;
  };

  return (
    <>
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
            {"Agregar un calendario"}
          </Typography>
        </Paper>

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
              label="Nombre del periodo"
              name="period"
              variant="outlined"
              inputProps={{
                maxLength: 5,
                style: { textTransform: "uppercase" },
              }}
              onChange={(e) => handleForm(e)}
              error={formError.period.error}
              helperText={
                formError.period.error ? formError.period.message : "Ej. 2030A"
              }
              value={form.period}
            />
          </FormControl>
          <DatePicker
            label={"Inicio del periodo"}
            name={"periodInit"}
            value={form.periodInit}
            onChange={(value) =>  setForm({ ...form, periodInit: GetDate(value) })}
            format="DD-MM-YYYY"
            sx={{ mt: 1.5, width: "50%" }}
            disablePast
          />
          <DatePicker
            label={"Fin del periodo"}
            name={"periodEnd"}
            value={form.periodEnd}
            format="DD-MM-YYYY"
            onChange={(value) => setForm({ ...form, periodEnd: GetDate(value) })}
            sx={{ mt: 2.5, width: "50%" }}
            disablePast
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "35%", mt: 2 }}
          >
            {"Agregar"}
          </Button>
        </Paper>

        {isLoadingAdd || isError ? (
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

      <Snackbar
        open={formError.periodEnd.error}
        autoHideDuration={2000}
        onClose={() => setFormError({ ...formError, periodEnd: {error: false} })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="warning" sx={{ width: "100%" }}>
          <Typography>{formError.periodEnd.message}</Typography>
        </Alert>
      </Snackbar>

      <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={handleSuccessMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "3%" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography>{"El calendario se agregó correctamente!"}</Typography>
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
    </>
  );
}
