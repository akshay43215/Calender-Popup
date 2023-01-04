import { useReducer } from "react";
import { useState } from "react";

export const ACTION = {
    ADD_TODO: "add-todo",
    DELET_TODO: "delete-todo",
  };
  
  const reducer = (todos:any, action:any) => {
    switch (action.type) {
      case ACTION.ADD_TODO:
        return [...todos, newTodo(action.payload.name)];
      case ACTION.DELET_TODO:
        return todos.filter((todo:any) => todo.id !== action.payload.id);
      default:
        return todos;
    }
  };
  const newTodo = (name:string) => {
    return { id: Date.now(), name: name, complete: false };
  };
  
  function TodoList() {
    const [todos, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState("");
  
    const handlesubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch({ type: ACTION.ADD_TODO, payload: { name: name } });
      setName("");
    };
    console.log(todos);
  
    return (
      <div className="App">
        <div>
          <h4>Add your List</h4>
  
          <form onSubmit={handlesubmit}>
            <input
              placeholder="Enter Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
  
          <div>
            <div style={{ marginTop: "50px" }}>
              {todos.map((todo:any, id:number) => {
                return <Todo key={id} todo={todo} dispatch={dispatch} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default TodoList;


  const Todo = (props:any) => {
    return (
      <div>
        <span style={{ color: props.todo.complete ? "red" : "#000" ,marginRight:10}}>{props.todo.name}</span>
          <button> delete </button>
      </div>
    );
  };