import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { RenderComponent, validateForm } from "../../helpers/calendars.helper";
import { useCalendar, useUpdateCalendar } from "../../hooks/Calendar.Hooks";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { GetToday } from "../../helpers/date.helper";
import { GetUser } from "../../session/session";

export default function EditCalendars() {
  const { Id } = GetUser();

  const withoutErrors = {
    period: { error: false },
    periodInit: { error: false },
    periodEnd: { error: false },
  };
  const [calendars, , isEdit, setIsEdit] = useOutletContext(); //Informacion del padre8
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
  const [periodInit, setPeriodInit] = useState(dayjs(GetToday()));
  const [periodEnd, setPeriodEnd] = useState(dayjs(GetToday(5)));
  //Estado para controlar el formulario
  const [form, setForm] = useState({
    id: id,
    period: "",
    periodInit: "",
    periodEnd: "",
    updatedBy: Id,
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
  //Llenado automatico del formulario
  useEffect(() => {
    if (!isLoadingCalendar) {
      setForm({
        ...form,
        period: calendar.period,
        periodInit: calendar.periodInit,
        periodEnd: calendar.periodEnd,
      });
      setPeriodInit(dayjs(calendar.periodInit));
      setPeriodEnd(dayjs(calendar.periodEnd));
    }
    setIsEdit(true);
    return () => setIsEdit(false);
  }, [isLoadingCalendar, calendar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form, setFormErrors)) {
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
          {isErrorCalendar || isErrorUpdate ? (
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
