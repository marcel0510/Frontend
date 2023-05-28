import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { useParams } from "react-router-dom";
import { Header, ScheduleModel } from "../global/vars";
import { useClassroom } from '../hooks/Classroom.Hooks'

import '../Styles/Schedule.css'


export default function Schedule() {
  const { AulaId } = useParams();
  const { isLoading: dataClassroom, data: classroom } = useClassroom(AulaId);

  const FindInMatrix = () => {
    classroom.groups.forEach((group) => {
      group.sessions.forEach((session) => {
        ScheduleModel.forEach((hour) => {
          for (let i = 0; i <= 5; i++) {
            if (typeof hour[i] == "string") {
              continue;
            }
            let bool1 =
              hour[i].StartTime == session.startTime &&
              hour[i].EndTime == session.endTime &&
              hour[i].IndexDay == session.day;
            let bool2 =
              hour[i].StartTime == session.startTime &&
              hour[i].IndexDay == session.day;
            let bool3 =
              hour[i].EndTime == session.endTime &&
              hour[i].IndexDay == session.day;
            let bool4 = hour[i].StartTime != "13:00";

            if ((bool1 || bool2 || bool3) && bool4) {
              hour[i]["GR"] = group.name;
              hour[i]["Subject"] = group.subject.name;
              hour[i]["Code"] = group.subject.code;
            }
          }
        });
      });
    });
  };

  

  if (dataClassroom)
    return (
      <Box
        sx={{
          marginLeft: "19.5%",
          width: "79.5%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CircularProgress size={"8%"} sx={{ marginTop: "15%" }} />
      </Box>
    );

    FindInMatrix();

  return (
    <TableContainer component={Paper} >
      <Table size="small">
        <TableHead>
          <TableRow>
            {Header.map((label, index) => {
              return <TableCell key={index} className="verticalLine" ><Typography align="center">{label}</Typography></TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {ScheduleModel.map((hour, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="verticalLine widthHead"><Typography align="center">{hour[0]}</Typography></TableCell>
                <TableCell className="verticalLine width">
                  {hour[1].hasOwnProperty("GR") ? (
                    <>
                      <Typography variant="body2" align="center">
                        {hour[1]["GR"] + " - " + hour[1]["Code"]}
                      </Typography>
                      <Typography variant="body2" align="center">
                        {hour[1]["Subject"]}
                      </Typography>
                    </>
                  ) : (
                    <p />
                  )}
                </TableCell>
                <TableCell className="verticalLine width">
                  {hour[2].hasOwnProperty("GR") ? (
                    <>
                      <Typography variant="body2" align="center">{hour[2]["GR"] + " - " + hour[2]["Code"]}</Typography>
                      <Typography variant="body2" align="center">{hour[2]["Subject"]}</Typography>
                    </>
                  ) : (
                    <p />
                  )}
                </TableCell>
                <TableCell className="verticalLine width">
                  {hour[3].hasOwnProperty("GR") ? (
                    <>
                      <Typography variant="body2" align="center">{hour[3]["GR"] + " - " + hour[3]["Code"]}</Typography>
                      <Typography variant="body2" align="center">{hour[3]["Subject"]}</Typography>
                    </>
                  ) : (
                    <p />
                  )}
                </TableCell>
                <TableCell className="verticalLine width">
                  {hour[4].hasOwnProperty("GR") ? (
                    <>
                      <Typography variant="body2" align="center">{hour[4]["GR"] + " - " + hour[4]["Code"]}</Typography>
                      <Typography variant="body2" align="center">{hour[4]["Subject"]}</Typography>
                    </>
                  ) : (
                    <p />
                  )}
                </TableCell>
                <TableCell className="verticalLine width">
                  {hour[5].hasOwnProperty("GR") ? (
                    <>
                      <Typography variant="body2" align="center">{hour[5]["GR"] + " - " + hour[5]["Code"]}</Typography>
                      <Typography variant="body2" align="center">{hour[5]["Subject"]}</Typography>
                    </>
                  ) : (
                    <p />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

 
