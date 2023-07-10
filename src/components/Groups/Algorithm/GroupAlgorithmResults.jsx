import { Backdrop, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ClassroomCard from "../../Classrooms/ClassroomCard";
import { useAlgorithm } from "../../../hooks/Algorithm.Hook";

export default function GroupAlgorithmResults() {
  const parameters = JSON.parse(localStorage.getItem("parameters"))
  const { data: results, isLoading, isError} = useAlgorithm(parameters);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });

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
      {results.map((classroom, index) => {
        return (
          <Grid item key={index} md={3.9} marginBottom={"1.3%"}>
            <ClassroomCard
              classroom={classroom}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
              forInformation={false}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
