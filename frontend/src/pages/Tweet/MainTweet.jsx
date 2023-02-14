import React from "react";
import ProfilePix from "../../components/ProfilePix";
import reactLogo from "../../assets/react.svg";

const MainTweet = ({ author, text, img, handle }) => {
  return (
    <div className="border-b scroll-mb-20 m-auto max-w-2xl flex flex-col pt-2 dark:bg-black dark:text-white bg-white text-black ">
      <div className="details">
        <ProfilePix pp={reactLogo} />
        <h3 className="text-xl font-bold">
          {author} <span className=" block text-sm font-thin ">{handle}</span>
        </h3>
      </div>
      <div className="tweet flex flex-col w-full pt-0">
        <p>{text}</p>
        {img && (
          <img
            className=" max-w-full max-h-96 object-contain rounded-3xl my-2 "
            src={img}
            decoding="async"
            loading="lazy"
          />
        )}

        <div className="time my-3 flex gap-3 w-full">
          <p>10:05AM</p>
          <p>Feb 7, 2023</p>
        </div>
        <div className="stats my-3 flex gap-3 w-full">
          <p>10 Retweets</p>
          <p>10 Likes</p>
        </div>
        <div className="buttons border-y-2 py-2 w-full flex justify-between items-center">
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
      </div>
    </div>
  );
};

export default MainTweet;
