import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="404 flex flex-col gap-7">
        <h1>Error 404</h1>
        <p>Something went wrong</p>
        <button
          className="w-full !text-white border-slate-300 border !bg-green-500 h-10 flex p-3 gap-1 justify-center items-center rounded-3xl"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back to previous page
        </button>
        <button
          className="w-full !text-white border-slate-300 border !bg-green-500 h-10 flex p-3 gap-1 justify-center items-center rounded-3xl"
          onClick={() => {
            navigate("/");
          }}
        >
          Go home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
