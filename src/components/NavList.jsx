import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TableViewIcon from '@mui/icons-material/TableView';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

export default function NavList() {
  const navigate = useNavigate();
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <SchoolIcon sx={{ marginRight: "5%" }} />
          <Typography>Aulas</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container direction="column">
            <Divider />
                <ListItemButton sx={{ padding: 0 }} onClick={() => navigate("/Aulas")}>
                    <SearchIcon fontSize="small" sx={{ marginRight: "5%" }} />
                    <Typography variant="body2">Ver horarios</Typography>
                </ListItemButton>
                <Divider />
                
            </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AutoStoriesIcon sx={{ marginRight: "5%" }} />
          <Typography>Materias</Typography>
        </AccordionSummary>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <TableViewIcon sx={{ marginRight: "5%" }} />
          <Typography>Grupos</Typography>
        </AccordionSummary>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <CalendarMonthIcon sx={{ marginRight: "5%" }} />
          <Typography>Calendarios</Typography>
        </AccordionSummary>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AccountCircleIcon sx={{ marginRight: "5%" }} />
          <Typography>Usuarios</Typography>
        </AccordionSummary>
      </Accordion>
    </>
  );
}
