import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./TodoStrike.css";

interface props {
  //  toggleTodo?: boolean
      formatedDate?: string
  // formatedDate:string
}
interface itemsType {
  id: number;
  // key?: string|undefined;
  val: string;
}

const TodoStrike :React.FC<props>=({formatedDate})=> {
  const [txtContent, settxtContent] = useState('');
  const [check, setCheck] = useState(false);
  const [items, setItems] = useState<itemsType[]>([]);

  const formSub = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formatedDate);

    // const obj={ localKey: idParam, val: items };
    // localStorage.clear()
    // console.log("form fn", txtContent, "addclick");
    
    setItems([...items, { id: new Date().getTime() , val: txtContent }]);
    // console.log(localStorage.getItem('"14-01-2023"'));
    settxtContent('')
  };
  
  const deleteItm = (item: itemsType) => {
    // console.log(id);
    // items.filter
    // console.log(items.splice(id,1));
    // localStorage.getItem(`formatedDate`)
    console.log("id", item.id);
    console.log("items", items);
    
    setItems((prev) => prev.filter((x) => x.id !== item.id));
    // setItems(items)
  };

  const saveTodo =()=> {
    // navigate(`/`)
    // setToggleTodo(!toggleTodo)
    console.log(formatedDate);
    console.log(items);
    
    localStorage.setItem(formatedDate|| "",JSON.stringify(items))
    console.log('Todo save btn');
    
  }
  const searchTodo=()=> {
    
    try {
      const responseLocal =JSON.parse(localStorage.getItem(formatedDate||'')||'')
      if(responseLocal){
        setItems(responseLocal)
      }
    } catch (error) {
      window.alert('Catch error block'+error)
    }
    
      // const responseLocal =JSON.parse((localStorage.getItem(formatedDate|| '')) ||'')

      // const responseLocal =JSON.parse(localStorage.getItem(`"${formatedDate}"`)||'')
      // console.log(typeof responseLocal ,responseLocal);
      // console.log(responseLocal);
      
      // if(responseLocal){
      //   setItems(responseLocal)
      // }
      // console.log(JSON.parse(responseLocal))
      console.log(items);

  }
    return (
      <div className="todo-container">
        <form action="" onSubmit={formSub}>
          <input type="text" value={txtContent} onChange={(e) => { settxtContent(e.target.value) }} />
        </form>

        <ul>
          {items.map((itm, k) => {
            const id = itm.id;
            // console.log(check);
            
            return (
              <div key={k} className="todo-map">
                <li> {itm.val} </li>
                <button onClick={() => deleteItm(itm)}> Delete </button>
              </div>
            );
          })}
        </ul>
        <div className="btn-groups">
          <button onClick={searchTodo}>Search</button>
          <button onClick={saveTodo}>Save</button>
        </div>
        {/* <h3>{txtContent}</h3> */}
      </div>
    );
}

export default TodoStrike;
