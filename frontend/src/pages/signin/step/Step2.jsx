import React from "react";
import Header from "../../../components/Header";

const Step2 = () => {
  return (
    <>
      <Header title="Step 2 of 5" />
      <div>
        <h1>Customize your experience</h1>

        <h3>Track where you see Clone content across the web</h3>
        <div className="flex flex-col">
          <div className="texts">
            Clone uses this data to personalize your experience. This web
            browsing history will never be stored with you name, email or phone
            number
          </div>
          <input type="checkbox" name="check" id="check" />
        </div>

        <p>By signing up, you agree to our terms and conditions.</p>
      </div>
      <button className=" bg-black text-white w-full p-1 font-bold rounded-3xl">
        Next
      </button>
    </>
  );
};

export default Step2;
