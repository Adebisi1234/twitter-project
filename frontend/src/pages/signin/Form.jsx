import React, { useState } from "react";
import { Link } from "react-router-dom";

const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [handle, setHandle] = useState("");
  return (
    <div className="h-full dark:bg-black dark:text-black bg-white text-white">
      <div className=" mx-4 h-2/3 flex flex-col gap-4 my-14 ">
        <h1 className=" text-3xl dark:text-white font-bold mb-2">
          Join Clone today
        </h1>
        <div className="input handle border p-3">
          <label htmlFor="handle" className="block">
            handle:
          </label>
          <input
            value={handle}
            onChange={(e) => {
              setHandle(e.target.value);
            }}
            type="text"
            id="handle"
            name="handle"
            className="border-b w-full"
          />
        </div>
        <div className="input border p-3 username">
          <label htmlFor="username" className="block">
            username:
          </label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            id="username"
            name="username"
            className="border-b w-full"
          />
        </div>
        <div className="input border p-3 password">
          <label htmlFor="password" className="block">
            password:
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            name="password"
            className="border-b w-full"
          />
        </div>
        <div className="input border p-3 bio">
          <label htmlFor="bio" className="block">
            bio:
          </label>
          <input
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            type="text"
            id="bio"
            name="bio"
            className="border-b w-full"
          />
        </div>
        <Link to="/profile">
          <button className=" bg-black hover:!bg-[var(--button-primary)] hover:dark:!bg-[var(--button-primary)] dark:bg-white dark:text-black text-white w-full p-1 font-bold rounded-3xl">
            Create account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Form;
