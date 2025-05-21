import { Outlet } from "react-router-dom";
import Header from "@/components/Header/Header";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="content container">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
