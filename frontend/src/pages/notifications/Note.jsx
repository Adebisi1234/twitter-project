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
            <div className="w-7 bg-[url('/src/assets/like.png')] dark:bg-[url('/src/assets/likeDark.png')]  bg-cover h-7"></div>
          ) : action.includes("mentioned") ? (
            <div className="w-7 dark:bg-[url('/src/assets/commentDark.png')] bg-[url('/src/assets/comment.png')]  bg-cover h-7"></div>
          ) : (
            <div className="w-7 dark:bg-[url('/src/assets/retweetDark.png')] bg-[url('/src/assets/retweet.png')]  bg-cover h-7"></div>
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
