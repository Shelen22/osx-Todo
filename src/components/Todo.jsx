import react from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodoSuccess,
  addTodo,
  getTodoSuccess,
  getTodoLoading,
  getTodoError,
  removeTodo,
  editTask,
} from "../todofeature/action";

function Todo() {
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [updatedtext, setUpdatedText] = useState("");
  const [updateid, setUpdateID] = useState(-1);
  const { loading, todos, error } = useSelector((state) => ({
    loading: state.loading,
    todos: state.todo,
    error: state.error,
  }));
  const dispatch = useDispatch();
  const handleinput = (e) => {
    setText(e.target.value);
  };

  const handlesubmit = () => {
    let ids = new Date().valueOf();
    let status = "Incomplete";
    if(text !== ""){
        dispatch(addTodo({ text, ids, status }));
        setText("")
    }
  };

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };
  const handleEditTask = (e) => {
    setUpdatedText(e.target.value);
  };
  const handleupdate = () => {
    setEdit(false);
    dispatch(editTask(updateid, updatedtext));
  };
  const handleedited = (id) => {
    setEdit(true);
    setUpdateID(id);
  };

  return (
    <div>
      {edit ? (
        <div>
          <input
            type="text"
            placeholder="Edit Task..."
            onChange={handleEditTask}
          />
          <button onClick={handleupdate}>Update</button>
        </div>
      ) :  <div><input type="text" placeholder="Enter Here..." onChange={handleinput} value = {text} />
      <button onClick={handlesubmit}>Add Todo</button></div>}
      <table  style={{ display: "flex", justifyContent: "center" }}>
        <tbody>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Action</th>
          </tr>
          {todos.map((e) => (
            <tr key={e.ids}>
              <td>{e.text}</td>
              {e.status == "Completed" ? <td>Done</td> : <td>Not done</td> }
                
              <td onClick={() => handleedited(e.ids)}><button style={{color:"blue",border:"none", background: "white", fontSize:"17px"}}>Edit</button></td>
              <td onClick={() => handleDelete(e.ids)}>
                <img src="https://img.icons8.com/metro/26/fa314a/multiply.png" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Todo;
