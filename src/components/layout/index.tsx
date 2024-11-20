import React, { type ReactNode } from "react";

// Style
import "./style.css";

type LayoutProps = {
  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ header, children, footer }) => {
  return (
    <main className="ly-main">
      <header>{header}</header>
      <section>{children}</section>
      <footer>{footer}</footer>
    </main>
  );
};

export default Layout;
