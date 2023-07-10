import {
  Alert,
  Backdrop,
  CircularProgress,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useClassrooms } from "../../hooks/Classroom.Hooks";
import ClassroomCard from "./ClassroomCard";
import { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
export default function Classrooms() {
  const [ , , setIsSee, filter, setFilter] = useOutletContext();
  const { fil } = useParams();
  const isInitialMount = useRef(true);
  const { data, isLoading, isError } = useClassrooms();
  const [classrooms, setClassrooms] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    if(isInitialMount.current && !isLoading && fil){
      isInitialMount.current = false;
      setFilter({ ...filter, code: fil });
    }
    filterData();
    setIsSee(true);
    return () => setIsSee(false);
  }, [filter, isLoading, data]);

  const filterData = () => {
    if (filter.code !== "" && filter.name == "")
      setClassrooms(
        data
          .filter((c) => {
            const code = c.building.code + "/" + c.floor + "/" + c.code;
            return code.includes(filter.code);
          })
          .reverse()
      );
    else if (filter.name !== "" && filter.code == "")
      setClassrooms(
        data
          .filter((c) => {
            if (c.isLab) return c.name.toLowerCase().includes(filter.name.toLowerCase());
          })
          .reverse()
      );
    else if (!isLoading) setClassrooms(data.reverse());
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
        {classrooms.map((classroom, index) => {
          return (
            <Grid item key={index} md={3.9} marginBottom={"1.3%"}>
              <ClassroomCard
                classroom={classroom}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
                forInformation={true}
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
          <Typography>{"El aula se eliminó correctamente!"}</Typography>
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
