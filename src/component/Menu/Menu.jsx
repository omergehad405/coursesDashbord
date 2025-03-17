import React from "react";
import "./menu.css";
import { NavLink } from "react-router";
import { FaHome } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
function Menu() {
  return (
    <div className="sidebar">
      <h1>DashBoard</h1>
      <ul>
        <NavLink to="/">
          <FaHome />
          <span> Home</span>
        </NavLink>
        <NavLink to="/newCourse">
          <IoIosSettings />
          <span> Add Courses</span>
        </NavLink>
      </ul>
    </div>
  );
}

export default Menu;
