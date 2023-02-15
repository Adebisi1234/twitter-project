import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full flex flex-col p-2 dark:bg-black dark:text-white dark:border-b items-center gap-3">
      <div className="flex w-full h-12 gap-3">
        <div className="arrow h-full w-10">
          <Link to="/">
            <div className="w-8 bg-[url('/src/assets/logoDark.jpg')] dark:bg-[url('/src/assets/logo.jpg')] bg-cover h-8"></div>
          </Link>
        </div>
        <div className="user w-full">
          <h2>Notifications</h2>
        </div>
      </div>
      <div className="flex w-3/4 justify-evenly gap-3">
        <div
          id="all"
          onClick={() => {
            const all = document.getElementById("all");
            all.classList.add("border-b-4");
            const mentions = document.getElementById("mentions");
            mentions.classList.remove("border-b-4");
          }}
          className="border-b-4 border-b-blue-400"
        >
          All
        </div>
        <div
          id="mentions"
          onClick={() => {
            const all = document.getElementById("all");
            all.classList.remove("border-b-4");
            const mentions = document.getElementById("mentions");
            mentions.classList.add("border-b-4");
          }}
          className=" border-b-blue-400"
        >
          Mentions
        </div>
      </div>
    </header>
  );
}
