import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useDisponibility } from "../../../hooks/Algorithm.Hook";
import { DayMap } from "../../../helpers/date.helper";
const color = "rgba(18, 255, 27, 0.8)";
export default function ClassroomAlgorithmResults() {
  const parameters = JSON.parse(localStorage.getItem("parameters"));
  const { data: results, isLoading, isError } = useDisponibility(parameters);


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
        <CircularProgress size={100} />
      </Backdrop>
    );

  return (
    <Box
      sx={{
        width: "100%",
        gap: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "70%", padding: "7px 0" }}>
        <Typography variant="h5" sx={{ fontWeight: 400 }} ml={"2.5%"} mb={1}>Parametros:</Typography>
        <Divider />
        <Box sx={{ display:"flex", justifyContent: "space-evenly", alignItems: "center", mt: 2}}>
          <Typography variant="h6" sx={{ fontWeight: 200 }}>{parameters.buildingName}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 200 }}>{parameters.floor}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 200 }}>{DayMap(parameters.day)}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 200 }}>{parameters.morning ? "En la mañana":"En la tarde"}</Typography>
        </Box>
      </Paper>
      
      <Paper sx={{ width: "70%" }}>
      <Typography variant="h5" sx={{ fontWeight: 400, margin: "5px 2.5%" }} ml={"2.5%"} >Aulas: </Typography>
      <Divider />

      {results.status ? 
        results.aulas.map((classroom, index) => {
          return (
            <>
            <Box
              item
              key={index}
              md={12}
              sx={{
                padding: "2%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" sx={{  fontWeight: 300, margin: "0 20%" }} >
                {classroom.building.code +
                  "/" +
                  classroom.floor +
                  "/" +
                  classroom.code}
              </Typography>
              {classroom.disponibility.split(",").filter(d => d !== "").map((disp, index) => {
                return(
                  <Paper
                    key={index}
                    sx={{ backgroundColor: color, mr: 2, padding: "3px 1%", borderRadius: 1.5 }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 200 }}>
                      {disp}
                    </Typography>
                  </Paper>
                );
              })}
            </Box>
            <Divider />
            </>
          );
        })
        
       : (
        <Typography variant="h4" color={"secondary"} sx={{ margin: "25px 5%" }}>
          {results.message}.
        </Typography>
      )}
      </Paper>
    </Box>
  );
}
