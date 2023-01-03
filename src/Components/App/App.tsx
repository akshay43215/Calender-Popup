import Calender from "../Calender/Calender";
import {Routes,Route} from "react-router-dom";
import { useState } from "react";
import TodoStrike from "../TodoStrike/TodoStrike";
import "./App.css";

const App = () => {
  const [currDate, setCurrDate] = useState(new Date());

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Calender currDate={currDate} onChangeFn={setCurrDate} />} />
        <Route path='/todo/:id' element={<TodoStrike/>} />
      </Routes>
    </div>
  );
};

export default App;
