import React from "react";
import { NavLink } from "react-router-dom";

function Signoutbtn() {
  return (
    <NavLink
      to="/"
      className="  text-white mr-12 px-6 py-3 hover:bg-blue-600 rounded-xl"
    >
      Sign out
    </NavLink>
  );
}

export default Signoutbtn;
