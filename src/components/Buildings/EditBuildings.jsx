import {
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material";
import { RenderComponent, validateForm } from "../../helpers/building.helper";
import { useBuilding, useUpdateBuilding } from "../../hooks/Building.Hooks";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

export default function EditBuilding() {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo")); //Informacion del usuario
  const [isEdit, setIsEdit, setIsSee] = useOutletContext(); //Informacion del padre8
  const navigate = useNavigate(); //Navegador de la aplicacion
  const { id } = useParams(); //Informacion del URL
  //Funcion para obtener el edificio
  const {
    data: building,
    isLoading: isLoadingBuilding,
    isError: isErrorBuilding,
  } = useBuilding(id);
  //Funcion para actualizar el edificio
  const {
    mutate: edit,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
  } = useUpdateBuilding();
  //Estado para controlar el formulario
  const [form, setForm] = useState({
    id: id,
    code: "",
    name: "",
    floors: [
      {
        code: ""
      }
    ],
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
    floors: {
      error: false,
      message: "",
    }
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
    if (!isLoadingBuilding) {
      setForm({
        ...form,
        code: building.code,
        name: building.name,
        floors: building.floors

      });
      setIsEdit(true);
      setIsSee(false);
    }
  }, [isLoadingBuilding, building]);
  //Funcion que maneja la edicion del edificio
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form, formError, setFormError)) {
      setFormError({
        ...formError,
        name: { error: false },
        code: { error: false },
        floors: { error: false },
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
          isEdit,
          setIsSee
        )
      }
      {/* Pantalla de carga */}
      {isLoadingBuilding ||
      isLoadingUpdate ||
      isErrorBuilding ||
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
          {isErrorBuilding || isErrorUpdate ? (
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
