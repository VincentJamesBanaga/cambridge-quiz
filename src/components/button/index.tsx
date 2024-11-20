import React, { type ReactNode, type ButtonHTMLAttributes } from "react";

// Style
import "./style.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...otherProps }) => {
  return (
    <button className="btn" {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
