import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-7 bg-slate-400 h-20">
      <NavLink to="/">
        <img
          src="employee.png"
          alt=""
          className="h-16 rounded-full cursor-pointer"
        />
      </NavLink>

      <NavLink
        to="/create"
        className="p-3 w-1/12 bg-white rounded-xl hover:bg-slate-600 hover:text-white"
      >
        Create Employee
      </NavLink>
    </div>
  );
};

export default Navbar;
