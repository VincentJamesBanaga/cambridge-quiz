import React, { type CSSProperties, type ReactNode } from "react";

// Style
import "./style.css";

type TextProps = {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

const Text: React.FC<TextProps> = ({ className, children, style }) => {
  return (
    <span style={style} className={className}>
      {children}
    </span>
  );
};

export default Text;
