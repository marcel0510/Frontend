import { Backdrop, CircularProgress, Grid, Typography } from "@mui/material";
import ClassroomCard from "../../Classrooms/ClassroomCard";
import { useAlgorithm } from "../../../hooks/Algorithm.Hook";

export default function GroupAlgorithmResults() {
  const parameters = JSON.parse(localStorage.getItem("parameters"))
  const { data: results, isLoading, isError} = useAlgorithm(parameters);


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
    <Grid container sx={{ width: "100%", gap: "1%" }}>
      { results.status ?
      results.aulas.map((classroom, index) => {
        return (
          <Grid item key={index} md={3.9} marginBottom={"1.3%"}>
            <ClassroomCard
              classroom={classroom}
              forInformation={false}
            />
          </Grid>
        );
      }) : 
        <Typography variant="h4" color={"secondary"} ml={"5%"} >{results.message}.</Typography>
    }
    </Grid>
  );
}
