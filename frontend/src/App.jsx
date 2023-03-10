import "./App.css";
import Login from "./pages/login/Login";
import Signin from "./pages/signin/Signin";
import HomePage from "./pages/home/HomePage";
import Sidebar from "./pages/home/Sidebar";
import Search from "./pages/search/Search";
import SearchPage from "./pages/search/SearchPage";
import EditProfile from "./pages/User/EditProfile";
import User from "./pages/User/User";
import Notifications from "./pages/notifications/Notifications";
import TweetPage from "./pages/Tweet/TweetPage";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { useRef } from "react";
import { useSelector } from "react-redux";
import MobileTweet from "./pages/home/MobileTweet";
import Poster from "./pages/User/Poster";
import Messages from "./pages/messages/Messages";
import { io } from "socket.io-client";
import MessagePage from "./pages/messages/MessagePage";

function App() {
  const socket = useRef();
  const user = useSelector((state) => state.user.user);
  socket.current = io("https://my-twitter-backend.onrender.com", {
    autoConnect: false,
  });
  return (
    <div className=" flex min-h-screen flex-col lg:grid lg:grid-cols-[1fr,2fr,1fr] dark:bg-black dark:text-white bg-white text-black">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="lg:border-x ">
        <Routes>
          <Route
            path="/"
            element={Object.keys(user).length ? <HomePage /> : <Login />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="profile">
            <Route index element={<User />} />
            <Route path="edit" element={<EditProfile />} />
            <Route path="poster/:handle" element={<Poster />} />
          </Route>
          <Route path="signin" element={<Signin />} />
          <Route path="login" element={<Login />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="tweetPage/:id" element={<TweetPage />} />
          <Route path="newtweet" element={<MobileTweet />} />
          <Route path="search" element={<Search />} />
          <Route path="searchPage/:id" element={<SearchPage />} />
          <Route
            path="messages"
            element={<Messages socket={socket.current} />}
          />
          <Route
            path="messages/message/:currentChat"
            element={<MessagePage socket={socket.current} />}
          />
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
