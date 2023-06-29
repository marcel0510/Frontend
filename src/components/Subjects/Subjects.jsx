import {
  Alert,
  Backdrop,
  CircularProgress,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useSubjects } from "../../hooks/Subject.Hooks";
import SubjectCard from "../Subjects/SubjectCard";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
export default function Subjects() {
  const [ , , setIsSee, filter] = useOutletContext();
  const { data, isLoading, isError } = useSubjects();
  const [subjects, setSubjects] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });
  useEffect(() => {
    filterData();
    setIsSee(true);
    return () => setIsSee(false);
  }, [filter, isLoading, data]);

  const filterData = () => {
    if (filter.code !== "" && filter.name == "" && filter.semester == "")
      setSubjects(data.filter((s) => s.code.includes(filter.code)).reverse());
    else if (filter.name !== "" && filter.code == "" && filter.semester == "")
      setSubjects(
        data
          .filter((s) => {
            if (s.alias !== null)
              return (
                s.name.includes(filter.name) || s.alias.includes(filter.name)
              );
            else return s.name.includes(filter.name);
          })
          .reverse()
      );
    else if (filter.name === "" && filter.code === "" && filter.semester !== "")
      setSubjects(
        data.filter((s) => s.numSemester == parseInt(filter.semester))
      );
    else if (!isLoading) setSubjects(data.reverse());
  };

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
      <Grid container sx={{ marginTop: "1.5%", width: "100%", gap: "1%" }}>
        {subjects.map((subject, index) => {
          return (
            <Grid item key={index} md={3.9} marginBottom={"1.3%"}>
              <SubjectCard
                subject={subject}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
              />
            </Grid>
          );
        })}
      </Grid>
      <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={() => setSuccessMessage(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "3%" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography>{"La materia se eliminó correctamente!"}</Typography>
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorMessage.error}
        autoHideDuration={2000}
        onClose={() => setErrorMessage({ ...errorMessage, error: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "3%" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          <Typography>{errorMessage.message}</Typography>
        </Alert>
      </Snackbar>
    </>
  );
}
