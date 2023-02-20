import reactLogo from "./assets/react.svg";
import "./App.css";
import Login from "./pages/login/Login";
import Form from "./pages/login/Form";
import Signin from "./pages/signin/Signin";
import HomePage from "./pages/home/HomePage";
import ProfilePix from "./components/ProfilePix";
import NewTweet from "./pages/home/NewTweet";
import Search from "./pages/search/Search";
import SearchPage from "./pages/search/SearchPage";
import EditProfile from "./pages/User/EditProfile";
import User from "./pages/User/User";
import Notifications from "./pages/notifications/Notifications";
import MainTweet from "./pages/Tweet/MainTweet";
import TweetPage from "./pages/Tweet/TweetPage";
import MessagePage from "./pages/messages/MessagePage";
import People from "./pages/messages/People";
import Sidebar from "./pages/home/Sidebar";
import Message from "./pages/messages/Message";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Skeleton from "./components/Skeleton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MobileTweet from "./pages/home/MobileTweet";
import Poster from "./pages/User/Poster";

function App() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className=" flex min-h-screen flex-col lg:grid lg:grid-cols-[1fr,2fr,1fr] dark:bg-black dark:text-white bg-white text-black">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="lg:marker:border-x ">
        <Routes>
          <Route path="/">
            <Route
              index
              element={Object.keys(user).length ? <HomePage /> : <Login />}
            />
            <Route path="/home" element={<HomePage />} />
            <Route path="/mobile" element={<MobileTweet />} />
            <Route path="profile">
              <Route index element={<User />} />
              <Route path="edit" element={<EditProfile />} />
              <Route path="poster/:handle" element={<Poster />} />
            </Route>
            <Route path="signin" element={<Signin />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="notifications" element={<Notifications />} />
          <Route path="tweetPage/:id" element={<TweetPage />} />
          <Route path="newtweet" element={<NewTweet />} />
          <Route path="search" element={<Search />} />
          <Route path="searchPage/:id" element={<SearchPage />} />
          <Route path="messages">
            <Route index element={<MessagePage />} />
            <Route path="message" element={<Message />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <div className="hidden lg:block">
        <Search />
      </div>
    </div>
  );
}

export default App;
