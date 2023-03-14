import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import NewTweet from "./NewTweet";
import Tweet from "../../components/Tweet";
import Sidebar from "./Sidebar";
import Bottom from "../../components/Bottom";
import Skeleton from "../../components/Skeleton";
import { login } from "../../features/auth/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../features/post/postSlice";
import axios from "axios";
import Post from "../../components/Post";
import { Link, useLocation } from "react-router-dom";
import Hr from "../../components/Hr";

const HomePage = () => {
  const slide = useRef();
  let location = useLocation();
  console.log(location);
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!post.length) {
        setLoading(true);
      }
      try {
        const data = await axios.get(
          "https://my-twitter-backend.onrender.com/posts/allPosts"
        );
        dispatch(update(data.data));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
    axios
      .get(`https://my-twitter-backend.onrender.com/users/get/${user.handle}`)
      .then((data) => {
        console.log(data.data);
        dispatch(login(data.data));
      });
  }, []);

  const forYou = post[0].map((post) => {
    return <Tweet post={post} key={post._id} />;
  });
  const following = post[0].map((post) => {
    const followed = user.following.find(
      (follower) => follower === post.handle
    );
    if (followed) {
      return <Tweet post={post} key={post._id} />;
    }
  });

  return (
    <>
      <div className="w-full h-full relative">
        <Header
          imgs={Object.keys(user).length && user.pp}
          slide={slide}
          setIsFollowing={setIsFollowing}
        />
        <div className="hidden md:block">
          <NewTweet />
        </div>
        {loading ? (
          <Skeleton />
        ) : !isFollowing ? (
          forYou
        ) : following ? (
          following
        ) : (
          "There's no post here or it's loading"
        )}
        <Hr />
      </div>
      <div
        className=" fixed lg:hidden top-0 left-0 dark:bg-black dark:text-white bg-white text-black -translate-x-full max-w-full min-w-[280px] transition-all duration-300"
        ref={slide}
        id="slide"
      >
        <Sidebar />
      </div>
      <Link to="/newtweet" className="lg:hidden">
        <Post />
      </Link>
      <Bottom />
    </>
  );
};

export default HomePage;
