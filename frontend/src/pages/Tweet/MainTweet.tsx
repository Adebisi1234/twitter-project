import { useRef, useState } from "react";
import ProfilePix from "../../components/ProfilePix";
import { useSelector, useDispatch } from "react-redux";
import {
  retweet,
  like,
  dislike,
  undoRetweet,
} from "../../features/post/postSlice";
import Skeleton from "../../components/Skeleton";
import axios from "axios";
import { Link } from "react-router-dom";
import Tweet from "../../components/Tweet";
import { Post } from "../../types/Post";
import { RootState } from "../../app/store";

const MainTweet = ({ id }: { id: string }) => {
  const likeIcon = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [toRetweet, setToRetweet] = useState(false);
  const [recount, setRecount] = useState(0);
  const posts = useSelector((state: RootState) => state.post);
  const user = useSelector((state: RootState) => state.user.user);
  const post = posts[0].find((post) => post._id === id)!;
  const dispatch = useDispatch();
  const retweetIcon = useRef<HTMLDivElement>(null);

  const quote =
    post.quoteId && posts[0].find((quote) => quote._id === post.quoteId);
  return Object.keys(post).length ? (
    <div className="border-b flex flex-col   my-2 ">
      <div className="details mb-2 shadow-md shadow-[var(--bg-secondary)]  flex gap-3">
        {post.pp ? (
          <ProfilePix pp={post.pp} handle={post.handle} />
        ) : (
          <div className="w-9 lg:w-14 lg:h-14 h-9">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
              </g>
            </svg>
          </div>
        )}
        <h3 className="font-bold">
          {post.username}{" "}
          <span className=" block text-sm font-thin ">{post.handle}</span>
        </h3>
      </div>
      <div className="tweet flex flex-col w-full pt-0">
        <p>{post.content}</p>
        {post.img && (
          <img
            loading="lazy"
            decoding="async"
            className=" max-w-full max-h-96 object-contain rounded-3xl my-2 "
            src={post.img}
          />
        )}
        {post.audioUrl && (
          <audio className="max-w-full z-0" preload="none" controls>
            <source src={post.audioUrl} type="video/webm"></source>
            Somethings going on
          </audio>
        )}
        {post.quoteId && (
          <div className="w-full border-[0.1px] border-b-0 h-fit pointer-events-none">
            <Tweet post={quote as Post} isQuote={true} />
          </div>
        )}
        <div className="time my-3 flex gap-3 w-full">
          <p>{post.createdAt.slice(0, 10)}</p>
          <p>{post.createdAt.slice(11, -8)}</p>
        </div>
        <div className="stats my-3 flex gap-3 w-full">
          <p>{post.retweet} Retweets</p>
          <p>{post.likes} Likes</p>
        </div>
        <div className="buttons py-2 w-full flex justify-around items-center">
          <div className="contain gap-2 flex justify-center items-center">
            <div className="w-5 h-5">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                </g>
              </svg>
            </div>
            {post.commentCount}
          </div>
          <div
            className="contain gap-2 flex justify-center items-center"
            ref={likeIcon}
          >
            <div
              className="w-5 h-5"
              onClick={(e) => {
                if (count === 0) {
                  likeIcon.current?.classList.add("liked");
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
                  likeIcon.current?.classList.remove("liked");

                  axios.post(
                    "https://my-twitter-backend.onrender.com/posts/dislike",
                    {
                      id: post._id,
                    }
                  );
                  setCount((count + 1) % 2);
                }
              }}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                onPointerEnter={() => {
                  likeIcon.current?.classList.add("scale-125");
                }}
                onPointerLeave={() => {
                  likeIcon.current?.classList.remove("scale-125");
                }}
              >
                <g>
                  <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </g>
              </svg>
            </div>
            {post.likes}
          </div>
          <div className="contain gap-2 flex justify-center items-center">
            <div
              className="w-5 h-5 z-0 relative"
              onClick={() => {
                setToRetweet(!toRetweet);
              }}
            >
              {toRetweet && (
                <div className="absolute bottom-5  p-2 w-fit">
                  <Link to={`/newtweet/${post._id}`}>
                    <p
                      className="w-fit p-2"
                      id="quote"
                      onClick={() => {
                        setToRetweet(false);
                        console.log("Clicked");
                      }}
                    >
                      Quote
                    </p>
                  </Link>
                  <p
                    className="w-fit p-2"
                    id="retweet"
                    onClick={() => {
                      if (recount === 0) {
                        retweetIcon.current?.classList.add("retweet");
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
                        retweetIcon.current?.classList.remove("retweet");
                        axios.post(
                          "https://my-twitter-backend.onrender.com/posts/undoretweet",
                          {
                            id: post._id,
                          }
                        );
                        setRecount((recount + 1) % 2);
                      }
                      setToRetweet(false);
                    }}
                  >
                    Retweet
                  </p>
                </div>
              )}
              <svg
                viewBox="0 0 24 24"
                className="z-0"
                aria-hidden="true"
                onPointerEnter={(e) => {
                  retweetIcon.current?.classList.add("scale-125");
                }}
                onPointerLeave={(e) => {
                  retweetIcon.current?.classList.remove("scale-125");
                }}
              >
                <g>
                  <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                </g>
              </svg>
            </div>
            {post.retweet}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton />
  );
};

export default MainTweet;
