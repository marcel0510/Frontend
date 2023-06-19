import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { RenderComponent, validateForm } from "../../helpers/calendars.helper"
import { useCalendar, useUpdateCalendar } from "../../hooks/Calendar.Hooks";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import dayjs from "dayjs";

export default function EditCalendars() {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo")); //Informacion del usuario
  const [isEdit, setIsEdit, _ , _1 , setIsSee] = useOutletContext(); //Informacion del padre8
  const navigate = useNavigate(); //Navegador de la aplicacion
  const { id } = useParams(); //Informacion del URL
  //Funcion para obtener el calendario
  const {
    data: calendar,
    isLoading: isLoadingCalendar,
    isError: isErrorCalendar,
  } = useCalendar(id);
  //Funcion para actualizar el edificio
  const {
    mutate: edit,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
  } = useUpdateCalendar();
  //Estado para controlar el formulario
  const [form, setForm] = useState({
    id: 0,
    periodInit: '',
    periodEnd: '',
    updatedBy: UserInfo.user.id,
  });
  //Estado que controla los errores del formulario
  const [formError, setFormError] = useState({
    period: {
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
  //Llenado automatico del formulario
  useEffect(() => {
    if (!isLoadingCalendar) {
      setForm({
        ...form,
        id: calendar.id,
        period: calendar.period,
        periodInit: dayjs(calendar.periodInit),
        periodEnd: dayjs(calendar.periodEnd),
      });
      setIsEdit(true);
      setIsSee(false);
    }
  }, [isLoadingCalendar, calendar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form, formError, setFormError)) {
      setFormError({
        ...formError,
        name: { error: false },
        code: { error: false },
      });
     
      edit(
        { ...form },
        {
          onSuccess: (res) => {
            if (res.data.isSuccess) {
              setSuccessMessage(true);
              setIsEdit(false);
            }
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
          isEdit
        )
      }
      {/* Pantalla de carga */}
      {isLoadingCalendar ||
      isLoadingUpdate ||
      isErrorCalendar ||
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
          {isErrorCalendar|| isErrorUpdate ? (
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
