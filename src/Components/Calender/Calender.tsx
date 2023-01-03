
import { add, differenceInDays, endOfMonth, setDate, startOfMonth, sub } from 'date-fns';
import { format } from 'date-fns/esm';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import './Calender.css'
import TodoStrike from '../TodoStrike/TodoStrike';

interface Props {
  currDate?: Date ;
  onChangeFn: (currDate:Date)=> void 
}

const Calender : React.FC<Props> = ({currDate= new Date(),onChangeFn})=> {
  
  const navigate=useNavigate();
  const [isCurrent, setIsCurrent] = useState(false)
  // console.log(currDate,'val');

  const startDate =startOfMonth(currDate)
  const endDate =endOfMonth(currDate)
  const numDays = differenceInDays(endDate , startDate)+1
  const prefixDays = startDate.getDay()
  const sufixDays = 6-endDate.getDay()

  const preMonth = ()=> onChangeFn(sub(currDate,{months:1}))
  const nextMonth= ()=> onChangeFn(add(currDate,{months:1}))
  
  const preYear = ()=> onChangeFn(sub(currDate,{years:1}))
  const nextYear= ()=> onChangeFn(add(currDate,{years:1}))

  const handleClickDate = (index:number)=> {
    const date = setDate(currDate,index);
    const formatedDate =format(date,'dd-MM-yyyy')
    console.log (formatedDate,'onclicking formatted date');
    console.log (date,'onclicking date');
    
    onChangeFn(date)
    navigate(`/todo/${formatedDate}`)
  }

  // console.log(prefixDays , sufixDays);
  // console.log(startDate,endDate,numDays);
  

  return (
    <div className="wrapper">
      <header>
          <span onClick={preYear} id="prev" className="material-symbols-rounded">chevron_left</span>
          <span onClick={nextYear} id="next" className="material-symbols-rounded">chevron_right</span>
        <p className="current-date">{format(currDate,"dd LLLL yyyy")}</p>
        <div className="icons">
          <span onClick={preMonth} id="prev" className="material-symbols-rounded">chevron_left</span>
          <span onClick={nextMonth} id="next" className="material-symbols-rounded">chevron_right</span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>

        <ul className="days">
          {
            Array.from({length:prefixDays}).map((val,idx)=> {
              return <li key={idx}></li>
            })
          }
          {
            Array.from({length:numDays}).map((val,idx)=> {
              const date =idx+1;
               date===currDate.getDate() && console.log('current date highlight',date);
               
              // console.log(val,idx,date);
              
              return(
                <li key={date} onClick={()=>handleClickDate(date)}> {date} </li>
              )
            })
          }
          {
            Array.from({length:sufixDays}).map((val,idx)=> {
              return <li key={idx}></li>
            })
          }
        </ul>
        
      </div>
      <TodoStrike/>
    </div>
  )
}

export default Calender