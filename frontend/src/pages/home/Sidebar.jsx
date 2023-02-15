import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import reactLogo from "../../assets/react.svg";
import Skeleton from "../../components/Skeleton";
import ProfilePix from "../../components/ProfilePix";
import axios from "axios";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex lg:w-[90%] pl-2 !sticky top-0 flex-col h-screen w-full">
      <div>
        <div className="flex justify-between p-3 ">
          <h1>Account Info</h1>
          <span
            className="lg:hidden"
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
              <div className="w-7 dark:bg-[url('/src/assets/profileDark.png')] bg-[url('/src/assets/profile.png')] bg-left-bottom bg-cover h-7"></div>
              <h1>Owner</h1>
              <small>@God</small>
            </div>
            <div className="follow-count mb-4 flex gap-4">
              <div className="following">745 Following</div>
              <div className="followers">168 Followers</div>
            </div>
          </div>
        </div>
      </div>
      <ul className="p-3 flex flex-col gap-2">
        <Link to="/">
          <li
            className="flex p-2 rounded-3xl gap-6  "
            onClick={() => {
              const slide = document.getElementById("slide");
              if (slide.clientWidth === 280) {
                slide.classList.toggle("-translate-x-full");
              }
            }}
          >
            <div className="w-7 dark:bg-[url('/src/assets/homesDark.png')] bg-[url('/src/assets/homes.png')] bg-left bg-cover h-7"></div>
            Home
          </li>
        </Link>
        <Link to="/profile">
          <li
            className="flex p-2 rounded-3xl gap-6  "
            onClick={() => {
              const slide = document.getElementById("slide");
              if (slide.clientWidth === 280) {
                slide.classList.toggle("-translate-x-full");
              }
            }}
          >
            <div className="w-7 dark:bg-[url('/src/assets/profileDark.png')] bg-[url('/src/assets/profile.png')] bg-left-bottom bg-cover h-7"></div>
            Profile
          </li>
        </Link>
        <Link to="/messages">
          <li
            className="flex gap-6  p-2 rounded-3xl"
            onClick={() => {
              const slide = document.getElementById("slide");
              if (slide.clientWidth === 280) {
                slide.classList.toggle("-translate-x-full");
              }
            }}
          >
            <div className="w-7 dark:!bg-[url('/src/assets/messagesDark.png')] !bg-[url('/src/assets/messages.png')] bg-left bg-cover h-7"></div>
            Messages
          </li>
        </Link>
        <Link to="/notifications">
          <li
            className="flex gap-6  p-2 rounded-3xl"
            onClick={() => {
              const slide = document.getElementById("slide");
              if (slide.clientWidth === 280) {
                slide.classList.toggle("-translate-x-full");
              }
            }}
          >
            <div className="w-7 dark:bg-[url('/src/assets/notificationsDark.png')] bg-[url('/src/assets/notifications.png')] bg-left bg-cover bg-no-repeat h-7"></div>
            Notifications
          </li>
        </Link>
        <Link to="/search">
          <li
            className="flex gap-6  p-2 rounded-3xl"
            onClick={() => {
              const slide = document.getElementById("slide");
              if (slide.clientWidth === 280) {
                slide.classList.toggle("-translate-x-full");
              }
            }}
          >
            <div className="w-7 dark:bg-[url('/src/assets/searchDark.png')] bg-[url('/src/assets/search.png')] bg-left-bottom bg-cover h-7"></div>
            Search
          </li>
        </Link>
      </ul>
      <div className="mt-auto">
        <button className=" w-full !text-white border-slate-300 border !bg-red-500 h-10 flex p-3 gap-1 justify-center items-center rounded-3xl">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
