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
        <Button word="Sign in with Google" svg={google} />
        <Button word="Sign in with Apple" svg={github} />

        <div className="divide w-full flex gap-1 items-center ">
          <div className="line w-full h-[1px] dark:text-white dark:bg-white "></div>
          <div className="font-bold dark:text-white">or</div>
          <div className="line w-full h-[1px] dark:text-white dark:bg-white "></div>
        </div>

        <input
          type="text"
          placeholder="Phone, email, or username"
          className="w-full h-14 border border-1 border-slate-300 "
        />

        <button className=" bg-black dark:bg-white dark:text-black text-white w-full p-1 font-bold rounded-3xl">
          Next
        </button>

        <button className=" dark:bg-black dark:text-white bg-white text-black w-full p-1 font-bold border border-slate-300 rounded-3xl mb-10 ">
          Forgot password?
        </button>

        <p className="dark:text-white text-black">
          Don't have an account?{" "}
          <a href="#" className=" text-sky-600 ">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Form;
