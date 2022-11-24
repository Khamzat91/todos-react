import React from "react";
import "./index.scss";
import TodoForm from "./todoForm/TodoForm";
import ToDo from "./todo/ToDo";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [editTask, setEditTask] = React.useState(null);

  const addTask = (title, text, isCompleted, datetime, files) => {
    console.log(files);
    if (title) {
      const newItem = {
        id: Math.random().toString(36).substring(2, 9),
        task: title,
        description: text,
        date: datetime,
        completed: isCompleted,
        files,
      };
      setTodos((prev) => [...prev, newItem]);
    }
  };
  const removeTask = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (id === editTask.id) {
      setEditTask(null);
    }
  };

  const onEditTask = (title, text, isCompleted, datetime, files) => {
    const newList = todos.map((todo) => {
      if (todo.id === editTask.id) {
        todo.task = title;
        todo.description = text;
        todo.completed = isCompleted;
        todo.date = datetime;
        todo.files = files;
      }
      return todo;
    });
    setTodos(newList);
    setEditTask(null);
  };

  // const onFilter = () => {
  // setTodos(prev => prev.filter((i) => {
  //   if (condition) {

  //   }
  // }))
  // }

  return (
    <div className="app">
      <TodoForm addTask={addTask} editTask={editTask} onEditTask={onEditTask} />
      <div className={`app__inner ${todos.length && "border"} `}>
        {todos.map((todo) => {
          return (
            <ToDo
              key={todo.id}
              todo={todo}
              removeTask={removeTask}
              setEditTask={setEditTask}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
