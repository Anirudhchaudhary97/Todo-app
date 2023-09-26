import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editmode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState(null);

  // function for add todo when we click on add button

  const addToDo = () => {
    if (inputValue === "") {
      alert("write something to add");
    }
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  // function for delete when we click on delete

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // function for edit
  const editTodo = (id, text) => {
    setEditMode(true);
    setEditId(id);
    setEditValue(text);
  };

  // function for update when user edit
  const update = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, text: editValue };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditMode(false);
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className="todo-container">
      <h1>TODO LIST</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      {editmode ? (
        <div>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={update}>Update</button>
        </div>
      ) : (
        <button onClick={addToDo}>Add</button>
      )}

      {/* <button onClick={addToDo}>Add</button> */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}

            <div>
            <button onClick={() => deleteTodo(todo.id)} className="del-btn">
              Delete
            </button>
            <button
              onClick={() => editTodo(todo.id, todo.text)}
              className="edit-btn"
            >
              Edit
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
