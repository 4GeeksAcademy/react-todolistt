import React, { useState } from "react";
import "../../styles/App.css";

function TodoItem({ task, toggleTask, deleteTask }) {
  return (
    <div className="todo-item">
      <span 
        className={task.completed ? "completed" : ""} 
        onClick={() => toggleTask(task.id)}
      >
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)}>X</button>
    </div>
  );
}

function TodoList({ tasks, toggleTask, deleteTask }) {
  return (
    <div className="todo-list">
      {tasks.map(task => (
        <TodoItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
      ))}
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Lista de tareas</h1>
      <div className="input-container">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Nueva tarea..." 
        />
        <button onClick={addTask}>Agregar</button>
      </div>
      <TodoList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;