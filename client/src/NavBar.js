import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
