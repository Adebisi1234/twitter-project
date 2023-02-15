import React from "react";
import ProfilePix from "../components/ProfilePix";
import reactLogo from "../assets/react.svg";
import { Link } from "react-router-dom";

const Tweet = ({ author, text, img, handle }) => {
  return (
    <div className="border-b pl-2 scroll-mb-20 m-auto max-w-2xl flex pt-2 dark:bg-black dark:text-white bg-white text-black ">
      <ProfilePix pp={reactLogo} />
      <Link to="/tweetPage" className="tweet flex flex-col w-full p-2 pt-0">
        <h3 className="text-xl font-bold">
          {author} <span className="text-sm block font-thin ">{handle}</span>
        </h3>
        <p>{text}</p>
        {img && (
          <img
            className=" max-w-full max-h-96 object-contain rounded-3xl my-2 "
            src={img}
            decoding="async"
            loading="lazy"
          />
        )}
        <div className="buttons w-full flex justify-between items-center">
          <div className="contain gap-2 flex">
            <div className="w-7 dark:bg-[url('/src/assets/tweetsDark.png')] bg-[url('/src/assets/tweets.png')] bg-left bg-cover h-7"></div>
            100
          </div>
          <div className="contain gap-2 flex">
            <div className="w-7 dark:bg-[url('/src/assets/heart.png')] bg-[url('/src/assets/heartDark.png')]  bg-cover h-7"></div>
            100
          </div>
          <div className="contain gap-2 flex">
            <div className="w-7 dark:bg-[url('/src/assets/retweetDark.png')] bg-[url('/src/assets/retweet.png')] bg-left bg-cover h-7"></div>
            100
          </div>
          <div className="contain gap-2 flex">
            <div className="w-7 dark:bg-[url('/src/assets/shareDark.png')] bg-[url('/src/assets/share.png')] bg-cover h-7"></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Tweet;
