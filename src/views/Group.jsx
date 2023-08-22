import TableViewIcon from "@mui/icons-material/TableView";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
export default function Group() {
  const navigate = useNavigate();
  const [calendar, calendars, , setIsEditGroup] = useOutletContext();
  const [isEdit, setIsEdit] = useState(false);
  const [isSee, setIsSee] = useState(false);
  const [filter, setFilter] = useState({
    code: "",
    name: "",
  });
  const [doFilter, setDoFilter] = useState(false)
  const editButtonHandle = () => {
    setIsEdit(false);
    setIsSee(true);
    navigate("/Main/Grupos/Ver");
  };

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          padding: 2,
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <TableViewIcon sx={{ fontSize: 50, mr: "1.5%" }} />
          <Typography variant="h3" sx={{ flexGrow: 1 }}>
            Módulo de Grupos
          </Typography>
          {isEdit ? (
            <IconButton onClick={() => editButtonHandle()}>
              <ArrowBackIcon color="primary" />
            </IconButton>
          ) : (
            <p />
          )}
        </Box>
        {isSee ? (
          <>
            <Divider />
            <Box
              component={"fieldset"}
              sx={{
                mt: 1,
                ml: 9,
                border: "1px solid #fff",
                display: "flex",
                width: "50%",
              }}
            >
              <legend>
                <Typography variant="body2">Filtrar por :</Typography>
              </legend>
              <TextField
                label="Código de materia"
                size="small"
                sx={{ mt: 1.7, mr: 2 }}
                value={filter.code}
                inputProps={{ maxLength: 8 }}
                onChange={(e) =>
                  setFilter({ ...filter, code: e.target.value.toUpperCase() })
                }
              />
              <TextField
                label="Nombre de materia"
                size="small"
                sx={{ mt: 1.7, mr: 2, width: "75%" }}
                value={filter.name}
                inputProps={{ maxLength: 40 }}
                onChange={(e) =>
                  setFilter({ ...filter, name: e.target.value.toUpperCase() })
                }
              />
            </Box>
          </>
        ) : (
          <p />
        )}
      </Paper>
      <Outlet
        context={[
          calendar,
          calendars,
          setIsEditGroup,
          isEdit,
          setIsEdit,
          setIsSee,
          filter,
          setFilter,
          doFilter
        ]}
      />
    </>
  );
}
