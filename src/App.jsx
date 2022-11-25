import React from "react";
import "./index.scss";
import TodoForm from "./todoForm/TodoForm";
import ToDo from "./todo/ToDo";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [editTask, setEditTask] = React.useState(null);

  const getTask = async () => {
    try {
      const response = await fetch(
        `https://613a6e0e1fcce10017e78ec4.mockapi.io/tasks`
      );
      if (!response.ok) {
        Error("произошла ошибка");
      }
      const result = await response.json();
      setTodos(result);
    } catch (error) {
      console.error();
    }
  };

  const addTask = async (title, text, isCompleted, datetime, files) => {
    if (title) {
      const newItem = {
        task: title,
        description: text,
        date: datetime,
        completed: isCompleted,
        files
      };
      try {
        const response = await fetch(
          `https://613a6e0e1fcce10017e78ec4.mockapi.io/tasks`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(newItem),
          }
        );
        if (!response.ok) {
          Error("произошла ошибка");
        }
        getTask();
      } catch (error) {
        console.error();
      }
    }
  };


  const removeTask = async (id) => {
    try {
      const response = await fetch(
        `https://613a6e0e1fcce10017e78ec4.mockapi.io/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        Error("произошла ошибка");
      }
      getTask();
      if (id === editTask.id) {
        setEditTask(null);
      }
    } catch (error) {
      console.error();
    }
  };

  React.useEffect(() => {
    getTask();
  }, []);

  const onEditTask = async (title, text, isCompleted, datetime, files) => {
    const newItem = {
      task: title,
      description: text,
      completed: isCompleted,
      date: datetime,
      files: files,
    };
    try {
      console.log(JSON.stringify(newItem), newItem);
      const response = await fetch(
        `https://613a6e0e1fcce10017e78ec4.mockapi.io/tasks/${editTask.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );
      if (!response.ok) {
        Error("произошла ошибка");
      }
      getTask();
      setEditTask(null);
    } catch (error) {
      console.error();
    }
  };

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
