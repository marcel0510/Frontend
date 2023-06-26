import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Backdrop, CircularProgress, Button, makeStyles } from "@mui/material";
import { useGroup } from "../../hooks/Group.Hooks";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function GroupSchedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: group, isLoading, isError } = useGroup(id);
  const [_, _2, setIsEdit, setIsSee] = useOutletContext();
  const Header = ["Hora", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  const Schedule = new Array(13).fill(0).map(() => new Array(6).fill("")); // 13 filas y 6 columnas (horas y días)

  useEffect(() => {
    setIsSee(false);
    setIsEdit(true);
  }, []);

  const MakeMatrix = () => {
    //Llenar la columna de horas
    for (let i = 0; i < 13; i++) {
      const hour = i + 7; //Hora actual
      Schedule[i][0] = `${hour.toString().padStart(2, "0")}:00 - ${(hour + 1)
        .toString()
        .padStart(2, "0")}:00`;
    }
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
          name:
            group.subject.alias !== null
              ? group.subject.alias
              : group.subject.name,
        };
      }
    });
  };

  if (!isLoading) MakeMatrix();

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
          mt: 1,
          mb: 1,
          padding: "10px 2%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          {group.name}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          {group.subject.name}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          {"Aula: " +
            group.classroom.building +
            "/" +
            group.classroom.floor +
            "/" +
            group.classroom.code}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          {"Calendario: " + group.calendar.period}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/Main/Aulas/Horario/${group.classroom.id}`)}
        >
          Ver aula
        </Button>
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
      </TableContainer>
    </>
  );
}
