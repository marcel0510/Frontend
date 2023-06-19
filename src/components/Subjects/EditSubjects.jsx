import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { RenderComponent, validateForm } from "../../helpers/subject.helper";
import { useSubject, useUpdateSubject } from "../../hooks/Subject.Hooks";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
export default function () {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo")); //Informacion del usuario
  const [isEdit, setIsEdit, setIsSee] = useOutletContext(); //Informacion del padre8
  const navigate = useNavigate(); //Navegador de la aplicacion
  const { id } = useParams(); //Informacion del URL
  const [alias, setAlias] = useState(false);
  const {
    data: subject,
    isLoading: isLoadingSubject,
    isError: isErrorSubject,
  } = useSubject(id);
  const {
    mutate: edit,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
  } = useUpdateSubject();

  const [form, setForm] = useState({
    id: id,
    code: "",
    name: "",
    alias: null,
    numHours: 1,
    numCredits: 1,
    numSemester: 1,
    isLab: false,
    aliasBool: false,
    updatedBy: UserInfo.user.id,
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
    if (!isLoadingSubject) {
      setForm({
        ...form,
        code: subject.code,
        name: subject.name,
        alias: subject.alias,
        numHours: subject.numHours,
        numCredits: subject.numCredits,
        numSemester: subject.numSemester,
        isLab: subject.isLab,
      });
      if(subject.alias !== null){
        setAlias(true);
      }
    }
    setIsEdit(true);
    setIsSee(false);
  }, [isLoadingSubject, subject]);

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
      {isLoadingSubject ||
      isLoadingUpdate ||
      isErrorSubject ||
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
          {isErrorSubject || isErrorUpdate ? (
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
