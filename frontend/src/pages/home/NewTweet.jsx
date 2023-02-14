import React from "react";
import ProfilePix from "../../components/ProfilePix";
import reactLogo from "../../assets/react.svg";
import Header from "../../components/Header";

const NewTweet = () => {
  return (
    <div className="w-full m-auto max-w-2xl hidden md:block">
      <header className="w-full flex md:hidden h-12 p-2  items-center gap-3 justify-between">
        <div className="arrow h-full w-10 bg-slate-800"></div>
        <button className="py-2 px-4 rounded-3xl !bg-[var(--button-primary)] dark:!bg-[var(--button-secondary)] border">
          Post
        </button>
      </header>
      <div className="gap-3 hidden md:flex pl-2 w-full pt-2 dark:bg-slate-900 p-1 border-b-2 max-w-2xl">
        <ProfilePix pp={reactLogo} />
        <div className="new-tweet w-full h-full flex flex-col ">
          <div className="input h-24 ">
            <textarea
              placeholder="What's happening?"
              className="w-full bg-transparent outline-none"
            ></textarea>
          </div>
          <div className="options flex justify-between items-center">
            <div className="buttons flex gap-2 justify-between">
              <div className="w-5 h-5 bg-slate-600"></div>
              <div className="w-5 h-5 bg-slate-600"></div>
              <div className="w-5 h-5 bg-slate-600"></div>
              <div className="w-5 h-5 bg-slate-600"></div>
              <div className="w-5 h-5 bg-slate-600"></div>
            </div>
            <button className=" !bg-[var(--button-primary)] dark:!bg-[var(--button-secondary)] hidden md:block px-5 text-white py-1 rounded-3xl">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTweet;
