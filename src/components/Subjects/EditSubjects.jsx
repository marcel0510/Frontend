import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { RenderComponent, validateForm } from "../../helpers/subject.helper";
import { useSubject, useUpdateSubject } from "../../hooks/Subject.Hooks";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { GetUser } from "../../session/session";
export default function () {
  const { Id } = GetUser();

  const withoutErrors = {
    code: { error: false },
    name: { error: false },
    alias: { error: false },
    numCredits: { error: false },
    numHours: { error: false },
    numSemester: { error: false },
  };
  const [isEdit, setIsEdit] = useOutletContext(); //Informacion del padre8
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
    alias: "",
    numHours: "",
    numCredits: "",
    numSemester: "",
    isLab: false,
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

  const isLoading = isLoadingSubject || isLoadingUpdate;
  const isError = isErrorSubject || isErrorUpdate;

  useEffect(() => {
    if (!isLoadingSubject) {
      setForm({
        ...form,
        code: subject.code,
        name: subject.name,
        alias: subject.alias === null ? "" : subject.alias,
        numHours: subject.numHours,
        numCredits: subject.numCredits,
        numSemester: subject.numSemester,
        isLab: subject.isLab,
      });
      if (subject.alias !== null) {
        setAlias(true);
      }
    }
    setIsEdit(true);
    return () => setIsEdit(false);
  }, [isLoadingSubject, subject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form, setFormErrors, alias)) {
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
  if (isLoading || isError || form.code == "")
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
        {isErrorSubject || isErrorUpdate ? (
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
          alias,
          setAlias,
          isEdit
        )
      }
    </>
  );
}
