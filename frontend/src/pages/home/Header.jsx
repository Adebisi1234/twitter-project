import React from "react";

const Header = ({ imgs, setIsFollowing }) => {
  return (
    <header className="w-full dark:bg-black dark:text-white bg-white text-black">
      <div className="flex w-full p-2">
        {imgs ? (
          <img
            src={imgs}
            className="h-7 rounded-full"
            onClick={() => {
              document
                .getElementById("slide")
                .classList.toggle("-translate-x-full");
            }}
          />
        ) : (
          <div
            className="w-7 lg:hidden dark:bg-[url('/src/assets/profileDark.png')] bg-[url('/src/assets/profile.png')] bg-left-bottom bg-cover h-7"
            onClick={() => {
              document
                .getElementById("slide")
                .classList.toggle("-translate-x-full");
            }}
          ></div>
        )}

        <div className="h-full header w-full flex justify-center items-center font-extrabold">
          <div className="w-8 bg-[url('/src/assets/logoDark.jpg')] dark:bg-[url('/src/assets/logo.jpg')] bg-cover h-8"></div>
        </div>
      </div>
      <div className="flex items-center h-11 w-full">
        <button
          className=" w-full h-full"
          onClick={() => {
            const forYou = document.getElementById("you");
            forYou.classList.add("border-b-4");

            const follow = document.getElementById("follow");
            follow.classList.remove("border-b-4");
            setIsFollowing(false);
          }}
        >
          <span className="pb-[6px] border-b-blue-600 border-b-4" id="you">
            For You
          </span>
        </button>
        <button
          className="w-full h-full"
          onClick={() => {
            const forYou = document.getElementById("you");
            forYou.classList.remove("border-b-4");

            const follow = document.getElementById("follow");
            follow.classList.add("border-b-4");
            setIsFollowing(true);
          }}
        >
          <span className="pb-[6px] border-b-blue-600" id="follow">
            Following
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
