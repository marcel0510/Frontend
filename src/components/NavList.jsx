import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from "@mui/icons-material/Menu";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BuildingList from "./Buildings/BuildingList";
import CalendarList from "./Calendars/CalendarLis";
import SubjectList from "./Subjects/SubjectList";
import GroupList from "./Groups/GroupList";
import ClassroomList from "./Classrooms/ClassroomList";
import UserList from "./Users/UserList";
import AccountList from "./Users/AccountList";

export default function NavList({ admin }) {
  return (
    <Box sx={{ mt: "30%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2%",
          padding: "2%",
        }}
      >
        <MenuIcon sx={{ marginLeft: "4%" }} />
        <Typography variant="h5" ml={"2.5%"}>
          Menú
        </Typography>
      </Box>

      <Divider />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <SchoolIcon sx={{ marginRight: "5%" }} />
          <Typography>Aulas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ClassroomList />
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
          <GroupsIcon sx={{ marginRight: "5%" }} />
          <Typography>Grupos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GroupList />
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
        <AccordionDetails>
          <BuildingList />
        </AccordionDetails>
      </Accordion>

      {admin && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <ManageAccountsIcon sx={{ marginRight: "5%" }} />
            <Typography>Usuarios</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <UserList />
          </AccordionDetails>
        </Accordion>
      )}

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <AccountCircleIcon sx={{ marginRight: "5%" }} />
          <Typography>Cuenta</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AccountList />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
