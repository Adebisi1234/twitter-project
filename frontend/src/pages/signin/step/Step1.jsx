import React from "react";
import Button from "../../../components/Button";
import Header from "../../../components/Header";

const Step1 = () => {
  return (
    <>
      <Header title="Step 1 of 5" />
      <div className="main">
        <h1>Create your account</h1>

        <div className="input">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" />
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />
        </div>
        <p>
          <a href="#" className="text-right">
            Use phone instead
          </a>
        </p>

        <h3>Date of birth</h3>
        <p>
          This will not be shown publicly, Confirm your own age. Even if the
          account is for a business, a pet, or something else
        </p>

        <input type="date" min="19/09/1990" />
      </div>
      <div className="footer w-full">
        <button className=" bg-black text-white w-full p-1 font-bold rounded-3xl">
          Next
        </button>
      </div>
    </>
  );
};

export default Step1;
