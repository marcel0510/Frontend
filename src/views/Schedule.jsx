import { Box, CircularProgress } from "@mui/material";

import { useParams } from "react-router-dom";
import { useClassroom } from "../hooks/Classroom.Hooks";
import ScheduleHeader from "../components/ScheduleHeader";
import ScheduleBody from "../components/ScheduleBody";

export default function Schedule() {

  const { AulaId } = useParams();
  const { isLoading: dataClassroom, data: classroom} = useClassroom(parseInt(AulaId));

  if (dataClassroom) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CircularProgress size={"8%"} sx={{ marginTop: "15%" }} />
      </Box>
    );
  }

  return (
    <>
        <ScheduleHeader classroom={classroom}/>
        <ScheduleBody classroom={classroom}/>
    </>
  );
}
