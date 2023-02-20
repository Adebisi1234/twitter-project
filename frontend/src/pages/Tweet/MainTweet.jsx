import React from "react";
import ProfilePix from "../../components/ProfilePix";
import reactLogo from "../../assets/react.svg";
import { useSelector, useDispatch } from "react-redux";
import { retweet, like } from "../../features/post/postSlice";
import Skeleton from "../../components/Skeleton";

const MainTweet = ({ id }) => {
  const posts = useSelector((state) => state.post);
  const post = posts[0].find((post) => post._id === id);
  const dispatch = useDispatch();
  return Object.keys(post).length ? (
    <div className="border-b scroll-mb-20 m-auto max-w-2xl flex flex-col pt-2 dark:bg-black dark:text-white bg-white text-black ">
      <div className="details">
        <ProfilePix pp={post.pp ? post.pp : reactLogo} />
        <h3 className="text-xl font-bold">
          {post.username}{" "}
          <span className=" block text-sm font-thin ">{post.handle}</span>
        </h3>
      </div>
      <div className="tweet flex flex-col w-full pt-0">
        <p>{post.content}</p>
        {post.img && (
          <img
            className=" max-w-full max-h-96 object-contain rounded-3xl my-2 "
            src={post.img}
            decoding="async"
            loading="lazy"
          />
        )}

        <div className="time my-3 flex gap-3 w-full">
          <p>{post.createdAt.slice(0, 10)}</p>
          <p>{post.createdAt.slice(11, -8)}</p>
        </div>
        <div className="stats my-3 flex gap-3 w-full">
          <p>{post.retweets ? post.retweets : 0} Retweets</p>
          <p>{post.likes} Likes</p>
        </div>
        <div className="buttons border-y-2 py-2 w-full flex justify-between items-center">
          <div className="contain gap-2 flex">
            <div className="w-7 dark:bg-[url('/src/assets/tweetsDark.png')] bg-[url('/src/assets/tweets.png')] bg-left bg-cover h-7"></div>
            {post.commentCount}
          </div>
          <div className="contain gap-2 flex">
            <div
              className="w-7 dark:bg-[url('/src/assets/heart.png')] bg-[url('/src/assets/heartDark.png')]  bg-cover h-7"
              onClick={() => {
                console.log("heart");
                dispatch(like({ id: post._id }));
              }}
            ></div>
            {post.likes}
          </div>
          <div className="contain gap-2 flex">
            <div
              className="w-7 dark:bg-[url('/src/assets/retweetDark.png')] bg-[url('/src/assets/retweet.png')] bg-left bg-cover h-7"
              onClick={() => {
                console.log("tweets");
                dispatch(retweet({ id: post._id }));
              }}
            ></div>
            {post.retweet}
          </div>
          <div className="contain gap-2 flex">
            <div className="w-7 dark:bg-[url('/src/assets/shareDark.png')] bg-[url('/src/assets/share.png')] bg-cover h-7"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton />
  );
};

export default MainTweet;
