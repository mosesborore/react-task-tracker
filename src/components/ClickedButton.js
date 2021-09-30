import Button from "./Button";
import { useState } from "react";

const ClickedButton = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <Button
        color={clicked ? "red" : "steelblue"}
        text={clicked ? "You have clicked me" : "You haven't clicked me"}
        onClick={() => setClicked(!clicked)}
      />
    </div>
  );
};

export default ClickedButton;
