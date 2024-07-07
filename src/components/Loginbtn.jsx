import React from "react";
import { NavLink } from "react-router-dom";

function Loginbtn() {
  return (
    <NavLink
      to="/login"
      className="  text-white mr-16 px-6 py-3 hover:bg-blue-600 rounded-xl"
    >
      login
    </NavLink>
  );
}

export default Loginbtn;
