import React, { useState } from "react";
import { usePasswordvalidate } from "../hooks/usePasswordvalidate";
import { Link } from "react-router-dom";
import Eyeclose from "../components/Eyeclose";
import Eyeopen from "../components/Eyeopen";

function Login() {
  const [eye, setEye] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const [
    validEmail,
  ] = usePasswordvalidate({
    password: data.password,
    email: data.email,
    confirmpass: data.confirmPassword,
  });
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email ||!data.password ) {
      setData(prevData => ({...prevData, error: "Enter required fields" }));
      return;
    }
    if (!validEmail) {
      setData((pre) => ({ ...pre, error: "email not valid" }));
      return;
    }
    console.log("done");
    setData(data=>({...data,error:""}));
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <span className="text-sm text-red-400">{data.error}</span>
      <form
        onSubmit={handleSubmit}
        action=""
        className="relative flex flex-col w-[30%] gap-2 "
      >
        <label htmlFor="email">username</label>
        <input
          type="text"
          id="email"
          name="email"
          value={data.email}
          className="text-black"
          onChange={handleChange}
          autoComplete="email"
        />
        <label htmlFor="password">password</label>
        <div className="relative flex justify-center items-center">
          <input
            type={eye ? "text" : "password"}
            id="password"
            name="password"
            value={data.password}
            className="text-black w-full"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <span
            className="absolute right-1"
            onClick={() => setEye((eye) => !eye)}
          >
            {eye ? <Eyeopen /> : <Eyeclose />}
          </span>
        </div>
        <div className="flex justify-between">
          <Link to="/register" className="p-4">
            Sign up
          </Link>
          <button className="w-fit h-fit px-5 py-3  bg-blue-600 ">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
