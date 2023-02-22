import React from "react";
import { Link } from "react-router-dom";
import profile from "../../assets/profile.png";
import ProfilePix from "../../components/ProfilePix";

export default function Note({ name, action, text, PostId, pp }) {
  return (
    <>
      <div className="flex bg-blue-50 p-3 gap-3 dark:bg-black dark:text-white items-start mb-4 border-b">
        <div className="react">
          {action.includes("liked") ? (
            <div className="w-9 dark:bg-[url('/src/assets/heart.png')] bg-[url('/src/assets/heartDark.png')]  bg-cover h-9"></div>
          ) : (
            <div className="w-9 dark:bg-[url('/src/assets/retweetDark.png')] bg-[url('/src/assets/retweet.png')]  bg-cover h-9"></div>
          )}
        </div>
        <div className="content flex flex-col gap-1">
          <ProfilePix pp={pp ? pp : profile} handle={name} />
          <Link to={`/tweetPage/${PostId}`}>
            <p>
              <span className="font-bold">{name}</span> {action}
            </p>
            <p className="mt-5">{text}</p>
          </Link>
        </div>
      </div>
    </>
  );
}
