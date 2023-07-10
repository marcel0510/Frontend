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
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import { GetUser } from "../../session/session";
import { useDeleteUser } from "../../hooks/User.Hooks";
import { RoleMap } from "../../helpers/user.helpers";
import { useState } from "react";
export default function UserCard({ user, setSuccessMessage, setErrorMessage }) {
  const { Id } = GetUser();
  const navigate = useNavigate();
  const { mutate: drop, isLoading, isError } = useDeleteUser();

  const [modal, setModal] = useState({
    isOpen: false,
    id: 0,
    deletedBy: Id
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
          <Typography variant="h5" marginBottom={"3%"} sx={{ display: "flex", alignItems: "center" }} align="center">
            {user.name}
            <PersonIcon fontSize="large" sx={{ marginLeft: "5%" }} />
          </Typography>
          <Divider />
          <Typography marginTop={"2%"} variant="h6" sx={{ fontWeight: 200 }}>
            {"Correo:  " + user.email}
          </Typography>
          <Typography marginTop={"2%"} variant="h6" sx={{ fontWeight: 200 }}>
            {RoleMap(user.role)}
          </Typography>
         
        </CardContent>
        <CardActions>

          <Button
            variant="outlined"
            color="warning"
            onClick={() => navigate(`/Main/Usuarios/Editar/${user.id}`)}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setModal({ ...modal, isOpen: true, id: user.id })}
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
            Eliminar usuario
          </Typography>
          <Divider />
          <Typography mt={1} mb={2}>
            ¿Esta seguro de que desea eliminar esta usuario?
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
