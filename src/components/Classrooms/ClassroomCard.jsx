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
import { useDeleteSubject } from "../../hooks/Subject.Hooks";
import { useState } from "react";
import { ErrorMap } from "../../helpers/subject.helper";

export default function ClassroomCard({
  classroom,
  setSuccessMessage,
  setErrorMessage,
}) {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const navigate = useNavigate();
  const { mutate: drop, isLoading, isError } = useDeleteSubject();
  const [modal, setModal] = useState({
    isOpen: false,
    id: 0,
    deletedBy: UserInfo.user.id,
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
        <CardActions>
          <Button
            variant="outlined"
            onClick={() => navigate(`/Main/Aulas/Horario/${classroom.id}`)}
          >
            Ver horario
          </Button>
          <Button variant="outlined" color="warning">
            Editar
          </Button>
          <Button variant="outlined" color="secondary">
            Eliminar
          </Button>
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
            ¿Esta seguro de que desea eliminar esta materia?
            <Typography color={"secondary"}>
              {" "}
              Todos los grupos relaciondas con esta materia también se
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
