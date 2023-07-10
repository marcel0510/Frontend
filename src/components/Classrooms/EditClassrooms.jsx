import { Backdrop, CircularProgress, Typography } from "@mui/material";
import {
  RenderComponent,
  validateForm,
  ErrorMap,
} from "../../helpers/classroom.helper";
import { useClassroom, useUpdateClassroom } from "../../hooks/Classroom.Hooks";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useBuildings } from "../../hooks/Building.Hooks";
import { GetUser } from "../../session/session";

export default function EditClassrooms() {
  const { Id } = GetUser();
  const withoutErrors = {
    code: { error: false },
    name: { error: false },
    floor: { error: false },
    buildingId: { error: false },
  };
  const [isEdit, setIsEdit] = useOutletContext(); //Informacion del padre
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
  const [form, setForm] = useState({
    id: id,
    code: "",
    isLab: false,
    name: "",
    capacity: 10,
    floor: "",
    buildingId: 0,
    updatedBy: Id
  });
  const [formErrors, setFormErrors] = useState(withoutErrors);
  const [successMessage, setSuccessMessage] = useState(false);
  //Estado para controlar los errores generales
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });
  const isLoading = isLoadingClassroom || isLoadingBuilding;
  const isError = isErrorClassroom || isErrorBuilding;

  useEffect(() => {
    if (!isLoadingClassroom) {
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
    setIsEdit(true);
    return () => setIsEdit(false);
  }, [isLoadingClassroom, classroom]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form, setFormErrors)) {
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
          formErrors,
          setFormErrors,
          withoutErrors,
          successMessage,
          setSuccessMessage,
          errorMessage,
          setErrorMessage,
          buildings,
          isEdit
        )
      }
    </>
  );
}
