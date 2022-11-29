import React from "react";
import pen from "../images/pen.svg";
import trash from "../images/trash.svg";
import checked from "../images/checked.png";
import clock from "../images/clock.png";
import "./index.scss";
import { getCompletedEndDate } from "./getCompletedEndDate";

/**
 * Компонент отрисовки одной задачи
 * @param {object} todo - объект данных для заполнение задач  
 * @param {funtion} removeTask - функция для удаления задачи  
 * @return {React.Component} 
 */
const ToDo = ({ todo, removeTask, setEditTask }) => {
  return (
    <div className="todo">
      <div
        className={`todo__inner ${
          (todo.completed || getCompletedEndDate(todo.date)) &&
          "todo__inner--completed"
        }`}
      >
        <div className="todo__inner-box">
          {todo.completed || getCompletedEndDate(todo.date) ? (
            <img
              title="Задача завершена"
              src={checked}
              alt=""
              className="todo__icon"
            />
          ) : (
            <img
              title="Время ожидания"
              src={clock}
              alt=""
              className="todo__icon"
            />
          )}
          <div className="todo__inner-title">
            Заголовок:
            <div className="todo__inner-title__box">{todo.task}</div>
          </div>
        </div>

        <div className="todo__inner-text">
          Описание:
          <div className="todo__inner-text__box">{todo.description}</div>
        </div>
        <div className="todo__inner-files">
          Количество файлов: {todo.files?.length}
        </div>
        <div className="todo__inner-date">Конечная дата: {todo.date}</div>
      </div>
      <div className="todo__icons">
        <img
          onClick={() => setEditTask(todo)}
          src={pen}
          alt=""
          title="Редактировать задачу"
          className="todo__icon todo__icon-handler"
        />
        <img
          onClick={() => removeTask(todo.id)}
          src={trash}
          alt=""
          title="Удалить задачу"
          className="todo__icon todo__icon-handler"
        />
      </div>
    </div>
  );
};

export default ToDo;
