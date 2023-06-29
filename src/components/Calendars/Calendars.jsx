import {
  Alert,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CalendarCard from "./CalendarCard";
import { useOutletContext } from "react-router-dom";

export default function Calendars() {
  const [ calendars, setCalendar, , , setIsSee, filter] = useOutletContext();
  const [ Calendars, setCalendars ] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    setIsSee(true);
    filterData();
    return () => setIsSee(false);
  }, [filter, calendars])

  const filterData = () => {
    if(filter !== "")
      setCalendars(calendars.filter(b => b.period.includes(filter)).reverse())
    else if (calendars) setCalendars(calendars.reverse())
  }

  return (
    <>
      <Grid container sx={{ marginTop: "1.5%", width: "100%", gap: "1%" }}>
        {Calendars.map((calendar, index) => {
          return (
            <Grid item key={index} md={3.8} marginBottom={"1.3%"}>
              <CalendarCard
                calendar={calendar}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
                setCalendar={setCalendar}
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
          <Typography>{"El calendario se eliminó correctamente!"}</Typography>
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
