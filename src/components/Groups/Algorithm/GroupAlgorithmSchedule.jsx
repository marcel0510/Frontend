import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Alert, Backdrop, Box, Button, CircularProgress, Snackbar } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClassroom } from "../../../hooks/Classroom.Hooks";
import { useAddGroup } from "../../../hooks/Group.Hooks";
import { ErrorMap } from "../../../helpers/group.helper";

const color1 = "rgba(18, 255, 27, 0.5)";
const color2 = "rgba(0, 150, 255, 0.4)";

export default function () {
  const { id } = useParams();
  const [ , , setIsSchedule ] = useOutletContext();
  const parameters = JSON.parse(localStorage.getItem("parameters"));
  const newGroup = {
    name: parameters.nameGr,
    subject: {
      code: parameters.subjectCode,
      name: parameters.subjectName,
      alias: parameters.subjectAlias,
    },
    sessions: parameters.sessions,
  };
  const newAddGroup = {
    name: parameters.nameGr,
    subjectId: parameters.subjectId,
    classroomId: id,
    calendarId: parameters.calendar,
    sessions: parameters.sessions,
  };
  const navigate = useNavigate();
  const { data: classroom, isLoading: isLoadClassroom, isError: isErrorClassroom } = useClassroom(id);
  const { mutate: add, isLoading: isLoadAdd, isError: isErrorAdd } = useAddGroup();
  const [render, setRender] = useState(0);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });
  const Header = ["Hora", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  const Schedule = new Array(13).fill(0).map(() => new Array(6).fill("")); // 13 filas y 6 columnas (horas y días)

  const isLoading = isLoadClassroom || isLoadAdd
  const isError = isErrorClassroom || isErrorAdd

  useEffect(() => {
    if (!isLoadClassroom) {
      classroom.groups.push(newGroup);
      setRender(render + 1);
    }
    setIsSchedule(true)
    return () => setIsSchedule(false)
  }, [isLoading, classroom]);

  const handleSubmit = (e) => {
    e.preventDefault();
    add(
      {...newAddGroup},
      {
        onSuccess: (res) => {
          if (res.data.isSuccess) {
            setSuccessMessage(true);
          }
          else {
            if (res.data.errorType == 2) {
              const currectGroups = classrooms.find(
                (c) => c.id === form.classroomId
              )["groups"];
              const currentGroup = currectGroups.find(
                (g) => g.id === res.data.overlappingGrs[0]
              );
              setErrorMessage({
                error: true,
                message: ErrorMap(res.data.errorType, { ...currentGroup }),
              });
            } else if(res.data.errorType == 1) {
              const gr = form.name;
              const subject = subjects.find((s) => s.id == form.subjectId)[
                "name"
              ];
              setErrorMessage({
                error: true,
                message: ErrorMap(res.data.errorType, {
                  gr: gr,
                  subject: subject,
                }),
              });
            }else{
              setErrorMessage({
                error: true,
                message: ErrorMap(res.data.errorType),
              });
            }
          }
        },
        onError: (error) => {
          setErrorMessage({ error: true, message: error.message });
        },
      }
    )

  }
  const MakeMatrix = () => {
    //Llenar la columna de horas
    for (let i = 0; i < 13; i++) {
      const hour = i + 7; //Hora actual
      Schedule[i][0] = `${hour.toString().padStart(2, "0")}:00 - ${(hour + 1)
        .toString()
        .padStart(2, "0")}:00`;
    }

    classroom.groups.forEach((group, index) => {
      group.sessions.forEach((session) => {
        var startHour = parseInt(session.startTime.substr(0, 2));
        var endHour = parseInt(session.endTime.substr(0, 2));
        var duration = endHour - startHour;

        for (var i = 0; i < duration; i++) {
          var row = startHour - 7 + i;
          var col = session.day + 1;
          Schedule[row][col] = {
            gr: group.name,
            code: group.subject.code,
            name: group.subject.alias
              ? group.subject.alias
              : group.subject.name,
            color: index == classroom.groups.length - 1 ? color1 : color2,
          };
        }
      });
    });
  };
  if (!isLoadClassroom) MakeMatrix();

  if (isLoading || isError)
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
      <Paper
        sx={{
          mb: 1,
          padding: "10px 2%",
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          {"Aula:  " +
            classroom.building.code +
            "/" +
            classroom.floor +
            "/" +
            classroom.code}
        </Typography>
        {classroom.isLab ? (
          <Typography variant="h6" sx={{ fontWeight: 300 }}>
            {classroom.name}
          </Typography>
        ) : (
          <p />
        )}

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component={"div"}
              sx={{
                backgroundColor: color1,
                padding: 1,
                mr: 1,
                border: "1px solid black",
              }}
            />
            <Typography variant="body2">Grupo nuevo</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
              component={"div"}
              sx={{
                backgroundColor: color2,
                padding: 1,
                mr: 1,
                border: "1px solid black",
              }}
            />
          <Typography variant="body2">Grupos almacenados  </Typography>
          </Box>
        </Box>
      </Paper>
      <TableContainer component={Paper} sx={{ mb: 1.5, pb: 2 }}>
        <Table size="small" sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              {Header.map((label, index) => {
                return (
                  <TableCell key={index}>
                    <Typography align="center">{label}</Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {Schedule.map((hour, index) => {
              return (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      width: "8.5%",
                    }}
                  >
                    <Typography align="center" variant="body2">
                      {hour[0]}
                    </Typography>
                  </TableCell>
                  {hour.slice(1).map((group, indexGroup) => {
                    return group !== "" ? (
                      <TableCell
                        key={indexGroup}
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          backgroundColor: group.color,
                        }}
                      >
                        <Typography variant="body2" align="center">
                          {group.gr + " - " + group.code}
                        </Typography>
                        <Typography variant="body2" align="center">
                          {group.name}
                        </Typography>
                      </TableCell>
                    ) : (
                      <TableCell
                        key={indexGroup}
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          width: "14.4%",
                        }}
                      >
                        {""}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
        <Button onClick={(e) => handleSubmit(e)} sx={{ width: "20%" }} variant="contained">
          Guardar
        </Button>
        </Box>
      </TableContainer>
       {/* Mensaje de exito */}
       <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={() => {
          navigate(`/Main/Aulas/Horario/${id}`)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "5.5%" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography>
            {"El grupo se agregó correctamente"}
          </Typography>
        </Alert>
      </Snackbar>
      {/* Mensaje de error */}
      <Snackbar
        open={errorMessage.error}
        autoHideDuration={4000}
        onClose={() => setErrorMessage({ ...errorMessage, error: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "1%" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          <Typography>{errorMessage.message}</Typography>
        </Alert>
      </Snackbar>

    </>
  );
}
