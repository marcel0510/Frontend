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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
import { useDeleteCalendar } from "../../hooks/Calendar.Hooks";
import { useState } from "react";
import { ErrorMap } from "../../helpers/calendars.helper"

export default function CalendarCard({
  calendar,
  setSuccessMessage,
  setErrorMessage,
  setCalendar
}) {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const navigate = useNavigate();

  const { mutate: drop, isLoading, isError } = useDeleteCalendar();
  const [modal, setModal] = useState({
    isOpen: false,
    id: 0,
    deletedBy: UserInfo.user.id
  });

  const handleDelete = (id) => {
    drop(
      { ...modal },
      {
        onSuccess: (res) => {
          console.log(res);
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
          <Typography variant="h5" marginBottom={"3%"}>
            {"Calendario " + calendar.period}
            <CalendarMonthIcon sx={{ marginLeft: "5%" }} />
          </Typography>
          <Divider />
          <Typography marginTop={"2%"} variant="body1">
            {"Inicio del periodo: " + calendar.periodInit}
          </Typography>
          <Typography marginTop={"2%"} variant="body1">
            {"Fin del periodo: " + calendar.periodEnd}
          </Typography>
        </CardContent>
        <CardActions>
        <Button
            variant="outlined"
            onClick={() => setCalendar(calendar.id)}
          >
            Usar calendario
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => navigate(`/Main/Calendarios/Editar/${calendar.id}`)}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setModal({ ...modal, isOpen: true, id: calendar.id })}
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
          <Typography variant="h6" mb={1}>Eliminar calendario</Typography>
          <Divider />
          <Typography mt={1} mb={2}>¿Esta seguro de que desea eliminar este calendario? 
          <Typography color={"secondary"}> Todas los grupos relacionados con este calendario también se eliminarán</Typography>

          </Typography>
          <Button color="secondary" variant="outlined" sx={{ mr: 1.5 }} onClick={() => {handleDelete(modal.id)}}>Si, eliminar</Button>
          <Button  variant="outlined" onClick={() => setModal({ ...modal, isOpen: false })}>Cancelar</Button>
        </Box>
      </Modal>
      {isLoading || isError ? (
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
          <CircularProgress size={100} />
        </Backdrop>
      ) : (
        <p />
      )}
    </>
  );
}
