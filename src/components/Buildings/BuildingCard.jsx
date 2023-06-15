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
import { Form, useNavigate } from "react-router-dom";
import { useDeleteBuilding } from "../../hooks/Building.Hooks";
import { useState } from "react";

export default function BuildingCard({ building, setSuccessMessage, setErrorMessage }) {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));

  const navigate = useNavigate();
  const { mutate: drop, isLoading, isError } = useDeleteBuilding();
  const [modal, setModal] = useState({
    isOpen: false,
    id: 0
  });
  

  const handleDelete = (id) => {
    setModal({ ...modal, isOpen: false })
    drop({ id: id, deletedBy: UserInfo.user.id }, {
      onSuccess: res => {
        console.log(res);
        if(res.data.isSuccess){
          setSuccessMessage(true)
        }
      },
      onError: error => {
        setErrorMessage({
          error: true,
          message: error.message
        })
      }
    })
  }

  return (
    <>
    
      <Card>
        <CardContent>
          <Typography variant="h4" marginBottom={"3%"}>
            {building.code}
            <ApartmentIcon sx={{ marginLeft: "5%" }} />
          </Typography>
          <Divider />
          <Typography marginTop={"2%"} variant="h6">{building.name}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            onClick={() => navigate(`/Main/Edificios/Editar/${building.id}`)}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setModal({ isOpen: true, id: building.id })}
          >
            Eliminar
          </Button>
        </CardActions>
      </Card>
      <Modal open={modal.isOpen} >
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
          <Typography variant="h6" mb={1}>Eliminar edificio</Typography>
          <Divider />
          <Typography mt={1} mb={2}>¿Esta seguro de que desea eliminar este edificio?  
          <Typography color={"secondary"}> Todas las aulas relaciondas con este edificio también se eliminarán</Typography>
          </Typography>
          <Button color="secondary" variant="outlined" sx={{ mr: 1.5 }} onClick={() => {handleDelete(modal.id)}}>Si, eliminar</Button>
          <Button  variant="outlined" onClick={() => setModal({ ...modal, isOpen: false })}>Cancelar</Button>
        </Box>
      </Modal>
      {isLoading || isError  ? (
        <Backdrop
          open={true}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          {isError ? (
            <Typography mb={"1.5%"} variant="h5" color="secondary">
              Error de conexión con el servidor!
            </Typography>
          ) : (
            <p></p>
          )}
          <CircularProgress  size={100} />
        </Backdrop>
      ) : (
        <p />
      )}
    </>
  );
}
