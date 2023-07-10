import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { RenderComponent, validateForm, ErrorMap } from "../../helpers/calendars.helper";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAddCalendar } from "../../hooks/Calendar.Hooks";
import { GetToday } from "../../helpers/date.helper";
import { GetUser } from "../../session/session";
import dayjs from "dayjs";

export default function AddCalendars() {
  const { Id } = GetUser();
  const withoutErrors = {
    period: { error: false },
    periodInit: { error: false },
    periodEnd: { error: false },
  };
  const [calendars, , isEdit] = useOutletContext(); //Informacion del padre
  const navigate = useNavigate(); //Navegador de la aplicacion
  const { mutate: add, isLoading, isError } = useAddCalendar(); //Funcion que agrega el edicio
  const [ periodInit, setPeriodInit ] = useState(dayjs(GetToday()));
  const [ periodEnd, setPeriodEnd ] = useState(dayjs(GetToday(5)));
  //Estado para controlar el formulario
  const [form, setForm] = useState({
    period: "",
    periodInit: GetToday(),
    periodEnd: GetToday(5),
    needsCopy: false,
    calendarId: 0,
    createdBy: Id,
  });
  //Estado que controla los errores del formulario
  const [formErrors, setFormErrors] = useState(withoutErrors);
  //Estado para controlar el mensaje exito
  const [successMessage, setSuccessMessage] = useState(false);
  //Estado para controlar los errores generales
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form, setFormErrors)) {
      add(
        { ...form },
        {
          onSuccess: (res) => {
            if (res.data.isSuccess) {
              setSuccessMessage(true);
              console.log(res.data)
            }
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

  
  return (
    <>
      {
        //Renderizar formulario
        RenderComponent(
          navigate,
          handleSubmit,
          form,
          setForm,
          formErrors,
          setFormErrors,
          withoutErrors,
          successMessage,
          setSuccessMessage,
          errorMessage,
          setErrorMessage,
          calendars,
          periodInit,
          setPeriodInit,
          periodEnd,
          setPeriodEnd,
          isEdit,
        )
      }
      {/* Pantalla de carga */}
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
