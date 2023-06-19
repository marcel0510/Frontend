import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Main from "./views/Main";
import Building from "./views/Building";
import EditBuildings from "./components/Buildings/EditBuildings";
import AddBuildings from "./components/Buildings/AddBuildings";
import "./App.css";
import Buildings from "./components/Buildings/Buildings";
import Calendar from "./views/Calendar";
import Calendars from "./components/Calendars/Calendars";
import AddCalendars from "./components/Calendars/AddCalendars";
import EditCalendars from "./components/Calendars/EditCalendars";
import Subject from "./views/Subject";
import Subjects from "./components/Subjects/Subjects";
import AddSubjects from "./components/Subjects/AddSubjects";
import EditSubjects from "./components/Subjects/EditSubjects";


function App() {
  return ( 
    <Routes>
      <Route exact path="/" Component={Login} />
      <Route exact path="/Main" Component={Main}>
        <Route exact path="/Main/Aulas" />
        <Route exact path="/Main/Materias" Component={Subject}>
          <Route exact path="/Main/Materias/Ver" Component={Subjects} />
          <Route exact path="/Main/Materias/Agregar" Component={AddSubjects} />
          <Route exact path="/Main/Materias/Editar/:id" Component={EditSubjects} />
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
