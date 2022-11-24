import React, { useRef } from "react";
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
  console.log(files);

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

  const clearFiles = () => {
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
    //изменить название классов
    <div className="todo-list">
      <form onSubmit={handleSubmit} className="todo-list__inner">
        <div className="todo-list__inner-box">
          <label className="todo-list__inner-checked">
            <input
              checked={isCompleted}
              onChange={handleCompleted}
              type="checkbox"
            />
          </label>
          <label className="todo-list__inner-title">
            <input
              value={title}
              onChange={handleChangeTitle}
              type="text"
              placeholder="Введите текст задачи..."
            />
          </label>
          <button className="todo-list__inner-btn">
            {editTask ? "Изменить" : "Добавить"}
          </button>
        </div>
        <label className="todo-list__inner-text">
          <textarea
            value={text}
            onChange={handleChangeText}
            type="text"
            placeholder="Введите описание задачи..."
          />
        </label>
        <label className="todo-list__inner-date">
          <input
            value={datetime}
            onChange={handleChangeDate}
            type="datetime-local"
          />
        </label>
        <label className="todo-list__inner-file">
          <input ref={fileRef} onChange={handleChangeFile} type="file" />
          Выбранные файлы: {files.length} 
        </label>
      </form>
    </div>
  );
};

export default TodoForm;
