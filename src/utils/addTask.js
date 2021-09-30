const addTask = async (task) => {
  const id = Math.floor(Math.random() * 100000) + 1;

  const newTask = { id, ...task };

  await fetch("http://127.0.0.1:5000/tasks", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newTask),
  });
};

export default addTask;
