import React from "react";
import reactLogo from "../../assets/react.svg";
import ProfilePix from "../../components/ProfilePix";

const Sidebar = () => {
  return (
    <div className="flex bg-neutral-800 flex-col text-white h-screen  w-full">
      <div className="flex justify-between p-3 mb-7 text-white">
        <h1>Account Info</h1>
        <span
          onClick={() => {
            const slide = document.getElementById("slide");
            slide.classList.toggle("-translate-x-full");
          }}
        >
          X
        </span>
      </div>
      <div className="account flex justify-between p-3">
        <div className="user">
          <div className="details mb-3">
            <ProfilePix pp={reactLogo} />
            <h1>Owner</h1>
            <small>@God</small>
          </div>
          <div className="follow-count mb-4 flex gap-4">
            <div className="following">745 Following</div>
            <div className="followers">168 Followers</div>
          </div>
        </div>
      </div>
      <ul className="p-3 flex flex-col gap-2">
        <li
          className="flex gap-6 mb-7"
          onClick={() => {
            const slide = document.getElementById("slide");
            slide.classList.toggle("-translate-x-full");
          }}
        >
          <img src={reactLogo} />
          Profile
        </li>
        <li
          className="flex gap-6 mb-7"
          onClick={() => {
            const slide = document.getElementById("slide");
            slide.classList.toggle("-translate-x-full");
          }}
        >
          <img src={reactLogo} />
          Messages
        </li>
        <li
          className="flex gap-6 mb-7"
          onClick={() => {
            const slide = document.getElementById("slide");
            slide.classList.toggle("-translate-x-full");
          }}
        >
          <img src={reactLogo} />
          Notification
        </li>
        <li
          className="flex gap-6 mb-7"
          onClick={() => {
            const slide = document.getElementById("slide");
            slide.classList.toggle("-translate-x-full");
          }}
        >
          <img src={reactLogo} />
          Search
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
