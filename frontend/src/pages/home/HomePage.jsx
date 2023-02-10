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
      <div className="w-full h-full">
        <Header title="Home" img={profile} />
        <div className="mb-28"></div>
        <NewTweet />
        <Tweet author="owner" text="message from me" img={img} />
        {repeat}
        <Tweet author="owner" text="message from me" img={img2} />
        <Hr />
      </div>

      <Bottom />
    </>
  );
};

export default HomePage;
