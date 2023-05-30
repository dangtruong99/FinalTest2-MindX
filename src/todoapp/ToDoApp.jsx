import React, { useState } from "react";
import "./ToDoApp.css";
import { NavLink } from "react-router-dom";

function ToDoApp() {
  const storageDo = JSON.parse(localStorage.getItem("toDos"));
  const [toDos, setToDo] = useState(storageDo ?? []);
  const [toAdd, setToAdd] = useState("");

  const handleSubmit = () => {
    setToDo((prev) => {
      const newDo = [...prev, toAdd];
      const jsonNewDo = JSON.stringify(newDo);
      localStorage.setItem("toDos", jsonNewDo);
      return newDo;
    });
    setToAdd("");
  };

  const handleDelete = (index) => {
    const newDos = [...toDos];
    newDos.splice(index, 1);
    setToDo(newDos);
    const removeDos = JSON.stringify(newDos);
    localStorage.setItem("toDos", removeDos);
    localStorage.removeItem("toDos[]");
    setToAdd("");
  };
  // const handleDeleteTask = (index) => {
  //   const newTasks = [...tasks];
  //   newTasks.splice(index, 1);
  //   setTasks(newTasks);
  //   const removeTasks = JSON.stringify(newTasks);
  //   localStorage.setItem("tasks", removeTasks);
  //   localStorage.removeItem("tasks[]");
  // };

  const deleteAll = () => {
    setToDo(() => []);
    setToAdd("");
  };
  return (
    <>
      <div className="container">
        <h1>TO DO LIST</h1>
        <header>
          <NavLink style={{ margin: 15 }} to="/All">
            All
          </NavLink>
          <NavLink style={{ margin: 15 }} to="/Active">
            Active
          </NavLink>
          <NavLink style={{ margin: 15 }} to="/Complete">
            Complete
          </NavLink>
        </header>
        <div className="list-jobs">
          <input
            type="text"
            placeholder="Add your jobs"
            value={toAdd}
            onChange={(e) => setToAdd(e.target.value)}
          />
          <button onClick={handleSubmit}>Add</button>
        </div>
        <ul>
          {toDos.map((toDo, index) => (
            <li key={index}>
              <input type="checkbox"></input>
              {toDo}
              <button className="delete" onClick={handleDelete}>
                Delete
              </button>
            </li>
          ))}
          <button onClick={deleteAll}>Delete All</button>
        </ul>
      </div>
    </>
  );
}

export default ToDoApp;
