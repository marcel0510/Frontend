import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { RenderComponent, validateForm, ErrorMap } from "../../helpers/building.helper";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAddBuilding } from "../../hooks/Building.Hooks";
import { GetUser } from "../../session/session";

export default function AddBuildings() {
  const { Id } = GetUser
  const withoutErrors = {
    code: { error: false },
    name: { error: false },
    floors: { error: false },
  };
  const [isEdit] = useOutletContext(); //Informacion del padre
  const navigate = useNavigate(); //Navegador de la aplicacion
  const { mutate: add, isLoading, isError } = useAddBuilding(); //Funcion que agrega el edicio
  //Estado para controlar el formulario
  const [form, setForm] = useState({
    code: "",
    name: "",
    floors: [
      {
        code: ""
      }
    ],
    createdBy: Id,
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

  //Funcion que maneja el agregado del edificio
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
          isEdit,
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
