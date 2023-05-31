import { Routes, Route } from "react-router-dom";
import Main from './views/Main'
import Classroom from "./views/Classroom";
import  Schedule from "./views/Schedule";



function App() {
  

  return (
    <Routes>
      <Route exact path="/" Component={Main}>
        <Route exact path="Aulas" Component={Classroom} />
        <Route exact path="Horario/:AulaId" Component={Schedule} />
      </Route>
    </Routes>
  );
}

export default App;