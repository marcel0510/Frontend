import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { RenderComponent, validateForm, ErrorMap } from "../../helpers/classroom.helper";
import { useClassroom, useUpdateClassroom } from "../../hooks/Classroom.Hooks";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useBuildings } from "../../hooks/Building.Hooks";

export default function EditClassrooms() {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo")); //Informacion del usuario
  const [isEdit, setIsEdit, setIsSee] = useOutletContext(); //Informacion del padre
  const navigate = useNavigate(); //Navegador de la aplicacion
  const { id } = useParams(); //Informacion del URL
  const {
    data: classroom,
    isLoading: isLoadingClassroom,
    isError: isErrorClassroom,
  } = useClassroom(id);
  const {
    mutate: edit,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
  } = useUpdateClassroom();
  const {
    data: buildings,
    isLoading: isLoadingBuilding,
    isError: isErrorBuilding,
  } = useBuildings();
  const isLoading = isLoadingClassroom || isLoadingBuilding ;
  const isError = isErrorClassroom || isErrorBuilding ;
  const [form, setForm] = useState({
    id: id,
    code: "",
    isLab: false,
    name: "",
    capacity: 10,
    floor: "",
    buildingId: 0,
    updatedBy: UserInfo.user.id,
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
    if (!isLoadingClassroom){
      setForm({
        ...form,
        code: classroom.code,
        isLab: classroom.isLab,
        name: classroom.isLab ? classroom.name : "",
        capacity: classroom.capacity,
        floor: classroom.floor,
        buildingId: classroom.building.id,
      });
    }
    setIsSee(false);
    setIsEdit(true);
  }, [isLoadingClassroom, classroom ]);

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
      edit(
        { ...form },
        {
          onSuccess: (res) => {
            console.log(res);
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
  if (isLoading || isError || isLoadingUpdate || isErrorUpdate)
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
        {isError ? (
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
