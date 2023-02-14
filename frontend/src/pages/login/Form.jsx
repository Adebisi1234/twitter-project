import React from "react";
import Button from "../../components/Button";
import google from "../../assets/google.svg";
import github from "../../assets/github.svg";

const Form = () => {
  return (
    <div className="w-full dark:bg-black overflow-hidden dark:text-white bg-white text-black">
      <div className=" mx-4 h-screen flex flex-col gap-4 my-36 ">
        <h1 className=" text-3xl text-black dark:text-white font-bold mb-2">
          Sign in to Clone
        </h1>
        <input
          type="text"
          placeholder="username"
          className="w-full pl-2 h-14 border border-1 border-slate-300 "
        />
        <input
          type="text"
          placeholder="password"
          className="w-full pl-2 h-14 border border-1 border-slate-300 "
        />

        <button className=" bg-black hover:!bg-green-600 dark:bg-white dark:text-black text-white w-full p-1 font-bold rounded-3xl">
          Next
        </button>

        <p className="dark:text-white text-black">
          Don't have an account?{" "}
          <a href="#" className=" !text-green-600 ">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Form;
