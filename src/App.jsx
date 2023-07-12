import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
import AddClassrooms from "./components/Classrooms/AddClassrooms";
import EditClassrooms from "./components/Classrooms/EditClassrooms";
import GroupAlgorithm from "./components/Groups/Algorithm/GroupAlgorithm";
import GroupAlgorithmForm from "./components/Groups/Algorithm/GroupAlgorithmForm";
import AddGroups from "./components/Groups/AddGroups";
import EditGroups from "./components/Groups/EditGroups";
import GroupAlgorithmResults from "./components/Groups/Algorithm/GroupAlgorithmResults";
import GroupAlgorithmSchedule from "./components/Groups/Algorithm/GroupAlgorithmSchedule";
import User from "./views/User";
import Users from "./components/Users/users";
import AddUsers from "./views/Register";
import EditUsers from "./components/Users/EditUsers";
import EditAccounts from "./components/Users/EditAccounts";
import ResetPasswordForm from "./components/Users/ResetPasswordForm";
import ResetPassword from "./views/ResetPassword";
import Account from "./views/Account";
import ChangePassword from "./components/Users/ChangePassword";
import ClassroomAlgorithm from "./components/Classrooms/Algorithm/ClassroomAlgorithm"
import ClassroomAlgorithmForm from "./components/Classrooms/Algorithm/ClassroomAlgorithmForm";
import ClassroomAlgorithmResults from "./components/Classrooms/Algorithm/ClassroomAlgorithmResults";


function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/Ingresar")
  }, [])
  return ( 
    <Routes>
      <Route exact path="/Ingresar" Component={Login} />
      <Route exact path="/Registrar" Component={AddUsers} />
      <Route exact path="/CambiarContraseña" Component={ResetPassword} />
      <Route exact path="/Main" Component={Main}>
        <Route exact path="/Main/Aulas" Component={Classroom}>
          <Route exact path="/Main/Aulas/Ver/" Component={Classrooms} />
          <Route exact path="/Main/Aulas/Agregar/" Component={AddClassrooms} />
          <Route exact path="/Main/Aulas/Editar/:id" Component={EditClassrooms} />
          <Route path="/Main/Aulas/Ver/Filtro/:fil" Component={Classrooms} />
          <Route exact path="/Main/Aulas/Algoritmo" Component={ClassroomAlgorithm}>
            <Route  exact path="/Main/Aulas/Algoritmo/Parametros" Component={ClassroomAlgorithmForm} />
            <Route  exact path="/Main/Aulas/Algoritmo/Resultados" Component={ClassroomAlgorithmResults} />
          </Route>
          <Route exact path="/Main/Aulas/Horario/:id" Component={ClassroomSchedule} />
        </Route>
        <Route exact path="/Main/Materias" Component={Subject}>
          <Route exact path="/Main/Materias/Ver" Component={Subjects} />
          <Route exact path="/Main/Materias/Agregar" Component={AddSubjects} />
          <Route exact path="/Main/Materias/Editar/:id" Component={EditSubjects} />
        </Route>
        <Route exact path="/Main/Grupos/" Component={Group}>
          <Route exact path="/Main/Grupos/Ver" Component={Groups}  />
          <Route exact path="/Main/Grupos/Agregar" Component={AddGroups}  />
          <Route exact path="/Main/Grupos/Editar/:id" Component={EditGroups}  />
          <Route path="/Main/Grupos/Ver/Filtro/:fil" Component={Groups}  />
          <Route exact path="/Main/Grupos/Algoritmo" Component={GroupAlgorithm}>
              <Route exact path="/Main/Grupos/Algoritmo/Parametros" Component={GroupAlgorithmForm} />
              <Route exact path="/Main/Grupos/Algoritmo/Resultados" Component={GroupAlgorithmResults} />
              <Route exact path="/Main/Grupos/Algoritmo/Horario/:id" Component={GroupAlgorithmSchedule} />
          </Route>
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
        <Route exact path="/Main/Usuarios" Component={User}>
        <Route exact path="/Main/Usuarios/Ver" Component={Users} />
        <Route exact path="/Main/Usuarios/Editar/:id" Component={EditUsers} />
        <Route exact path="/Main/Usuarios/ReestrablecerContraseña" Component={ResetPasswordForm} />
        </Route>
        <Route exact path="/Main/Cuenta" Component={Account}>
          <Route exact path="/Main/Cuenta/Editar/:id" Component={EditAccounts} />
          <Route exact path="/Main/Cuenta/CambiarContraseña" Component={ChangePassword} />

        </Route>
      </Route>
     
    </Routes>
  );
}

export default App;
