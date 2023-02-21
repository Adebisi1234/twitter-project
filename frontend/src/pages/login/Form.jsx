import React, { useState } from "react";
import Button from "../../components/Button";
import google from "../../assets/google.svg";
import github from "../../assets/github.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/userSlice";
import axios from "axios";
import HomePage from "../home/HomePage";
import Skeleton from "../../components/Skeleton";

const Form = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit");

    axios
      .post("https://twitterb.up.railway.app/auth/signin", {
        username: username,
        password: password,
      })
      .then((data) => {
        const details = data.data;
        dispatch(login(details));
      })

      .then(() => {
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return !Object.keys(user).length ? (
    <div className="w-full dark:bg-black overflow-hidden dark:text-white bg-white text-black">
      <div className=" mx-4 h-screen flex flex-col gap-4 my-36 ">
        <h1 className=" text-3xl text-black dark:text-white font-bold mb-2">
          Sign in to Clone
        </h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            placeholder="username"
            className="w-full pl-2 h-14 border border-1 border-slate-300 "
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
          <input
            type="password"
            placeholder="password"
            className="w-full pl-2 h-14 border border-1 border-slate-300 "
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />

          <button
            onClick={() => {
              document
                .getElementById("img")
                .classList.replace("hidden", "flex");
            }}
            type="submit"
            className=" bg-black hover:!bg-green-600 dark:bg-white dark:text-black text-white w-full p-1 font-bold rounded-3xl"
          >
            Next
          </button>
          <div className="h-7 w-7 hidden justify-center items-center" id="img">
            <Skeleton />
          </div>
        </form>

        <p className="dark:text-white text-black">
          Don't have an account?{" "}
          <Link to="/signin" className=" !text-green-600 ">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  ) : (
    <HomePage />
  );
};

export default Form;
