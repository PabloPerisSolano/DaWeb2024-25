import { Outlet } from "react-router-dom";
import { Header } from "@/components/header/header";
import "./Layout.css";

export const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="content container">
        <Outlet />
      </main>
    </div>
  );
};
