import { type } from "@testing-library/user-event/dist/type";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./TodoStrike.css";

interface props {
  setToggleTodo: React.Dispatch<React.SetStateAction<boolean>>;
  formatedDate?: string;
}
interface itemsType {
  id: number;
  val: string;
}

const TodoStrike: React.FC<props> = ({ formatedDate, setToggleTodo }) => {
  const [txtContent, settxtContent] = useState("");
  // const [check, setCheck] = useState(false);
  const [ulLiItems, setUlLiItems] = useState<itemsType[]>([]);

  useEffect(() => {
    try {
      const responseLocal = JSON.parse( localStorage.getItem(formatedDate || "") || "" );
      if (responseLocal) {
        setUlLiItems(responseLocal);
      }
    } catch (error) {
      console.log('No data to be fetched......!')
    }
  }, [formatedDate]);


  const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setUlLiItems((prev) => [
        ...prev,
        { id: new Date().getTime(), val: txtContent },
      ]);
      const myArray = [
        ...ulLiItems,
        { id: new Date().getTime(), val: txtContent },
      ];

      formatedDate &&  localStorage.setItem(formatedDate || "", JSON.stringify(myArray));
      settxtContent('');
    }  

  const deleteItm = (item: itemsType) => {
    console.log("id", item.id);
    const filteredItems = ulLiItems.filter((x) => x.id !== item.id)
    formatedDate && localStorage.setItem(formatedDate, JSON.stringify(filteredItems));
    setUlLiItems(filteredItems)
    // console.log("items", ulLiItems);
  };


  return (
    <div className="todo-container">
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={txtContent} onChange={(e) => {settxtContent(e.target.value)}}/>
      </form>
        <ul>
          {ulLiItems.map((itm, k) => {
            const id = itm.id;
              return (
                <div key={k} className="todo-map">
                  <li> {itm.val} </li>
                  <button onClick={() => deleteItm(itm)}> Delete </button>
                </div>
              );
          })}
        </ul>
      <button onClick={() => setToggleTodo(false)} className="close-btn">
        X
      </button>
    </div>
  );
};

export default TodoStrike;
