import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePasswordvalidate } from "../hooks/usePasswordvalidate";
import axios from "axios";
import Tick from "../components/Tick";
import Cross from "../components/Cross";
import Eyeclose from "../components/Eyeclose";
import Eyeopen from "../components/Eyeopen";

function Signup() {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  const [
    validLength,
    hasNumber,
    uppercase,
    lowercase,
    hasSpecial,
    validEmail,
    confirm,
  ] = usePasswordvalidate({
    password: data.password,
    email: data.email,
    confirmpass: data.confirmPassword,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!data.email || !data.password || !data.confirmPassword || !validEmail) {
      setData((prevData) => ({ ...prevData, error: "Enter required fields" }));
      return;
    }
    if (!confirm) {
      setData((prevData) => ({ ...prevData, error: "Passwords didn't match" }));
      return;
    }
    try {
      const response = await axios.post("http://localhost:5416/api/user/", {
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmPassword,
      });
      alert("account created");
      setData({
        email: "",
        password: "",
        confirmPassword: "",
        error: "",
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setData((prevData) => ({...prevData,error: "enter required fields",}));
        } else if (error.response.status == 401) {
          setData((prevData) => ({ ...prevData, error: "already a user" }));
        } else if (error.response.status === 402) {
          setData((prevData) => ({ ...prevData, error: "Passwords mismatch" }));
        } else {
          setData((prevData) => ({ ...prevData, error: "something wrong" }));
        }
      } else {
        setData((prevData) => ({ ...prevData, error: "an error occurred" }));
      }
    }

    // console.log("all good");
    // setData(data=>({...data,error:""}));
    // navigate('/');
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center ">
      <p className="text-sm text-red-400">{data.error}</p>
      <form
        className="flex relative flex-col  w-[30%] gap-2  "
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">email</label>
        <div className="flex justify-center items-center">
          <input
            className="text-black h-fit w-full"
            type="text"
            name="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <div className="absolute right-1">
            {data.email ? validEmail ? <Tick /> : <Cross /> : ""}
          </div>
        </div>
        <label htmlFor="password">password</label>
        <div className="relative flex justify-center items-center">
          <input
            className="text-black h-fit w-full"
            type={eye ? "txt" : "password"}
            name="password"
            id="password"
            value={data.password}
            onChange={handleChange}
            autoComplete="off"
          />
          <div className="absolute gap-1  right-1 flex">
            <span onClick={() => setEye((eye) => !eye)}>
              {eye ? <Eyeopen /> : <Eyeclose />}
            </span>
            {validLength &&
              hasNumber &&
              uppercase &&
              lowercase &&
              hasSpecial && <Tick />}
          </div>
        </div>
        {data.password &&
          !(
            hasNumber &&
            uppercase &&
            lowercase &&
            hasSpecial &&
            validLength
          ) && (
            <p className="text-xs">
              <span className={uppercase ? "text-green-400" : "text-red-400"}>
                Uppercase
              </span>
              ,
              <span className={lowercase ? "text-green-400" : "text-red-400"}>
                {" "}
                Lowercase
              </span>
              ,
              <span className={hasNumber ? "text-green-400" : "text-red-400"}>
                {" "}
                Number
              </span>
              ,
              <span className={hasSpecial ? "text-green-400" : "text-red-400"}>
                {" "}
                Special Character
              </span>
              ,
              <span className={validLength ? "text-green-400" : "text-red-400"}>
                {" "}
                Minimum length 8
              </span>
            </p>
          )}
        {validLength && hasNumber && uppercase && lowercase && hasSpecial && (
          <>
            <label htmlFor="password">confirm Password</label>
            <div className="flex justify-center items-center">
              <input
                className="text-black h-fit w-full"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                autoComplete="off"
              />
              <div className="absolute right-1">
                {confirm && data.confirmPassword ? <Tick /> : <Cross />}
              </div>
            </div>
          </>
        )}
        <button className="p-4 bg-blue-600 w-fit h-fit self-end">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signup;
