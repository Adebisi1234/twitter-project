import React from "react";
import Header from "./Header";
import reactLogo from "../../assets/react.svg";
import NewTweet from "./NewTweet";
import img from "../../assets/img.jpg";
import img2 from "../../assets/img2.png";
import Tweet from "../../components/Tweet";
import Sidebar from "./Sidebar";
import Bottom from "../../components/Bottom";
import Hr from "../../components/Hr";
import profile from "../../assets/profile.png";

const arr = [0, 1, 2, 3, 4, 5, 6];
const repeat = arr.map(() => {
  return (
    <Tweet
      key={Math.random() * 100}
      author="God"
      text="Message from God"
      handle="@owner"
    />
  );
});

const HomePage = () => {
  return (
    <>
      <div className="w-full border-x h-full">
        <Header title="Home" img={profile} />
        <NewTweet />
        <Tweet author="owner" text="message from me" img={img} />
        {repeat}
        <Tweet author="owner" text="message from me" img={img2} />
        <Hr />
      </div>
      <div
        className=" fixed top-0 left-0 dark:bg-black dark:text-white bg-white text-black -translate-x-full max-w-full min-w-[280px] transition-all duration-300"
        id="slide"
      >
        <Sidebar />
      </div>
      <Bottom />
    </>
  );
};

export default HomePage;
