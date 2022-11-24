import React, { useRef } from "react";
import xbutton from "../images/x-button.png";
import "./index.scss";

const TodoForm = ({ addTask, editTask, onEditTask }) => {
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [datetime, setDatetime] = React.useState(
    new Date().toLocaleDateString("ru-Ru", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );
  const fileRef = useRef();


  const handleCompleted = (e) => {
    setIsCompleted(e.target.checked);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);

  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDatetime(e.target.value);
  };
  const handleChangeFile = (e) => {
    setFiles(e.target.files);
  };

  const clearFiles = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setFiles([])
    fileRef.current.value = "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTask) {
      onEditTask(title, text, isCompleted, datetime, files);
    } else {
      addTask(title, text, isCompleted, datetime, files);
    }
    setTitle("");
    setText("");
    setIsCompleted(false);
    setDatetime(false);
    setFiles([])
  };

  React.useEffect(() => {
    if (editTask) {
      setTitle(editTask?.task);
      setIsCompleted(editTask?.completed);
      setText(editTask?.description);
      setDatetime(editTask?.date);
    }
  }, [editTask]);

  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit} className="todo-form__inner">
        <div className="todo-form__inner-box">
          <label className="todo-form__inner-checked">
            <input
              checked={isCompleted}
              onChange={handleCompleted}
              type="checkbox"
            />
          </label>
          <label className="todo-form__inner-title">
            <input
              value={title}
              onChange={handleChangeTitle}
              type="text"
              placeholder="Введите заголовок задачи..."
            />
          </label>
          <button className="todo-form__inner-btn">
            {editTask ? "Изменить" : "Добавить"}
          </button>
        </div>
        <label className="todo-form__inner-text">
          <textarea
            value={text}
            onChange={handleChangeText}
            type="text"
            placeholder="Введите описание задачи..."
          />
        </label>
        <label className="todo-form__inner-date">
          <input
            value={datetime}
            onChange={handleChangeDate}
            type="datetime-local"
          />
        </label>
        <label className="todo-form__inner-file">
          <input ref={fileRef} onChange={handleChangeFile} type="file" />
          Выбранные файлы: {files.length} 
          {!!files.length && <img onClick={clearFiles} className="todo-form__inner-icon" src={xbutton} alt="" />}
        </label>
      </form>
    </div>
  );
};

export default TodoForm;
