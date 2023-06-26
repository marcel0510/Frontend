import styled from "@emotion/styled";
import { Grid, InputLabel, Select } from "@mui/material";

export const CustomSelect = styled(Select)(({ error }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: error ? "red" : "inherit"
    },
  },
}));

export const CustomInputLabel = styled(InputLabel)(({ error }) => ({
  color: error ? "red" : "inherit",
}));

export const CustomGrid = styled(Grid)(({ error }) => ({
  border: error ? "1px solid red" : "none"
}));
