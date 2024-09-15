import React, { useState } from "react";
import { usePasswordvalidate } from "../hooks/usePasswordvalidate";
import { Link, useNavigate } from "react-router-dom";
import Eyeclose from "../components/Eyeclose";
import Eyeopen from "../components/Eyeopen";
import {useDispatch} from 'react-redux';
import axios from "axios";
import { setProfile } from "../Redux/slices/profileSlice";

function Login() {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const [validEmail] = usePasswordvalidate({
    password: data.password,
    email: data.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      setData((prevData) => ({ ...prevData, error: "Enter required fields" }));
      return;
    }
    if (!validEmail) {
      setData((pre) => ({ ...pre, error: "email not valid" }));
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5416/api/user/login",
        { email: data.email, password: data.password },
        { withCredentials: true }                  
      );
      const {username,email} =response.data;
      dispatch(setProfile({username:username,email:email}));
      resetForm();
      alert("login successful");
      navigate("/");
    } catch (error) {
      handleErr(error);
    }
  };

  const resetForm = () => {
    setData({
      email: "",
      password: "",
      error: "",
    });
  };

  const handleErr = (error) => {
    let errMessage = "and error occurred";
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errMessage = "enter required fields";
          break;
        case 401:
          errMessage = "Invalid user!";
          break;
        default:
          errMessage = "something went wrong!";
      }
    }
    setError(errMessage);
  };

  const setError = (message) => {
    setData((pre) => ({ ...pre, error: message }));
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
          type="email"
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
