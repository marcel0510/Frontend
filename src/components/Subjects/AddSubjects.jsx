import { Backdrop, CircularProgress, Typography } from "@mui/material";
import {
  RenderComponent,
  validateForm,
  ErrorMap,
} from "../../helpers/subject.helper";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAddSubject } from "../../hooks/Subject.Hooks";
export default function AddSubject() {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo")); //Informacion del usuario
  const [isEdit, setIsEdit, setIsSee] = useOutletContext(); //Informacion del padre
  const navigate = useNavigate(); //Navegador de la aplicacion
  const { mutate: add, isLoading, isError } = useAddSubject(); //Funcion que agrega el edicio
  const [ alias, setAlias ] = useState(false);
  //Estado para controlar el formulario
  const [form, setForm] = useState({
    code: "",
    name: "",
    alias: null,
    numHours: 1,
    numCredits: 1,
    numSemester: 1,
    isLab: false,
    createdBy: UserInfo.user.id,
  });
  //Estado que controla los errores del formulario
  const [formError, setFormError] = useState({
    code: {
      error: false,
      message: "",
    },
    name: {
      error: false,
      message: "",
    },
    alias: {
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

  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form, formError, setFormError)) {
      setFormError({
        ...formError,
        name: { error: false },
        code: { error: false },
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
          alias,
          setAlias,
          isEdit,
          setIsSee
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
