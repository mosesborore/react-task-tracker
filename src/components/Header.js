import Button from "./Button";

function Header({ onAddForm, showAddTask }) {
  return (
    <div>
      <header className="header">
        <h1>Task Tracker</h1>
        <Button
          color={showAddTask ? "red" : "steelblue"}
          text={showAddTask ? "Close" : "Add"}
          onClick={onAddForm}
        ></Button>
      </header>
    </div>
  );
}

export default Header;
