import React, { useContext } from "react";
import DrawingBoard from "react-drawing-board";
import { UserContext } from "../App";

const Draw = ({ handleDrawChange, operations }) => {
  const {
    loggedInUser: { email },
  } = useContext(UserContext);

  return (
    <DrawingBoard
      userId={email}
      operations={operations}
      onChange={handleDrawChange}
      clsssName="boarding"
    />
  );
};

export default Draw;
