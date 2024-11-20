import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-4/5 m-auto py-2 px-10 flex justify-between items-center shadow-sm rounded-b-lg">
      <NavLink to="/">
        <img src="student.jpeg" alt="student Logo" className="h-24" />
      </NavLink>
      
      <div className="px-10">
      <NavLink
        to="/add-student"
        className="w-1/12 py-2 px-3 rounded-lg bg-slate-400 text-center hover:bg-transparent hover:shadow-lg mx-3"
      >
        Add data
      </NavLink>

      <NavLink
        to="/login"
        className="w-1/12 py-2 px-3 rounded-lg bg-slate-300 text-center hover:bg-transparent hover:shadow-lg mx-3"
      >
        Login
      </NavLink>
      <NavLink
        to="/signup"
        className="w-1/12 py-2 px-3 rounded-lg bg-yellow-100 text-center hover:bg-transparent hover:shadow-lg mx-3"
      >
        SignUp
      </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
