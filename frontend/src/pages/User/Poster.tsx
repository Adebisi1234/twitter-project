import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Bottom from "../../components/Bottom";
import Hr from "../../components/Hr";
import Skeleton from "../../components/Skeleton";
import Tweet from "../../components/Tweet";
import Header from "./Header";
import { RootState } from "../../app/store";
import { User } from "../../types/User";

export default function Poster() {
  const posts = useRef<HTMLDivElement>(null!);
  const likes = useRef<HTMLDivElement>(null!);
  const follow = useRef<HTMLButtonElement>(null!);
  const { handle } = useParams();
  const users = useSelector((state: RootState) => state.user.user);
  const [user, setUser]: [
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
  ] = useState<User>(undefined!);
  const [like, setLikes] = useState(false);
  useEffect(() => {
    const getUser = async (handle: string) => {
      const { data } = await axios.get(
        `https://my-twitter-backend.onrender.com/users/get/${handle}`
      );
      setUser(data);
    };
    getUser(handle!);
  }, []);
  const post = useSelector((state: RootState) => state.post);
  const userPost = post[0].filter((post) => post.handle === handle);

  const liked = post[0].filter((post) => {
    if (user) {
      user.likes?.includes(post._id);
    }
  });
  console.log(liked);
  const tweets = userPost.map((post) => {
    return <Tweet key={post._id} post={post} />;
  });

  const likedPost = liked.map((post) => {
    return <Tweet key={post._id} post={post} />;
  });
  const showDialog = useRef<HTMLDialogElement>(null);
  const [dialogImgSrc, setDialogImgSrc] = useState<string>("");

  return user ? (
    <div>
      <dialog
        className="w-full bg-[var(--bg-secondary)] h-full "
        ref={showDialog}
      >
        <button
          className="x text-[var(--color)] bg-[var(--button-primary)] w-fit p-1 rounded-md"
          onClick={() => {
            showDialog.current?.close();
          }}
        >
          close
        </button>
        <div className="img h-[calc(100%_-_24px)] flex items-center">
          <img
            loading="lazy"
            decoding="async"
            src={dialogImgSrc}
            alt="image"
            className="max-h-full mx-auto max-w-full object-cover aspect-auto"
          />
        </div>
      </dialog>
      <Header user={user.username} tweets={user.posts} />
      <div className="big flex flex-col  ">
        <div
          className="cover-img relative h-48 lg:h-52 w-full !bg-green-500 !dark:bg-red-500 !bg-cover "
          style={{ background: `url("${user.coverImg}")` }}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if ((e.target as HTMLDivElement).classList.contains("cover-img")) {
              setDialogImgSrc(user.coverImg);
              console.log(dialogImgSrc);
              showDialog.current?.showModal();
            }
          }}
        >
          <div
            className="pp h-24 absolute w-24 rounded-full translate-y-36 ml-4 border border-white !bg-cover bg-black"
            style={{ background: `url("${user.pp}")` }}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              if ((e.target as HTMLDivElement).classList.contains("pp")) {
                setDialogImgSrc(user.pp);
                console.log(dialogImgSrc);
                showDialog.current?.showModal();
              }
            }}
          ></div>
        </div>
        <div className="    options">
          <div className="edit-profile flex items-end justify-end pr-3">
            <button
              className="border dark:border-white border-black py-3 px-4 rounded-3xl mt-1"
              id="follow"
              ref={follow}
              onClick={() => {
                follow.current.textContent = "Following";
                axios.post(
                  `https://my-twitter-backend.onrender.com/users/new-following/${users.handle}`,
                  {
                    username: user.handle,
                  }
                );
                axios.post(
                  `https://my-twitter-backend.onrender.com/users/new-following/${user.handle}`,
                  {
                    username: users.handle,
                  }
                );
              }}
            >
              {users.following.includes(user.handle) ? "following" : "follow"}
            </button>
          </div>
        </div>
        <div className="ml-5">
          <div className="name   mb-6">
            <h1 className="text-xl font-bold">{user.username}</h1>
            <small className="font-thin opacity-80">{user.handle}</small>
          </div>
          <div className="bio   mb-4 whitespace-pre">{user.bio}</div>
          <div className="info   mb-4 flex flex-wrap opacity-80 gap-x-8">
            <div>{user.location} </div>
          </div>

          <div className="follow-count   mb-4 flex gap-4">
            <div className="following">{user.followersCount} Following</div>
            <div className="following">{user.followingCount} Followers</div>
          </div>

          <div className="tweets   flex items-center justify-evenly w-full gap-11">
            <h1
              className="post font-extrabold border-b-4 !border-b-[var(--button-primary)]"
              id="posts"
              ref={posts}
              onClick={() => {
                posts.current.classList.add("border-b-4");
                setLikes(false);
                likes.current.classList.remove("border-b-4");
              }}
            >
              Posts
            </h1>
            <h1
              className="likes font-extrabold !border-b-[var(--button-primary)]"
              id="likes"
              ref={likes}
              onClick={() => {
                posts.current.classList.remove("border-b-4");
                setLikes(true);
                likes.current.classList.add("border-b-4");
              }}
            >
              Likes
            </h1>
          </div>
          {!like
            ? tweets
            : likedPost.length
            ? likedPost
            : "Please like more posts"}
        </div>
        <Hr />
      </div>
      <Bottom />
    </div>
  ) : (
    <Skeleton />
  );
}
