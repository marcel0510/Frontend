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
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useNavigate } from "react-router-dom";
import { useDeleteGroup } from "../../hooks/Group.Hooks";
import { useState } from "react";
import { ErrorMap } from "../../helpers/group.helper";

export default function GroupCard({
  group,
  setSuccessMessage,
  setErrorMessage,
}) {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const navigate = useNavigate();
  const { mutate: deleteGroup, isLoading, isError } = useDeleteGroup();
  const [modal, setModal] = useState({
    isOpen: false,
    id: 0,
    deletedBy: UserInfo.user.id
  });

  const handleDelete = () => {
    setModal({ ...modal, isOpen: false });
    deleteGroup(
      { ...modal },
      {
        onSuccess: (res) => {
          if (res.data.isSuccess) setSuccessMessage(true);
          else setErrorMessage({
            error: true,
            message: ErrorMap(res.data.errorType),
          })
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
          <Typography variant="h4" marginBottom={"3%"}>
            {group.name + " - " + group.subject.code}
            <LibraryBooksIcon sx={{ marginLeft: "5%" }} />
          </Typography>
          <Divider />
          <Typography marginTop={"2%"} sx={{ fontWeight: 600 }}>
            {group.subject.name}
          </Typography>
          <Typography marginTop={"2%"} >
            Aula: {group.classroom.building + "/" + group.classroom.floor + "/" + group.classroom.code}
          </Typography>
          <Typography marginTop={"2%"} >
            Calendario: {group.calendar.period}
          </Typography>
        </CardContent>
        <CardActions>
        <Button
            variant="outlined"
            onClick={() => navigate(`/Main/Grupos/Horario/${group.id}`)}
          >
            Ver horario
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => navigate(`/Main/Grupos/Editar/${group.id}`)}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setModal({ ...modal, isOpen: true, id: group.id })}
          >
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
            Eliminar edificio
          </Typography>
          <Divider />
          <Typography mt={1} mb={2}>
            ¿Esta seguro de que desea eliminar este edificio?
            <Typography color={"secondary"}>
              {" "}
              Todas las aulas relaciondas con este edificio también se
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

