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
import { useState } from "react";

export default function Buildings() {
  const { data: buildings, isLoading, isError } = useBuildings();
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
      <>
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
        <Grid container sx={{ marginTop: "1.5%", width: "100%", gap: "1%" }}>
          {buildings.map((building, index) => {
            return (
              <Grid item key={index} md={2.91} marginBottom={"1.3%"}>
                <BuildingCard
                  building={building}
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setErrorMessage}
                />
              </Grid>
            );
          })}
        </Grid>
      </>
    </>
  );
}
