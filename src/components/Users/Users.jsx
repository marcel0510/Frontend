import {
  Alert,
  Backdrop,
  CircularProgress,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useUsers } from "../../hooks/User.Hooks";
import UserCard from "../Users/UserCard";
import { useState } from "react";
export default function Users() {
  const { data: users, isLoading, isError } = useUsers();
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
          <Grid container sx={{ marginTop: "1.5%", width: "100%", gap: "1%" }}>
            {users.map((user, index) => {
              return (
                <Grid item key={index} md={4.4} marginBottom={"1.3%"}>
                  <UserCard
                    user={user}
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
              <Typography>{"El usuario se eliminó correctamente!"}</Typography>
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
