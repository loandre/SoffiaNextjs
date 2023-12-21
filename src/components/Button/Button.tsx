import React from "react";
import * as C from "./styles";

type ButtonProps = {
  text: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button" }) => {
  return (
    <C.Button type={type} onClick={onClick}>
      {text}
    </C.Button>
  );
};

export default Button;
