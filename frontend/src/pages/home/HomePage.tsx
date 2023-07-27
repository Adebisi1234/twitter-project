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
import NewPost from "../../components/Newpost";
import { Link } from "react-router-dom";
import Hr from "../../components/Hr";
import Theme from "../../components/Theme";
import { Post } from "../../types/Post";
import { RootState } from "../../app/store";

const HomePage = ({
  newTheme,
  setNewTheme,
}: {
  newTheme?: boolean;
  setNewTheme?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const slide = useRef<HTMLDivElement>(null);
  const post = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [loading, setLoading] = useState(false);
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

  const forYou = post[0].map((post: Post) => {
    return <Tweet post={post} key={post._id} />;
  });
  const following = post[0].map((post: Post) => {
    const followed = user.following.find(
      (follower: string) => follower === post.handle
    );
    if (followed) {
      return <Tweet post={post} key={post._id} />;
    }
  });

  return (
    <>
      <div className="w-full h-full relative">
        <Header
          imgs={Object.keys(user).length ? user.pp : ""}
          slide={slide}
          setIsFollowing={setIsFollowing}
          setNewTheme={setNewTheme!}
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
      </div>
      <div
        className=" fixed lg:hidden top-0 left-0 z-50 bg-[var(--bg-secondary)] -translate-x-full w-full transition-all duration-300"
        ref={slide}
        id="slide"
        onClick={(e) => {
          if (e.target === slide.current) {
            slide.current.classList.toggle("-translate-x-full");
          }
        }}
      >
        <div className="size max-w-[320px] bg-[var(--bg-primary)] text-[var(--color)] z-50 h-screen">
          <Sidebar setNewTheme={setNewTheme!} />
        </div>
      </div>
      <Link to="/newtweet" className="lg:hidden">
        <NewPost />
      </Link>
      <Bottom />
    </>
  );
};

export default HomePage;
