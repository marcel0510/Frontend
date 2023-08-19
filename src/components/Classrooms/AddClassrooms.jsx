import { Backdrop, CircularProgress, Typography } from "@mui/material";
import {
  RenderComponent,
  validateForm,
  ErrorMap,
} from "../../helpers/classroom.helper";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAddClassroom } from "../../hooks/Classroom.Hooks";
import { useBuildings } from "../../hooks/Building.Hooks";
import { GetUser } from "../../session/session";
export default function AddClassrooms() {
  const { Id } = GetUser();
  const withoutErrors = {
    code: { error: false },
    name: { error: false },
    floor: { error: false },
    buildingId: { error: false },
  };
  const [isEdit] = useOutletContext(); //Informacion del padre
  const navigate = useNavigate(); //Navegador de la aplicacion
  const {
    data: buildings,
    isLoading: isLoadBuilding,
    isError: isErrorBuilding,
  } = useBuildings();
  const { mutate: add, isLoading, isError } = useAddClassroom();
  const [form, setForm] = useState({
    code: "",
    isLab: false,
    name: "",
    capacity: 10,
    floor: "",
    buildingId: "",
    createdBy: Id,
  });
  const [formErrors, setFormErrors] = useState(withoutErrors);
  const [successMessage, setSuccessMessage] = useState(false);
  //Estado para controlar los errores generales
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(form, setFormErrors)) {
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

  if(isLoading || isError || isLoadBuilding || isErrorBuilding)
  return(
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
          formErrors,
          setFormErrors,
          withoutErrors,
          successMessage,
          setSuccessMessage,
          errorMessage,
          setErrorMessage,
          buildings,
          isEdit,
        )
      } 
    </>
  );
}
