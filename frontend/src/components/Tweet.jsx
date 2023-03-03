import React, { useState } from "react";
import ProfilePix from "../components/ProfilePix";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  like,
  retweet,
  dislike,
  undoRetweet,
} from "../features/post/postSlice";
import Skeleton from "./Skeleton";
import axios from "axios";

const Tweet = ({ post }) => {
  const [count, setCount] = useState(0);
  const [recount, setRecount] = useState(0);
  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.post);
  const isComment = posts[1].find((comment) => comment._id === post._id);
  const dispatch = useDispatch();
  return Object.keys(user).length ? (
    <div className="border-b-[0.1px] pl-2 m-auto max-w-2xl flex pt-2 dark:bg-black dark:text-white bg-white text-black ">
      {post.pp ? (
        <ProfilePix pp={post.pp} handle={post.handle} />
      ) : (
        <div className="w-9 dark:bg-[url('/src/assets/profileDark.png')] bg-[url('/src/assets/profile.png')] bg-left-bottom bg-cover h-9"></div>
      )}
      <div className="flex flex-col w-full h-full">
        <Link
          to={!isComment && `/tweetPage/${post._id}`}
          className="tweet flex flex-col w-full p-2 pt-0"
        >
          <h3 className="font-bold">
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
          {post.audioUrl && (
            <audio controls>
              <source src={post.audioUrl} type="audio/mp3"></source>
            </audio>
          )}
        </Link>
        <div className="buttons w-full flex justify-between items-center mr-1">
          <div className="contain gap-2 flex justify-center items-center">
            <div
              className="w-5 bg-[url('/src/assets/like.png')] dark:bg-[url('/src/assets/likeDark.png')]  bg-cover h-5"
              onClick={() => {
                if (count === 0) {
                  dispatch(like({ id: post._id }));
                  axios
                    .post(
                      "https://my-twitter-backend.onrender.com/posts/like",
                      {
                        id: post._id,
                      }
                    )
                    .then(() => {
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
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  setCount((count + 1) % 2);
                } else {
                  dispatch(dislike({ id: post._id }));
                  axios.post(
                    "https://my-twitter-backend.onrender.com/posts/dislike",
                    {
                      id: post._id,
                    }
                  );
                  setCount((count + 1) % 2);
                }
              }}
            ></div>
            {isComment ? isComment.likes : post.likes}
          </div>
          <div className="contain gap-2 flex justify-center items-center">
            <Link
              to={!isComment && `/tweetPage/${post._id}`}
              className="tweet flex w-full"
            >
              <div className="w-5 dark:bg-[url('/src/assets/commentDark.png')] bg-[url('/src/assets/comment.png')] bg-left bg-cover h-5"></div>
            </Link>
            {isComment ? isComment.commentCount : post.commentCount}
          </div>
          <div className="contain gap-2 flex justify-center items-center">
            <div
              className="w-5 dark:bg-[url('/src/assets/retweetDark.png')] bg-[url('/src/assets/retweet.png')] bg-left bg-cover h-5"
              onClick={() => {
                if (recount === 0) {
                  dispatch(retweet({ id: post._id }));
                  axios
                    .post(
                      "https://my-twitter-backend.onrender.com/posts/retweet",
                      {
                        id: post._id,
                      }
                    )
                    .then(() => {
                      axios.post(
                        "https://my-twitter-backend.onrender.com/notifications/new",
                        {
                          actionHandle: user.handle,
                          handle: post.handle,
                          username: user.username,
                          action: "retweet your post",
                          PostId: post._id,
                          pp: user.pp,
                          text: post.content.slice(0, 100),
                        }
                      );
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  setRecount((recount + 1) % 2);
                } else {
                  dispatch(undoRetweet({ id: post._id }));
                  axios.post(
                    "https://my-twitter-backend.onrender.com/posts/undoretweet",
                    {
                      id: post._id,
                    }
                  );
                  setRecount((recount + 1) % 2);
                }
              }}
            ></div>
            {isComment ? isComment.retweet : post.retweet}
          </div>
          <div className="contain gap-2 flex justify-center items-center ml-2">
            <div className="w-5 dark:bg-[url('/src/assets/shareDark.png')] bg-[url('/src/assets/share.png')] bg-cover h-5 ml-2"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton />
  );
};

export default Tweet;
