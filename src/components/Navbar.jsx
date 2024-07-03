import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="relative flex h-[10%] bg-slate-600">
        <NavLink to="" className="flex-1 ml-16 self-center text-white underline">Auth</NavLink>
      {/* <p className="flex-1 self-center">create</p> */}
        <NavLink to="/login" className="self-center h-12 text-white mr-16 px-6 py-3 hover:bg-blue-600 rounded-xl">login</NavLink>
      
    </nav>
  );
}

export default Navbar;
