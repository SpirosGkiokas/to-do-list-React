import { useState} from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
    playSound("/submit.mp3");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
    playSound("/nice.mp3");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    playSound("/delete.mp3");
  };

  return (
    <div className="app">
      <div className="title">
        <h1>To Do List</h1>
      </div>

      <form className="entry" onSubmit={handleSubmit}>
        <input
          className="entryInput"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button className="entrySubmit" type="submit">
          Submit
        </button>
      </form>

      <ul className="taskList">
        {tasks.map((t) => (
          <li key={t.id} className="taskItem">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(t.id)}
            />
            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                marginLeft: "8px",
              }}
            >
              {t.text}
            </span>
            <button
              className="deleteButton"
              onClick={() => deleteTask(t.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;