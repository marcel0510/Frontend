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
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useNavigate } from "react-router-dom";
import { useDeleteBuilding } from "../../hooks/Building.Hooks";
import { useState } from "react";
import { ErrorMap } from "../../helpers/building.helper"
import { GetUser } from "../../session/session";

export default function BuildingCard({
  building,
  setSuccessMessage,
  setErrorMessage,
}) {
  const { Id } = GetUser();
  const navigate = useNavigate();
  const {
    mutate: deleteBuilding,
    isLoading,
    isError
  } = useDeleteBuilding();

  const [modal, setModal] = useState({
    isOpen: false,
    id: 0,
    deletedBy: Id
  });

  const handleDelete = () => {
    setModal({ ...modal, isOpen: false });
    deleteBuilding(
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
            {building.code}
            <ApartmentIcon sx={{ marginLeft: "5%" }} />
          </Typography>
          <Divider />
          <Typography marginTop={"2%"} variant="h6">
            {building.name}
          </Typography>
        </CardContent>
        <CardActions>
        <Button
            variant="outlined"
            onClick={() => navigate(`/Main/Aulas/Ver/Filtro/${building.code}`)}

          >
            Ver Aulas
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => navigate(`/Main/Edificios/Editar/${building.id}`)}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setModal({ ...modal, isOpen: true, id: building.id })}
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
