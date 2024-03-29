import Bottom from "../../components/Bottom";
import Tweet from "../../components/Tweet";
import Header from "./Header";
import Hr from "../../components/Hr";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../../components/Skeleton";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { login } from "../../features/auth/userSlice";
import { RootState } from "../../app/store";

export default function User() {
  const posts = useRef<HTMLHeadingElement>(null!);
  const likes = useRef<HTMLHeadingElement>(null!);
  const [like, setLikes] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => state.post);
  const userPost = post[0].filter((post) => post.username === user.username);
  const tweets = userPost.map((post) => {
    return <Tweet key={post._id} post={post} />;
  });

  const liked = post[0].filter((post) => {
    if (user) {
      return user.likes?.includes(post._id);
    }
  });

  const likedPost = liked.map((post) => {
    return <Tweet key={post._id} post={post} />;
  });

  useEffect(() => {
    axios
      .get(`https://my-twitter-backend.onrender.com/users/get/${user.handle}`)
      .then((data) => {
        dispatch(login(data.data));
      });
  }, []);

  const [dialogImgSrc, setDialogImgSrc] = useState<string>("");
  const showDialog = useRef<HTMLDialogElement>(null);
  return Object.keys(user).length ? (
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
            <Link to="/profile/edit">
              <button className="border bg-[var(--color)] hover:bg-[var(--button-primary)] transition text-[var(--bg-primary)] rounded-xl py-3 px-4 mt-1">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
        <div className="ml-2">
          <div className="name   mb-6">
            <h1 className="text-xl font-bold">{user.username}</h1>
            <small className="font-thin opacity-80">{user.handle}</small>
          </div>
          <div className="bio   mb-4 whitespace-pre">{user.bio}</div>
          <div className="info   mb-4 flex flex-wrap opacity-80 gap-x-8">
            <div>{user.location} </div>
          </div>

          <div className="follow-count   mb-4 flex gap-4">
            <div className="following">{user.followersCount} following</div>
            <div className="following">{user.followingCount} followers</div>
          </div>

          <div className="tweets   flex items-center justify-evenly w-full gap-11">
            <h1
              className="post font-extrabold border-b-4 !border-b-[var(--button-primary)]"
              id="posts"
              ref={posts}
              onClick={() => {
                posts.current?.classList.add("border-b-4");
                setLikes(false);
                likes.current?.classList.remove("border-b-4");
              }}
            >
              Posts
            </h1>
            <h1
              className="likes font-extrabold !border-b-[var(--button-primary)]"
              id="likes"
              ref={likes}
              onClick={() => {
                posts.current?.classList.remove("border-b-4");
                setLikes(true);
                likes.current?.classList.add("border-b-4");
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
      </div>
      <Bottom />
    </div>
  ) : (
    <Skeleton />
  );
}
