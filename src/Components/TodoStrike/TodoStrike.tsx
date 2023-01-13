import { type } from "@testing-library/user-event/dist/type";
import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import "./TodoStrike.css";

interface props {
  // toggleTodo:boolean
  setToggleTodo: React.Dispatch<React.SetStateAction<boolean>>;
  // setgetlocal:React.Dispatch<React.SetStateAction<itemsType[]>>,
  // React.Dispatch<React.SetStateAction<boolean>>
  // setToggleTodo: (bool:boolean) => boolean,
  formatedDate?: string;
  // formatedDate:string
}
interface itemsType {
  id: number;
  // key?: string|undefined;
  val: string;
}

const TodoStrike: React.FC<props> = ({ formatedDate, setToggleTodo }) => {
  const [txtContent, settxtContent] = useState("");
  const [check, setCheck] = useState(false);
  const [ulLiItems, setUlLiItems] = useState<itemsType[]>([]);

  // console.log(setgetlocal);

  useEffect(() => {
    console.log(localStorage.getItem(`${formatedDate}`));

    try {
      const responseLocal = JSON.parse(
        localStorage.getItem(formatedDate || "") || ""
      );
      if (responseLocal) {
        setUlLiItems(responseLocal);
      }
    } catch (error) {
      // window.alert('Catch error block '+error)
      console.log("Catch error block " + error);
    }
  }, [formatedDate]);

  // const searchTodo = () => {
  //   try {
  //     const responseLocal = JSON.parse(
  //       localStorage.getItem(formatedDate || "") || "");
  //     if (responseLocal) {
  //       setUlLiItems(responseLocal);
  //     }
  //   } catch (error) {

  //     console.log("Catch error block " + error);
  //   }
  // };
  // const val = useCallback(() => {
  //   console.log(ulLiItems);

  //   formatedDate &&
  //     localStorage.setItem(formatedDate, JSON.stringify(ulLiItems));
  // }, [ulLiItems]);

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setUlLiItems((prev) => [
        ...prev,
        { id: new Date().getTime(), val: txtContent },
      ]);
      const myArray = [
        ...ulLiItems,
        { id: new Date().getTime(), val: txtContent },
      ];
      console.log("myArray",myArray);
      console.log("formatedDate",formatedDate);

      formatedDate && 
      localStorage.setItem(formatedDate || "", JSON.stringify(myArray));
      // settxtContent('');
    },
    [txtContent, ulLiItems]
  );

  // saveToLocal()

  const deleteItm = (item: itemsType) => {
    console.log("id", item.id);
    // console.log(id);
    // items.filter
    // console.log(items.splice(id,1));
    // localStorage.getItem(`formatedDate`)
    // setUlLiItems((prev) => prev.filter((x) => x.id !== item.id));
    const filteredItems=ulLiItems.filter((x) => x.id !== item.id)
    formatedDate && localStorage.setItem(formatedDate, JSON.stringify(filteredItems));
    setUlLiItems(filteredItems)
    // setItems(items)
    console.log("items", ulLiItems);
  };

  // searchTodo()

  return (
    <div className="todo-container">
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          value={txtContent}
          onChange={(e) => {
            settxtContent(e.target.value);
          }}
        />
      </form>

      <ul>
        {ulLiItems.map((itm, k) => {
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
      <button onClick={() => setToggleTodo(false)} className="close-btn">
        X
      </button>
      {/* <div className="btn-groups">
        <button onClick={saveTodo}>Save</button>
      </div> */}
    </div>
  );
};

export default TodoStrike;
