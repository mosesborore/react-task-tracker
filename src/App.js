import { useState, useEffect } from "react";
import Header from "./components/Header";
import ClickedButton from "./components/ClickedButton";
import Tasks from "./components/Tasks";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  const defaultUrl = "http://127.0.0.1:5000/tasks";
  const APICALLDELAYDURATION = 1500;

  const [tasks, setTasks] = useState([]);

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      // fetch all tasks
      fetch(defaultUrl)
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the Tasks");
          }
          return res.json();
        })
        .then((data) => {
          setTasks(data.tasks);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, APICALLDELAYDURATION);
    // clean up timeout
    return () => clearInterval(timeOut);
  }, [tasks]);

  // fetch a single task
  const fetchTask = async (id) => {
    try {
      const res = await fetch(`${defaultUrl}/${id}`);
      const data = await res.json();

      return data;
    } catch (e) {
      console.log("Error", e);
    }
  };

  // delete task
  const deleteTask = async (id) => {
    await fetch(`${defaultUrl}/${id}`, {
      method: "DELETE",
    });
    // filter tasks with id other than the parameter one
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    // send the updated task
    // PUT methods
    const res = await fetch(`${defaultUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !data.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <ClickedButton />
      <Header
        onAddForm={() => setShowAddTaskForm(!showAddTaskForm)}
        showAddTask={showAddTaskForm}
      />
      {showAddTaskForm && <AddTaskForm />}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {isPending && (
        <div style={{ color: "green" }}>Loading tasks from server...</div>
      )}

      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No tasks to show. Please add some"
      )}
    </div>
  );
}

export default App;
