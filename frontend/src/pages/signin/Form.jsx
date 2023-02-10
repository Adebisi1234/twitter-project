import React from "react";
import Button from "../../components/Button";
import google from "../../assets/google.svg";
import github from "../../assets/github.svg";

const Form = () => {
  return (
    <div className="h-full dark:bg-black dark:text-black bg-white text-white">
      <div className=" mx-4 h-2/3 flex flex-col gap-4 my-36 ">
        <h1 className=" text-3xl dark:text-white font-bold mb-2">
          Join Clone today
        </h1>
        <Button word="Sign in with Google" svg={google} />
        <Button word="Sign in with Github" svg={github} />

        <div className="divide w-full flex gap-1 items-center ">
          <div className="line w-full h-[1px] bg-slate-700 "></div>
          <div className="font-bold dark:text-white">or</div>
          <div className="line w-full h-[1px] bg-slate-700 "></div>
        </div>

        <button className=" bg-black dark:bg-white dark:text-black text-white w-full p-1 font-bold rounded-3xl">
          Create account
        </button>
        <p className="mb-10 dark:text-white">
          By signing up, you agree to our terms and conditions
        </p>

        <p className="dark:text-white">
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
