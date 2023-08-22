import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useGroups } from "../../hooks/Group.Hooks";
import GroupCard from "./GroupCard";
import { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function Groups() {
  const [calendar, , , , , setIsSee, filter, setFilter, doFilter] = useOutletContext();
  const { fil } = useParams();
  const isInitialMount = useRef(true);
  const { data, isLoading, isError, isFetching } = useGroups(calendar);
  const [groups, setGroups] = useState([]);
  const [loadFilter, setLoadFilter] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });
  useEffect(() => {
    if (isInitialMount.current && !isLoading && fil) {
      isInitialMount.current = false;
      setFilter({ ...filter, code: fil });
    }
    filterData(filter);
    setIsSee(true);
    return () => setIsSee(false);
  }, [filter, isLoading, calendar, data]);

  const filterData = (filter) => {
    if (filter.name !== "" && filter.code === "")
      setGroups(
        data
          .filter(
            (g) =>
              g.subject.name.includes(filter.name) && g.calendar.id == calendar
          )
          .reverse()
      );
    else if (filter.name === "" && filter.code !== "")
      setGroups(
        data
          .filter(
            (g) =>
              g.subject.code.includes(filter.code) && g.calendar.id == calendar
          )
          .reverse()
      );
    else if (!isLoading)
      setGroups(data);
  };

  if (isLoading || isError || isFetching)
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
        <CircularProgress size={100} thickness={4} />
      </Backdrop>
    );
  return (
    <>
      {loadFilter ? (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 25 }}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        <Grid container sx={{ marginTop: "1.5%", width: "100%", gap: "1%" }}>
          {groups.slice(0, 35).reverse().map((group, index) => {
            return (
              <Grid item key={index} md={3.7} marginBottom={"1.3%"}>
                <GroupCard
                  group={group}
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setErrorMessage}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
      <Snackbar
        open={successMessage}
        autoHideDuration={1500}
        onClose={() => setSuccessMessage(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "5%", mr: "3%" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography>{"El grupo se eliminó correctamente!"}</Typography>
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
