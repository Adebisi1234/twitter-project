import React from "react";
import Header from "../../components/Header";
import MainTweet from "./MainTweet";
import img2 from "../../assets/img2.png";
import img from "../../assets/img.jpg";
import reactLogo from "../../assets/react.svg";
import ProfilePix from "../../components/ProfilePix";
import Tweet from "../../components/Tweet";
import Bottom from "../../components/Bottom";
import Hr from "../../components/Hr";

const arr = [1, 2, 3, 4, 5, 6];

const result = arr.map(() => {
  return (
    <Tweet
      key={Math.random() * 20}
      author="User"
      handle="@User"
      text="This is soooo cool"
    />
  );
});

export default function TweetPage() {
  return (
    <div className="h-full w-full">
      <Header />
      <div className="p-3">
        <MainTweet
          author="Tobedated"
          handle="@owner"
          img={img2}
          text="This is me testing the main tweet page"
        />
      </div>
      <div className="flex w-full mt-2 mb-3 p-2 h-10 items-center gap-2">
        <ProfilePix pp={reactLogo} />
        <textarea
          className="w-full h-full rounded-2xl"
          placeholder="Post your reply"
        ></textarea>
        <button className="py-2 bg-blue-400 text-white px-4 rounded-3xl font-bold border">
          Post
        </button>
      </div>
      {result}
      <Tweet
        author="user"
        handle="@user"
        text="This is effing amazing"
        img={img}
      />
      <Hr />
      <Bottom />
    </div>
  );
}
