
import { add, differenceInDays, endOfMonth, setDate, startOfMonth, sub } from 'date-fns';
import { format } from 'date-fns/esm';
import React, { useState } from 'react';
import TodoStrike from '../TodoStrike/TodoStrike';
import './Calender.css'

interface Props {
  currDate?: Date ;
  onChangeFn: (currDate:Date)=> void 
}

interface itemsType {
  id: number;
  val: string;
  // key?: string|undefined;
}

const Calender : React.FC<Props> = ({currDate= new Date(),onChangeFn})=> {
  
  const [toggleTodo, setToggleTodo] = useState(false)
  const [formatedDate, setFormatedDate] = useState('')
  const [getlocal, setgetlocal] = useState<itemsType[]>([])
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
    // console.log(date);
    
    setToggleTodo(!toggleTodo)
    const formatedDate =format(date,'dd-MM-yyyy')
    setFormatedDate(formatedDate)
    // console.log (formatedDate,'onclicking formatted date');
    // console.log (date,'onclicking date');
    // try{
    // const responseLocal =JSON.parse(localStorage.getItem(formatedDate||'')||'')
    //   if(responseLocal){
    //     setgetlocal(responseLocal)
    //   }
    // } catch (error) {
    //   // window.alert('Catch error block '+error)
    //   console.log('Catch error block '+error)
    // }
    
    onChangeFn(date)
  }
// const setToggleTodo=(val:boolean)=>{
//   console.log('toggletodo',val);
// }
  // console.log(prefixDays , sufixDays);
  // console.log(startDate,endDate,numDays);
  

  return (
    <div className="wrapper">
      <header>
      <div className="icons">
          <span onClick={preYear} id="prev" className="material-symbols-rounded">chevron_left</span>
          <span onClick={nextYear} id="next" className="material-symbols-rounded">chevron_right</span>
        <p className="current-date">{format(currDate,"dd LLLL yyyy")}</p>
        </div>
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
              return <li key={idx} className='inactive'></li>
            })
          }
          {
            Array.from({length:numDays}).map((val,idx)=> {
              const day =idx+1;
              let clasVal
               day===currDate.getDate()? clasVal='active': clasVal=''
              // console.log(val,idx,date);
              return(
                <li key={day} onClick={()=>handleClickDate(day)} className={clasVal}> {day} </li>
              )
            })
          }
          {
            Array.from({length:sufixDays}).map((val,idx)=> {
              return <li key={idx} className='inactive'></li>
            })
          }
        </ul>
        
      </div>
      {toggleTodo && <TodoStrike formatedDate={formatedDate} setToggleTodo={setToggleTodo}  />}
      {/* toggleTodo={toggleTodo} setToggleTodo={setToggleTodo}  */}
    </div>
  )
}

export default Calender