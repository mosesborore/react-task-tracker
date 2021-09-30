import { useState } from "react";
import addTask from "../utils/addTask";

function AddTaskForm() {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add task name");
      return;
    }

    addTask({ text, day, reminder });

    setText("");
    setDay("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="add task name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="date"
          className="form-control"
          placeholder="Day & Time"
          value={day}
          onChange={(e) => {
            setDay(e.target.value);
          }}
        ></input>
      </div>
      <div className="form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => {
            setReminder(e.currentTarget.checked);
          }}
        ></input>
      </div>

      <input className="btn btn-block" type="submit" value="Submit"></input>
    </form>
  );
}

export default AddTaskForm;
