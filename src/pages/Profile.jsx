import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const name = useSelector((state) => state.profile.username);
  const email = useSelector((state) => state.profile.email);
  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <p>name : {name}</p>
        <p>email : {email}</p>
      </div>
    </div>
  );
}

export default Profile;
