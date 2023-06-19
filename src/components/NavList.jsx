import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TableViewIcon from '@mui/icons-material/TableView';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useNavigate } from "react-router-dom";
import BuildingList from "./Buildings/BuildingList";
import CalendarList from "./Calendars/CalendarLis";
import SubjectList from "./Subjects/SubjectList";
import GroupList from "./Groups/GroupList";

export default function NavList() {
  const navigate = useNavigate();
  return (
    <Box sx={{ mt: "30%" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "2%", padding: "2%"}}>
      <MenuIcon sx={{ marginLeft: "4%" }}/>
      <Typography variant="h5" ml={"2.5%"}>
        Menú</Typography>
      </Box>
      
      <Divider />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <SchoolIcon sx={{ marginRight: "5%" }} />
          <Typography>Aulas</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container direction="column">
            <Divider />
                <ListItemButton sx={{ padding: 0 }} onClick={() => navigate("/Main/Aulas")}>
                    <SearchIcon fontSize="small" sx={{ marginRight: "5%" }} />
                    <Typography variant="body2">Ver Aulas</Typography>
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
        <AccordionDetails>
          <SubjectList />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <TableViewIcon sx={{ marginRight: "5%" }} />
          <Typography>Grupos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GroupList/>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <CalendarMonthIcon sx={{ marginRight: "5%" }} />
          <Typography>Calendarios</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CalendarList />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <ApartmentIcon sx={{ marginRight: "5%" }} />
          <Typography>Edificios</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <BuildingList />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AccountCircleIcon sx={{ marginRight: "5%" }} />
          <Typography>Usuarios</Typography>
        </AccordionSummary>
      </Accordion>
    </Box>
  );
}
