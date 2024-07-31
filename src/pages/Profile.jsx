import React, { useEffect } from "react";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import jwtData from '../hooks/jwtData'

function Profile() {
  const { username, email, status, error } = useSelector(
    (state) => state.profile
  );
  useEffect(()=>{
    const data=jwtData();
  },[])

  return (
    <div className="flex-1 flex justify-center items-center h-full">
      <div>
        <p>{username}</p>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default Profile;
