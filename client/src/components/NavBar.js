import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function NavBar({ items }) {
  return (
    <div className="navbar">
      <ul>
        {items.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NavBar;
