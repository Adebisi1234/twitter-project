import React from "react";
import Header from "../../../components/Header";

const step3 = () => {
  return (
    <>
      <Header title="Step 3 of 5" />

      <div className="main">
        <h1>Create your account</h1>

        <input type="text" name="username" />
        <input type="text" name="email" />
        <input type="text" name="password" />
      </div>

      <p className="bigtext">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
        praesentium, soluta asperiores error possimus expedita perferendis autem
        adipisci recusandae consectetur fugit esse illum.
      </p>
      <button className=" bg-black text-white w-full p-1 font-bold rounded-3xl">
        Sign up
      </button>
    </>
  );
};

export default step3;
