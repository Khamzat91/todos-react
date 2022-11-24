import React from "react";
import pen from "../images/pen.svg";
import trash from "../images/trash.svg";
import checked from "../images/checked.png";
import clock from "../images/clock.png";
import "./index.scss";
import { getCompletedEndDate } from "./getCompletedEndDate";

const ToDo = ({ todo, removeTask, setEditTask }) => {
  console.log(todo);
  return (
    <div className="todo">
      <div className={`todo__inner ${(todo.completed || getCompletedEndDate(todo.date)) && 'todo__inner--completed'}`}>
        <div className="todo__inner-box">
          {todo.completed || getCompletedEndDate(todo.date) ? (
            <img src={checked} alt="" className="todo__icon" />
          ) : (
            <img src={clock} alt="" className="todo__icon" />
          )}
          <div className="todo__inner-title">{todo.task}</div>
        </div>
        <div className="todo__inner-text">{todo.description}</div>
        <div className="todo__inner-files">Количество файлов:{todo.files?.length}</div>
        <div className="todo__inner-date">{todo.date}</div>
      </div>
      <div className="todo__icons">
        <img
          onClick={() => setEditTask(todo)}
          src={pen}
          alt=""
          className="todo__icon todo__icon-handler"
        />
        <img
          onClick={() => removeTask(todo.id)}
          src={trash}
          alt=""
          className="todo__icon todo__icon-handler"
        />
      </div>
    </div>
  );
};

export default ToDo;
