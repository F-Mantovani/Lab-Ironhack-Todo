import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "./UserContext";
import logo from "../assets/to-do-list.png";

function NavBar() {
  const user = useUser();
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "steelblue",
        padding: "0.5em",
      }}
    >
      <div style={{ maxWidth: "3rem" }}>
        <img src={logo} alt="To Do Logo" style={{ maxWidth: "100%" }} />
      </div>
      <div
        className="navigation-link"
        style={{
          color: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "0.5rem",
        }}
      >
        <NavLink
          to="todo"
          style={{
            textDecoration: "none",
            color: "#000",
          }}
        >
          To Do List
        </NavLink>
        {user && <NavLink to="profile"><p>Logged as: {user}</p></NavLink>}
      </div>
    </nav>
  );
}

export default NavBar;
