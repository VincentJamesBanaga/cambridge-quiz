import React, { type ReactNode } from "react";

// Style
import "./style.css";

interface Items {
  label: ReactNode;
  key: string | number;
}

type ListProps = {
  items: Items[];
};

const List: React.FC<ListProps> = ({ items }) => {
  return (
    <ul className="ls-ul">
      {items.map(({ label, key }) => (
        <li key={key}>{label}</li>
      ))}
    </ul>
  );
};

export default List;
