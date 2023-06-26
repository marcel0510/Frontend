import { Backdrop, CircularProgress, Typography } from "@mui/material";
import {
  RenderComponent,
  validateForm,
  ErrorMap,
} from "../../helpers/classroom.helper";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAddClassroom } from "../../hooks/Classroom.Hooks";
import { useBuildings } from "../../hooks/Building.Hooks";
export default function AddClassrooms() {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo")); //Informacion del usuario
  const [isEdit, setIsEdit, setIsSee] = useOutletContext(); //Informacion del padre
  const navigate = useNavigate(); //Navegador de la aplicacion
  const {
    data: buildings,
    isLoading: isLoadingBuilding,
    isError: isErrorBuilding,
  } = useBuildings();
  const { mutate: add, isLoading, isError } = useAddClassroom();
  const [form, setForm] = useState({
    code: "",
    isLab: false,
    name: "",
    capacity: 10,
    floor: "",
    buildingId: 0,
    createdBy: UserInfo.user.id,
  });
  const [formError, setFormError] = useState({
    code: {
      error: false,
      message: "",
    },
    floor: {
      error: false,
      message: "",
    },
    buildingId: {
      error: false,
      message: "",
    },
  });
  const [successMessage, setSuccessMessage] = useState(false);
  //Estado para controlar los errores generales
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    setIsSee(false);
    setIsEdit(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form, setForm, formError, setFormError)) {
      setFormError({
        ...formError,
        code: { error: false },
        capacity: { error: false },
        floor: { error: false },
        buildingId: { error: false },
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
  if(isLoading || isError || isLoadingBuilding || isErrorBuilding)
  return(<Backdrop
    open={true}
    sx={{
      color: "#fff",
      zIndex: (theme) => theme.zIndex.drawer + 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    {isError || isErrorBuilding ? (
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
          formError,
          setFormError,
          successMessage,
          setSuccessMessage,
          errorMessage,
          setErrorMessage,
          buildings,
          isEdit,
          setIsSee
        )
      }


    </>
  );
}
