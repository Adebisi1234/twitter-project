import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Signin from "./pages/signin/Signin";
import HomePage from "./pages/home/HomePage";
import Sidebar from "./pages/home/Sidebar";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { useRef, useState, Suspense, lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Skeleton from "./components/Skeleton";
import { RootState } from "./app/store";
import Theme from "./components/Theme";

function App() {
  const Messages = lazy(() => import("./pages/messages/Messages"));
  const Notifications = lazy(
    () => import("./pages/notifications/Notifications")
  );
  const User = lazy(() => import("./pages/User/User"));
  const SearchPage = lazy(() => import("./pages/search/SearchPage"));
  const TweetPage = lazy(() => import("./pages/Tweet/TweetPage"));
  const MessagePage = lazy(() => import("./pages/messages/MessagePage"));
  const EditProfile = lazy(() => import("./pages/User/EditProfile"));
  const MobileTweet = lazy(() => import("./pages/home/MobileTweet"));
  const Search = lazy(() => import("./pages/search/Search"));
  const Poster = lazy(() => import("./pages/User/Poster"));

  const socket = useRef<any>(null);
  const user = useSelector((state: RootState) => state.user.user);
  socket.current = io("https://my-twitter-backend.onrender.com", {
    autoConnect: false,
  });
  const [newTheme, setNewTheme] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!localStorage.getItem("THEME")) {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? localStorage.setItem("THEME", "black")
        : localStorage.setItem("THEME", "white");
    }

    if (localStorage.getItem("THEME") === "white") {
      document.documentElement.style.setProperty(
        "--bg-secondary",
        "rgba(171, 182, 182, 0.574)"
      );
      document.documentElement.style.setProperty("--svg", "rgb(15, 20, 25)");

      document.documentElement.style.setProperty("--bg-primary", "white");
      document.documentElement.style.setProperty("--color", "black");
    } else if (localStorage.getItem("THEME") === "black") {
      document.documentElement.style.setProperty("--bg-primary", "black");
      document.documentElement.style.setProperty("--bg-secondary", "#16181c67");
      document.documentElement.style.setProperty("--color", "white");
      document.documentElement.style.setProperty("--svg", "rgb(247, 249, 249)");
    } else {
      document.documentElement.style.setProperty(
        "--bg-primary",
        "rgb(24,34,45)"
      );
      document.documentElement.style.setProperty("--svg", "rgb(247, 249, 249)");
      document.documentElement.style.setProperty("--bg-secondary", "#16181c67");
      document.documentElement.style.setProperty("--color", "white");
    }
  }, []);
  return (
    <div className="min-h-screen pb-[60px] lg:pb-0 lg:grid lg:grid-cols-[280px,1fr,280px]  ">
      <div className="hidden lg:block">
        <Sidebar setNewTheme={setNewTheme} />
      </div>
      <div className="lg:border-x ">
        <Routes>
          <Route
            path="/"
            element={
              Object.keys(user).length ? (
                <HomePage setNewTheme={setNewTheme} newTheme={newTheme} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/home"
            element={<HomePage setNewTheme={setNewTheme} newTheme={newTheme} />}
          />
          <Route path="profile">
            <Route index element={<User />} />
            <Route
              path="edit"
              element={
                <Suspense fallback={<Skeleton />}>
                  <EditProfile />
                </Suspense>
              }
            />
            <Route path="poster/:handle" element={<Poster />} />
          </Route>
          <Route path="signin" element={<Signin />} />
          <Route path="login" element={<Login />} />

          <Route
            path="notifications"
            element={
              <Suspense fallback={<Skeleton />}>
                <Notifications />
              </Suspense>
            }
          />
          <Route
            path="tweetPage/:id"
            element={
              <Suspense fallback={<Skeleton />}>
                <TweetPage />
              </Suspense>
            }
          />
          <Route
            path="newtweet/:quote?"
            element={
              <Suspense fallback={<Skeleton />}>
                <MobileTweet />
              </Suspense>
            }
          />
          <Route
            path="search"
            element={
              <Suspense fallback={<Skeleton />}>
                <Search />
              </Suspense>
            }
          />
          <Route
            path="searchPage/:id"
            element={
              <Suspense fallback={<Skeleton />}>
                <SearchPage />
              </Suspense>
            }
          />
          <Route
            path="messages"
            element={
              <Suspense fallback={<Skeleton />}>
                <Messages socket={socket.current} />
              </Suspense>
            }
          />
          <Route
            path="messages/message/:currentChat"
            element={
              <Suspense fallback={<Skeleton />}>
                <MessagePage socket={socket.current} />
              </Suspense>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <div className="hidden lg:block">
        <Search />
      </div>
      {newTheme && (
        <div
          className="fixed flex justify-center items-center inset-0 bg-[var(--bg-secondary)] z-50"
          ref={themeRef}
          onClick={(e) => {
            if (e.target === themeRef.current) {
              setNewTheme(false);
            }
          }}
        >
          <Theme setNewTheme={setNewTheme} />
        </div>
      )}
    </div>
  );
}

export default App;
