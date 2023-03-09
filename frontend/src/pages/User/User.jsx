import Bottom from "../../components/Bottom";
import Tweet from "../../components/Tweet";
import Header from "./Header";
import Hr from "../../components/Hr";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../../components/Skeleton";
import { useEffect, useRef } from "react";
import axios from "axios";
import { login } from "../../features/auth/userSlice";

export default function User() {
  const posts = useRef();
  const likes = useRef();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const userPost = post[0].filter((post) => post.username === user.username);
  const tweets = userPost.map((post) => {
    return <Tweet key={post._id} post={post} />;
  });
  useEffect(() => {
    axios
      .get(`https://my-twitter-backend.onrender.com/users/get/${user.handle}`)
      .then((data) => {
        dispatch(login(data.data));
      });
  }, []);
  return Object.keys(user).length ? (
    <div className="w-full">
      <Header user={user.username} tweets={user.posts} />
      <div className="big flex flex-col dark:bg-black dark:text-black bg-white text-black">
        <div
          className="cover-img relative h-48 lg:h-52 w-full !bg-green-500 !dark:bg-red-500 !bg-cover "
          style={{ background: `url(${user.coverImg})` }}
        >
          <div
            className="pp h-24 absolute w-24 rounded-full translate-y-36 ml-4 border border-white !bg-cover bg-black"
            style={{ background: `url(${user.pp})` }}
          ></div>
        </div>
        <div className=" dark:bg-black dark:text-white  options">
          <div className="edit-profile flex items-end justify-end pr-3">
            <Link to="/profile/edit">
              <button className="border dark:border-white border-black py-3 px-4 rounded-3xl mt-1">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
        <div className="ml-5">
          <div className="name dark:bg-black dark:text-white mb-6">
            <h1 className="text-xl font-bold">{user.username}</h1>
            <small className="font-thin opacity-80">{user.handle}</small>
          </div>
          <div className="bio dark:bg-black dark:text-white mb-4 whitespace-pre">
            {user.bio}
          </div>
          <div className="info dark:bg-black dark:text-white mb-4 flex flex-wrap opacity-80 gap-x-8">
            <div>{user.location} </div>
          </div>

          <div className="follow-count dark:bg-black dark:text-white mb-4 flex gap-4">
            <div className="following">{user.followersCount} following</div>
            <div className="following">{user.followingCount} followers</div>
          </div>

          <div className="tweets dark:bg-black dark:text-white flex items-center justify-evenly w-full gap-11">
            <h1
              className="post font-extrabold border-b-4 border-b-blue-500"
              id="posts"
              ref={posts}
              onClick={() => {
                posts.current.classList.add("border-b-4");

                likes.current.classList.remove("border-b-4");
              }}
            >
              Posts
            </h1>
            <h1
              className="likes font-extrabold border-b-blue-500"
              id="likes"
              ref={likes}
              onClick={() => {
                posts.current.classList.remove("border-b-4");

                likes.current.classList.add("border-b-4");
              }}
            >
              Likes
            </h1>
          </div>
          {tweets}
        </div>
        <Hr />
      </div>
      <Bottom />
    </div>
  ) : (
    <Skeleton />
  );
}
