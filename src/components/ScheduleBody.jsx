import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";



export default function ScheduleBody({ classroom }) {
  const SevenToEight = [
    "07:00 - 08:00",
    {
      IndexDay: 0,
      StartTime: "07:00",
      EndTime: "08:00",
    },
    {
      IndexDay: 1,
      StartTime: "07:00",
      EndTime: "08:00",
    },
    {
      IndexDay: 2,
      StartTime: "07:00",
      EndTime: "08:00",
    },
    {
      IndexDay: 3,
      StartTime: "07:00",
      EndTime: "08:00",
    },
    {
      IndexDay: 4,
      StartTime: "07:00",
      EndTime: "08:00",
    },
  ];
  const EightToNine = [
    "08:00 - 09:00",
    {
      IndexDay: 0,
      StartTime: "08:00",
      EndTime: "09:00",
    },
    {
      IndexDay: 1,
      StartTime: "08:00",
      EndTime: "09:00",
    },
    {
      IndexDay: 2,
      StartTime: "08:00",
      EndTime: "09:00",
    },
    {
      IndexDay: 3,
      StartTime: "08:00",
      EndTime: "09:00",
    },
    {
      IndexDay: 4,
      StartTime: "08:00",
      EndTime: "09:00",
    },
  ];
  const NineToTen = [
    "09:00 - 10:00",
    {
      IndexDay: 0,
      StartTime: "09:00",
      EndTime: "10:00",
    },
    {
      IndexDay: 1,
      StartTime: "09:00",
      EndTime: "10:00",
    },
    {
      IndexDay: 2,
      StartTime: "09:00",
      EndTime: "10:00",
    },
    {
      IndexDay: 3,
      StartTime: "09:00",
      EndTime: "10:00",
    },
    {
      IndexDay: 4,
      StartTime: "09:00",
      EndTime: "10:00",
    },
  ];
  const TenToEleven = [
    "10:00 - 11:00",
    {
      IndexDay: 0,
      StartTime: "10:00",
      EndTime: "11:00",
    },
    {
      IndexDay: 1,
      StartTime: "10:00",
      EndTime: "11:00",
    },
    {
      IndexDay: 2,
      StartTime: "10:00",
      EndTime: "11:00",
    },
    {
      IndexDay: 3,
      StartTime: "10:00",
      EndTime: "11:00",
    },
    {
      IndexDay: 4,
      StartTime: "10:00",
      EndTime: "11:00",
    },
  ];
  const ElevenToTwelve = [
    "11:00 - 12:00",
    {
      IndexDay: 0,
      StartTime: "11:00",
      EndTime: "12:00",
    },
    {
      IndexDay: 1,
      StartTime: "11:00",
      EndTime: "12:00",
    },
    {
      IndexDay: 2,
      StartTime: "11:00",
      EndTime: "12:00",
    },
    {
      IndexDay: 3,
      StartTime: "11:00",
      EndTime: "12:00",
    },
    {
      IndexDay: 4,
      StartTime: "11:00",
      EndTime: "12:00",
    },
  ];
  const TwelveToOne = [
    "12:00 - 13:00",
    {
      IndexDay: 0,
      StartTime: "12:00",
      EndTime: "13:00",
    },
    {
      IndexDay: 1,
      StartTime: "12:00",
      EndTime: "13:00",
    },
    {
      IndexDay: 2,
      StartTime: "12:00",
      EndTime: "13:00",
    },
    {
      IndexDay: 3,
      StartTime: "12:00",
      EndTime: "13:00",
    },
    {
      IndexDay: 4,
      StartTime: "12:00",
      EndTime: "13:00",
    },
  ];
  const OneToTwo = [
    "13:00 - 14:00",
    {
      IndexDay: 0,
      StartTime: "13:00",
      EndTime: "14:00",
    },
    {
      IndexDay: 1,
      StartTime: "13:00",
      EndTime: "14:00",
    },
    {
      IndexDay: 2,
      StartTime: "13:00",
      EndTime: "14:00",
    },
    {
      IndexDay: 3,
      StartTime: "13:00",
      EndTime: "14:00",
    },
    {
      IndexDay: 4,
      StartTime: "13:00",
      EndTime: "14:00",
    },
  ];
  const TwoToThree = [
    "14:00 - 15:00",
    {
      IndexDay: 0,
      StartTime: "14:00",
      EndTime: "15:00",
    },
    {
      IndexDay: 1,
      StartTime: "14:00",
      EndTime: "15:00",
    },
    {
      IndexDay: 2,
      StartTime: "14:00",
      EndTime: "15:00",
    },
    {
      IndexDay: 3,
      StartTime: "14:00",
      EndTime: "15:00",
    },
    {
      IndexDay: 4,
      StartTime: "14:00",
      EndTime: "15:00",
    },
  ];
  const ThreeToFour = [
    "15:00 - 16:00",
    {
      IndexDay: 0,
      StartTime: "15:00",
      EndTime: "16:00",
    },
    {
      IndexDay: 1,
      StartTime: "15:00",
      EndTime: "16:00",
    },
    {
      IndexDay: 2,
      StartTime: "15:00",
      EndTime: "16:00",
    },
    {
      IndexDay: 3,
      StartTime: "15:00",
      EndTime: "16:00",
    },
    {
      IndexDay: 4,
      StartTime: "15:00",
      EndTime: "16:00",
    },
  ];
  const FourToFive = [
    "16:00 - 17:00",
    {
      IndexDay: 0,
      StartTime: "16:00",
      EndTime: "17:00",
    },
    {
      IndexDay: 1,
      StartTime: "16:00",
      EndTime: "17:00",
    },
    {
      IndexDay: 2,
      StartTime: "16:00",
      EndTime: "17:00",
    },
    {
      IndexDay: 3,
      StartTime: "16:00",
      EndTime: "17:00",
    },
    {
      IndexDay: 4,
      StartTime: "16:00",
      EndTime: "17:00",
    },
  ];
  const FiveToSix = [
    "17:00 - 18:00",
    {
      IndexDay: 0,
      StartTime: "17:00",
      EndTime: "18:00",
    },
    {
      IndexDay: 1,
      StartTime: "17:00",
      EndTime: "18:00",
    },
    {
      IndexDay: 2,
      StartTime: "17:00",
      EndTime: "18:00",
    },
    {
      IndexDay: 3,
      StartTime: "17:00",
      EndTime: "18:00",
    },
    {
      IndexDay: 4,
      StartTime: "17:00",
      EndTime: "18:00",
    },
  ];
  const SixToSeven = [
    "18:00 - 19:00",
    {
      IndexDay: 0,
      StartTime: "18:00",
      EndTime: "19:00",
    },
    {
      IndexDay: 1,
      StartTime: "18:00",
      EndTime: "19:00",
    },
    {
      IndexDay: 2,
      StartTime: "18:00",
      EndTime: "19:00",
    },
    {
      IndexDay: 3,
      StartTime: "18:00",
      EndTime: "19:00",
    },
    {
      IndexDay: 4,
      StartTime: "18:00",
      EndTime: "19:00",
    },
  ];
  const SevenToEightPM = [
    "19:00 - 20:00",
    {
      IndexDay: 0,
      StartTime: "19:00",
      EndTime: "20:00",
    },
    {
      IndexDay: 1,
      StartTime: "19:00",
      EndTime: "20:00",
    },
    {
      IndexDay: 2,
      StartTime: "19:00",
      EndTime: "20:00",
    },
    {
      IndexDay: 3,
      StartTime: "19:00",
      EndTime: "20:00",
    },
    {
      IndexDay: 4,
      StartTime: "19:00",
      EndTime: "20:00",
    },
  ];

  const Header = ["Hora", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  const ScheduleModel = [
    SevenToEight,
    EightToNine,
    NineToTen,
    TenToEleven,
    ElevenToTwelve,
    TwelveToOne,
    OneToTwo,
    TwoToThree,
    ThreeToFour,
    FourToFive,
    FiveToSix,
    SixToSeven,
    SevenToEightPM,
  ];

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
              hour[i]["Code"] = group.subject.code;
              if(group.subject.alias != null)
                hour[i]["Alias"] = group.subject.alias;
              else{
                hour[i]["Subject"] = group.subject.name;
                hour[i]["Alias"] = null;
              }

            }
          }
        });
      });
    });
  };

  FindInMatrix();

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            {Header.map((label, index) => {
              return (
                <TableCell key={index} >
                  <Typography align="center">{label}</Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {ScheduleModel.map((hour, index) => {
            return (
              <TableRow key={index}>
                <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", width: "8.5%"}}>
                  <Typography align="center" variant="body2">
                    {hour[0]}
                  </Typography>
                </TableCell>
                <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", width: "14.4%"}}>
                  {hour[1].hasOwnProperty("GR") ? (
                    <>
                      <Typography variant="body2" align="center" margin={0}>
                        {hour[1]["GR"] + " - " + hour[1]["Code"]}
                      </Typography>
                      <Typography variant="body2" align="center" margin={0}>
                        {"\n" + hour[1]["Subject"]}
                      </Typography>
                    </>
                  ) : (
                    <p />
                  )}
                </TableCell>
                <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", width: "14.4%" }}>
                  {hour[2].hasOwnProperty("GR") ? (
                    <>
                      <Typography variant="body2" align="center" margin={0}>
                        {hour[2]["GR"] + " - " + hour[2]["Code"]}
                      </Typography>
                      <Typography variant="body2" align="center" margin={0}>
                        {hour[2]["Subject"]}
                      </Typography>
                    </>
                  ) : (
                    <p />
                  )}
                </TableCell>
                <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", width: "14.4%" }}>
                  {hour[3].hasOwnProperty("GR") ? (
                    <>
                      <Typography variant="body2" align="center" margin={0}>
                        {hour[3]["GR"] + " - " + hour[3]["Code"]}
                      </Typography>
                      <Typography variant="body2" align="center" margin={0}>
                        {hour[3]["Subject"]}
                      </Typography>
                    </>
                  ) : (
                    <p />
                  )}
                </TableCell>
                <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", width: "14.4%" }}>
                  {hour[4].hasOwnProperty("GR") ? (
                    <>
                      <Typography variant="body2" align="center" margin={0} >
                        {hour[4]["GR"] + " - " + hour[4]["Code"]}
                      </Typography>
                      <Typography variant="body2" align="center" margin={0}>
                        {hour[4]["Subject"]}
                      </Typography>
                    </>
                  ) : (
                    <p />
                  )}
                </TableCell>
                <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", width: "14.4%" }}>
                  {hour[5].hasOwnProperty("GR") ? (
                    <>
                      <Typography variant="body2" align="center" margin={0}>
                        {hour[5]["GR"] + " - " + hour[5]["Code"]}
                      </Typography>
                      <Typography variant="body2" align="center" margin={0}>
                        {hour[5]["Alias"] == null ? hour[5]["Subject"]:hour[5]["Alias"]}
                      </Typography>
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
