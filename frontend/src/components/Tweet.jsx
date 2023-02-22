import React from "react";
import ProfilePix from "../components/ProfilePix";
import reactLogo from "../assets/react.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { like, retweet } from "../features/post/postSlice";
import Skeleton from "./Skeleton";
import axios from "axios";

const Tweet = ({ post }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  return Object.keys(user).length ? (
    <div className="border-b-[0.1px] pl-2 scroll-mb-20 m-auto max-w-2xl flex pt-2 dark:bg-black dark:text-white bg-white text-black ">
      <ProfilePix pp={post.pp} handle={post.handle} />
      <div className="flex flex-col w-full h-full">
        <Link
          to={`/tweetPage/${post._id}`}
          className="tweet flex flex-col w-full p-2 pt-0"
        >
          <h3 className="text-xl font-bold">
            {post.username}{" "}
            <span className="text-sm block font-thin ">{post.handle}</span>
          </h3>
          <p className="max-w-full whitespace-pre-wrap">{post.content}</p>
          {post.img && (
            <img
              className=" max-w-full max-h-96 object-contain rounded-3xl my-2 "
              src={post.img}
              decoding="async"
              loading="lazy"
            />
          )}
        </Link>
        <div className="buttons w-full flex justify-between items-center mr-1">
          <div className="contain gap-2 flex">
            <div
              className="w-7 dark:bg-[url('/src/assets/heart.png')] bg-[url('/src/assets/heartDark.png')]  bg-cover h-7"
              onClick={() => {
                dispatch(like({ id: post._id }));
                axios.post(
                  "https://my-twitter-backend.onrender.com/posts/like",
                  {
                    id: post._id,
                  }
                );

                axios.post(
                  "https://my-twitter-backend.onrender.com/notifications/new",
                  {
                    actionHandle: user.handle,
                    handle: post.handle,
                    username: user.username,
                    action: "liked your post",
                    PostId: post._id,
                    pp: user.pp,
                    text: post.content.slice(0, 100),
                  }
                );
              }}
            ></div>
            {post.likes}
          </div>
          <div className="contain gap-2 flex">
            <Link
              to={`/tweetPage/${post._id}`}
              className="tweet flex flex-col w-full p-2 pt-0"
            >
              <div className="w-7 dark:bg-[url('/src/assets/tweetsDark.png')] bg-[url('/src/assets/tweets.png')] bg-left bg-cover h-7"></div>
            </Link>
            {post.commentCount}
          </div>
          <div className="contain gap-2 flex">
            <div
              className="w-7 dark:bg-[url('/src/assets/retweetDark.png')] bg-[url('/src/assets/retweet.png')] bg-left bg-cover h-7"
              onClick={() => {
                console.log("tweets");
                dispatch(retweet({ id: post._id }));
                axios.post(
                  "https://my-twitter-backend.onrender.com/posts/retweet",
                  {
                    id: post._id,
                  }
                );
                axios.post(
                  "https://my-twitter-backend.onrender.com/notifications/new",
                  {
                    actionHandle: user.handle,
                    handle: post.handle,
                    username: user.username,
                    action: "retweeted your post",
                    PostId: post._id,
                    pp: user.pp,
                    text: post.content.slice(0, 100),
                  }
                );
              }}
            ></div>
            {post.retweet}
          </div>
          <div className="contain gap-2 flex ml-2">
            <div className="w-7 dark:bg-[url('/src/assets/shareDark.png')] bg-[url('/src/assets/share.png')] bg-cover h-7 ml-2"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton />
  );
};

export default Tweet;
