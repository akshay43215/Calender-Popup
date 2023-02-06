import Calender from "../Calender/Calender";
import { useState } from "react";
import TodoStrike from "../TodoStrike/TodoStrike";
import TodoTwo from "../TodoStrike/todoTwo";
import "./App.css";

const App = () => {
  const [currDate, setCurrDate] = useState(new Date());

  return (
    <div className="App">
      <Calender currDate={currDate} setCurrDate={setCurrDate} />
    </div>
  );
};

export default App;
