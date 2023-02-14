import React from "react";

const Form = () => {
  return (
    <div className="h-full dark:bg-black dark:text-black bg-white text-white">
      <div className=" mx-4 h-2/3 flex flex-col gap-4 my-36 ">
        <h1 className=" text-3xl dark:text-white font-bold mb-2">
          Join Clone today
        </h1>
        <div className="input handle border p-3">
          <label htmlFor="handle" className="block">
            handle:
          </label>
          <input type="text" id="handle" className="border-b w-full" />
        </div>
        <div className="input border p-3 username">
          <label htmlFor="username" className="block">
            username:
          </label>
          <input type="text" id="username" className="border-b w-full" />
        </div>
        <div className="input border p-3 password">
          <label htmlFor="password" className="block">
            password:
          </label>
          <input type="text" id="password" className="border-b w-full" />
        </div>
        <div className="input border p-3 bio">
          <label htmlFor="bio" className="block">
            bio:
          </label>
          <input type="text" id="bio" className="border-b w-full" />
        </div>

        <button className=" bg-black hover:!bg-[var(--button-primary)] hover:dark:!bg-[var(--button-primary)] dark:bg-white dark:text-black text-white w-full p-1 font-bold rounded-3xl">
          Create account
        </button>
      </div>
    </div>
  );
};

export default Form;
