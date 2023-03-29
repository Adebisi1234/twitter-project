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
import { Link } from "react-router-dom";
import Hr from "../../components/Hr";
import Theme from "../../components/Theme";

const HomePage = ({ newTheme, setNewTheme }) => {
  const slide = useRef();
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
          setNewTheme={setNewTheme}
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
        className=" fixed lg:hidden top-0 left-0 z-50 -translate-x-full w-full transition-all duration-300 !bg-transparent"
        ref={slide}
        id="slide"
        onClick={(e) => {
          if (e.target === slide.current) {
            slide.current.classList.toggle("-translate-x-full");
          }
        }}
      >
        <div className="size max-w-[280px] dark:bg-[var(--bg-dark)] dark:text-[var(--color-dark)] bg-[var(--bg-light)] text-[var(--color-light)] h-screen">
          <Sidebar setNewTheme={setNewTheme} />
        </div>
      </div>
      <Link to="/newtweet" className="lg:hidden">
        <Post />
      </Link>
      <Bottom />
    </>
  );
};

export default HomePage;
