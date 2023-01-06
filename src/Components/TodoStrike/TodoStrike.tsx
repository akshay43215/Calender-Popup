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
  // checked: boolean
}

const TodoStrike :React.FC<props>=({formatedDate})=> {
  const [txtContent, settxtContent] = useState('');
  const [check, setCheck] = useState(false);
  const [items, setItems] = useState<itemsType[]>([]);

  // const navigate=useNavigate(/);

  // const {idParam} = useParams()
  // console.log(typeof idParam);
  

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
    console.log(localStorage);
    
    if ('hello'){
      const responseLocal =JSON.parse((localStorage.getItem(formatedDate|| '')) ||'')
      // console.log(typeof responseLocal ,responseLocal);
      setItems(responseLocal)
      // console.log(JSON.parse(responseLocal))
      console.log(items);
    }else {
      window.alert('else part no local');
      
    }

    
      // const responseLocal =JSON.parse((localStorage.getItem(formatedDate|| '')) ||'')
      // console.log(typeof responseLocal ,responseLocal);
      // setItems(responseLocal)
      // // console.log(JSON.parse(responseLocal))
      // console.log(items);
    
    
    // console.log( localStorage.getItem(formatedDate|| "") )
    // console.log(responseLocal);
    
  }
  // console.log(txtContent);

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
