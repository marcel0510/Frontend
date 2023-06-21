import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Main from "./views/Main";
import Building from "./views/Building";
import EditBuildings from "./components/Buildings/EditBuildings";
import AddBuildings from "./components/Buildings/AddBuildings";
import Buildings from "./components/Buildings/Buildings";
import Calendar from "./views/Calendar";
import Calendars from "./components/Calendars/Calendars";
import AddCalendars from "./components/Calendars/AddCalendars";
import EditCalendars from "./components/Calendars/EditCalendars";
import Subject from "./views/Subject";
import Subjects from "./components/Subjects/Subjects";
import AddSubjects from "./components/Subjects/AddSubjects";
import EditSubjects from "./components/Subjects/EditSubjects";
import Group from "./views/Group";
import Groups from "./components/Groups/Groups";
import Classroom from "./views/Classroom";
import Classrooms from "./components/Classrooms/Classrooms";
import ClassroomSchedule from "./components/Classrooms/ClassroomSchedule";
import GroupSchedule from "./components/Groups/GroupSchedule";


function App() {
  return ( 
    <Routes>
      <Route exact path="/" Component={Login} />
      <Route exact path="/Main" Component={Main}>
        <Route exact path="/Main/Aulas" Component={Classroom}>
          <Route exact path="/Main/Aulas/Ver/" Component={Classrooms} />
          <Route path="/Main/Aulas/Ver/Filtro/:fil" Component={Classrooms} />
          <Route exact path="/Main/Aulas/Horario/:id" Component={ClassroomSchedule} />
        </Route>
        <Route exact path="/Main/Materias" Component={Subject}>
          <Route exact path="/Main/Materias/Ver" Component={Subjects} />
          <Route exact path="/Main/Materias/Agregar" Component={AddSubjects} />
          <Route exact path="/Main/Materias/Editar/:id" Component={EditSubjects} />
        </Route>
        <Route exact path="/Main/Grupos/" Component={Group}>
          <Route exact path="/Main/Grupos/Ver" Component={Groups}  />
          <Route path="/Main/Grupos/Ver/Filtro/:fil" Component={Groups}  />
          <Route exact path="/Main/Grupos/Horario/:id" Component={GroupSchedule}  />
        </Route>
        <Route exact path="/Main/Edificios" Component={Building}>
          <Route exact path="/Main/Edificios/Ver"Component={Buildings} />
          <Route exact path="/Main/Edificios/Agregar" Component={AddBuildings}/>
          <Route exact path="/Main/Edificios/Editar/:id" Component={EditBuildings}/>
        </Route>
        <Route exact path="/Main/Calendarios" Component={Calendar}>
          <Route exact path="/Main/Calendarios/Ver" Component={Calendars} />
          <Route exact path="/Main/Calendarios/Agregar" Component={AddCalendars}/>
          <Route exact path="/Main/Calendarios/Editar/:id" Component={EditCalendars} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
