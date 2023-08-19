import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import { useDeleteClassroom } from "../../hooks/Classroom.Hooks";
import { useState } from "react";
import { ErrorMap } from "../../helpers/subject.helper";
import { GetUser } from "../../session/session";

export default function ClassroomCard({
  classroom,
  setSuccessMessage,
  setErrorMessage,
  forInformation,
}) {
  const { Id } = GetUser();
  const navigate = useNavigate();
  const { mutate: drop, isLoading, isError } = useDeleteClassroom();
  const [modal, setModal] = useState({
    isOpen: false,
    id: 0,
    deletedBy: Id,
  });
  const handleDelete = () => {
    setModal({ ...modal, isOpen: false });
    drop(
      { ...modal },
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
          setErrorMessage({
            error: true,
            message: error.message,
          });
        },
      }
    );
  };
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" marginBottom={"3%"}>
            Aula: {classroom.code}
            <SchoolIcon sx={{ marginLeft: "5%" }} />
          </Typography>
          <Divider />
          <Typography variant="h6" marginTop={"2%"}>
            {classroom.isLab ? classroom.name : "No es laboratorio"}
          </Typography>
          <Typography variant="body1">
            Capacidad: {classroom.capacity}
          </Typography>
          <Typography variant="body1">{classroom.building.name}</Typography>
          <Typography variant="body1">Piso: {classroom.floor}</Typography>
          <Typography variant="body1">
            Codigo SAEw:{" "}
            {classroom.building.code +
              "/" +
              classroom.floor +
              "/" +
              classroom.code}
          </Typography>
        </CardContent>
        <CardActions
          sx={
            forInformation ? {} : { display: "flex", justifyContent: "center" }
          }
        >
          <Button
            variant="outlined"
            onClick={() =>
              forInformation
                ? navigate(`/Main/Aulas/Horario/${classroom.id}`)
                : navigate(`/Main/Grupos/Algoritmo/Horario/${classroom.id}`)
            }
          >
            {forInformation ? "Ver horario" : "Ver nuevo horario"}
          </Button>
          {forInformation && (
            <>
              <Button
                variant="outlined"
                color="warning"
                onClick={() => navigate(`/Main/Aulas/Editar/${classroom.id}`)}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() =>
                  setModal({ ...modal, isOpen: true, id: classroom.id })
                }
              >
                Eliminar
              </Button>
            </>
          )}
        </CardActions>
      </Card>
      <Modal open={modal.isOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={1}>
            Eliminar materia
          </Typography>
          <Divider />
          <Typography mt={1} mb={2}>
            ¿Esta seguro de que desea eliminar esta aula?
            <Typography color={"secondary"}>
              {" "}
              Todos los grupos relaciondas con esta aula también se
              eliminarán
            </Typography>
          </Typography>
          <Button
            color="secondary"
            variant="outlined"
            sx={{ mr: 1.5 }}
            onClick={handleDelete}
          >
            Si, eliminar
          </Button>
          <Button
            variant="outlined"
            onClick={() => setModal({ ...modal, isOpen: false })}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>
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
