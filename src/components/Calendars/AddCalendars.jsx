import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { RenderComponent, validateForm, ErrorMap } from "../../helpers/calendars.helper";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAddCalendar } from "../../hooks/Calendar.Hooks";
import { GetToday } from "../../helpers/date.helper";
import dayjs from "dayjs";

export default function AddCalendars() {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo")); //Informacion del usuario
  const [isEdit, setIsEdit , _ , calendars, setIsSee] = useOutletContext(); //Informacion del padre
  const navigate = useNavigate(); //Navegador de la aplicacion
  const { mutate: add, isLoading, isError } = useAddCalendar(); //Funcion que agrega el edicio
  //Estado para controlar el formulario
  const [form, setForm] = useState({
    period: "",
    periodInit: dayjs(GetToday()),
    periodEnd: dayjs(GetToday(5)),
    needsCopy: false,
    calendarId: 0,
    createdBy: UserInfo.user.id,
  });
  //Estado que controla los errores del formulario
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
  //Estado para controlar el mensaje exito
  const [successMessage, setSuccessMessage] = useState(false);
  //Estado para controlar los errores generales
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    setIsSee(false);
    setIsEdit(false)
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form, formError, setFormError)) {
      setFormError({
        ...formError,
        period: { error: false },
      });
      setForm({
        ...form,
       
      });
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

  
  return (
    <>
      {
        //Renderizar formulario
        RenderComponent(
          navigate,
          handleSubmit,
          form,
          setForm,
          formError,
          setFormError,
          successMessage,
          setSuccessMessage,
          errorMessage,
          setErrorMessage,
          calendars,
          isEdit
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
