import React, { useEffect, useState } from "react";
import Header from "./Header";
import NewTweet from "./NewTweet";
import Tweet from "../../components/Tweet";
import Sidebar from "./Sidebar";
import Bottom from "../../components/Bottom";
import profile from "../../assets/profile.png";
import Skeleton from "../../components/Skeleton";
import { login } from "../../features/auth/userSlice";
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
    axios
      .get(`https://my-twitter-backend.onrender.com/users/get/${user.handle}`)
      .then((data) => {
        console.log(data.data);
        dispatch(login(data.data));
      });
  }, []);

  const repeat = post[0].map((post) => {
    return <Tweet post={post} key={post._id} />;
  });

  return (
    <>
      <div className="w-full h-full">
        <Header imgs={Object.keys(user).length && user.pp} />
        <div className="hidden md:block">
          <NewTweet />
        </div>
        {loading ? <Skeleton /> : repeat}
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
