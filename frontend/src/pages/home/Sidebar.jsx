import React from "react";
import reactLogo from "../../assets/react.svg";
import ProfilePix from "../../components/ProfilePix";

const Sidebar = () => {
  const game = undefined;
  return (
    game && (
      <div className="flex lg:w-[90%] pl-2 !sticky top-0 flex-col h-screen w-full">
        <div className="flex justify-between p-3 mb-7">
          <h1>Account Info</h1>
          <span
            className="lg:hidden"
            onClick={() => {
              const slide = document.getElementById("slide");
              if (slide.clientWidth >= 360) {
                slide.classList.toggle("-translate-x-full");
              }
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
            className="flex p-2 rounded-3xl gap-6 mb-7  hover:!bg-neutral-700"
            onClick={() => {
              const slide = document.getElementById("slide");
              if (slide.clientWidth >= 360) {
                slide.classList.toggle("-translate-x-full");
              }
            }}
          >
            <img src={reactLogo} />
            Profile
          </li>
          <li
            className="flex gap-6 mb-7 p-2 rounded-3xl hover:!bg-neutral-700"
            onClick={() => {
              const slide = document.getElementById("slide");
              if (slide.clientWidth >= 360) {
                slide.classList.toggle("-translate-x-full");
              }
            }}
          >
            <img src={reactLogo} />
            Messages
          </li>
          <li
            className="flex gap-6 mb-7 p-2 rounded-3xl hover:!bg-neutral-700"
            onClick={() => {
              const slide = document.getElementById("slide");
              if (slide.clientWidth >= 360) {
                slide.classList.toggle("-translate-x-full");
              }
            }}
          >
            <img src={reactLogo} />
            Notification
          </li>
          <li
            className="flex gap-6 mb-7 p-2 rounded-3xl hover:!bg-neutral-700"
            onClick={() => {
              const slide = document.getElementById("slide");
              if (slide.clientWidth >= 360) {
                slide.classList.toggle("-translate-x-full");
              }
            }}
          >
            <img src={reactLogo} />
            Search
          </li>
        </ul>
      </div>
    )
  );
};

export default Sidebar;
