import {
  Alert,
  Backdrop,
  CircularProgress,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useBuildings } from "../../hooks/Building.Hooks";
import BuildingCard from "../Buildings/BuildingCard";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Buildings() {
  const [ , , setIsSee, filter] = useOutletContext();
  const { data, isLoading, isError } = useBuildings();
  const [buildings, setBuildings] = useState([]);
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
    if (filter !== "") {
      setBuildings(data.filter((b) => b.code.includes(filter)).reverse());
    } else {
      if (!isLoading) setBuildings(data.reverse());
    }
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
        {buildings.map((building, index) => {
          return (
            <Grid item key={index} md={3.15} marginBottom={"1.3%"}>
              <BuildingCard
                building={building}
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
          <Typography>{"El edificio se eliminó correctamente!"}</Typography>
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
