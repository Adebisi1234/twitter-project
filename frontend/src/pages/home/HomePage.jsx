import React, { useEffect, useState } from "react";
import Header from "./Header";
import NewTweet from "./NewTweet";
import Tweet from "../../components/Tweet";
import Sidebar from "./Sidebar";
import Bottom from "../../components/Bottom";
import profile from "../../assets/profile.png";
import Skeleton from "../../components/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../features/post/postSlice";
import axios from "axios";
import Post from "../../components/Post";
import { Link } from "react-router-dom";
import Hr from "../../components/Hr";

const HomePage = () => {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [followedPosts, setFollowedPosts] = useState([]);
  for (const following of user.following) {
    const follow = post.filter((post) => post.handle === following);
    setFollowedPosts(follow);
  }

  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
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
  }, []);

  const repeat = post[0].map((post) => {
    return <Tweet post={post} key={post._id} />;
  });
  const followTweet = followedPosts.map((post) => {
    return <Tweet post={post} key={post._id} />;
  });

  return (
    <>
      <div className="w-full h-full">
        <Header
          imgs={Object.keys(user).length && user.pp}
          setIsFollowing={setIsFollowing}
        />
        <div className="hidden md:block">
          <NewTweet />
        </div>
        {loading ? <Skeleton /> : isFollowing ? followTweet : repeat}
        <Hr />
      </div>
      <div
        className=" fixed lg:hidden top-0 left-0 dark:bg-black dark:text-white bg-white text-black -translate-x-full max-w-full min-w-[280px] transition-all duration-300"
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
