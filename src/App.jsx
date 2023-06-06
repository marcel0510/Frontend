import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Main from './views/Main'
import Classroom from "./views/Classroom";
import Schedule from "./views/Schedule";

import './App.css';


function App() {
  

  return (
    <Routes>
      <Route exact path="/" Component={Login} /> 
      <Route exact path="/Main" Component={Main}>
        <Route exact path="Aulas" Component={Classroom} />
        <Route exact path="Horario/:AulaId" Component={Schedule} />
      </Route>
    </Routes>
  );
}

export default App;