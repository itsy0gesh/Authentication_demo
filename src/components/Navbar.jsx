import React from "react";
import Loginbtn from './Loginbtn';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar() {
  const tabs = useSelector((state) => state.navbar.tabs);
  const username = useSelector((state)=> state.profile.username);

  return (
    <nav className="relative flex h-[10%] bg-slate-600">
      <NavLink to="" className="flex-1 ml-16 self-center text-white underline">
        Auth
      </NavLink>
      <div className="flex-1 flex gap-3 items-center justify-end">
        {tabs.map((tab, index) => (
          <NavLink
            key={index}
            to={`/${tab.toLowerCase().replace(/\s+/g, "-")}`}
            className="   text-white p-3 "
          >
            {tab}
          </NavLink>
        ))}
        {username ? <NavLink to="/profile" className="text-white mr-12 rounded-md border p-2"><span>{username}</span></NavLink> : <Loginbtn/> }
      </div>
    </nav>
  );
}

export default Navbar;
