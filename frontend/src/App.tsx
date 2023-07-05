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
import { useRef, useState, lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import MobileTweet from "./pages/home/MobileTweet";
import Poster from "./pages/User/Poster";
import Messages from "./pages/messages/Messages";
import { io } from "socket.io-client";
import MessagePage from "./pages/messages/MessagePage";
import Skeleton from "./components/Skeleton";
import { RootState } from "./app/store";
// import Theme from "./components/Theme";

const Theme = lazy(() => import("./components/Theme"));
function App() {
  const socket = useRef<any>(null);
  const [newTheme, setNewTheme] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  socket.current = io("https://my-twitter-backend.onrender.com", {
    autoConnect: false,
  });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!localStorage.getItem("THEME")) {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? localStorage.setItem("THEME", "black")
        : localStorage.setItem("THEME", "white");
    }

    if (localStorage.getItem("THEME") === "white") {
      document.documentElement.style.setProperty("--bg-light", "white");
      document.documentElement.style.setProperty(
        "--bg-lessDark",
        "rgba(171, 182, 182, 0.574)"
      );
      if (document.getElementById("logo")) {
        document
          .getElementById("logo")
          ?.classList.remove("dark:bg-[url('/src/assets/logo.jpg')]");
        document
          .getElementById("logo")
          ?.classList.remove("bg-[url('/src/assets/logo.jpg')]");
        document
          .getElementById("logo")
          ?.classList.add("bg-[url('/src/assets/logoDark.jpg')]");
      }
      document.documentElement.style.setProperty("--bg-dark", "white");
      document.documentElement.style.setProperty("--color-light", "black");
      document.documentElement.style.setProperty("--color-dark", "black");
    } else if (localStorage.getItem("THEME") === "black") {
      if (document.getElementById("logo")) {
        document
          .getElementById("logo")
          ?.classList.add("bg-[url('/src/assets/logo.jpg')]");
        document
          .getElementById("logo")
          ?.classList.remove("bg-[url('/src/assets/logoDark.jpg')]");
      }

      document.documentElement.style.setProperty("--bg-light", "black");
      document.documentElement.style.setProperty("--bg-dark", "black");
      document.documentElement.style.setProperty("--color-light", "white");
      document.documentElement.style.setProperty("--color-dark", "white");
    } else {
      if (document.getElementById("logo")) {
        document
          .getElementById("logo")
          ?.classList.add("bg-[url('/src/assets/logo.jpg')]");
        document
          .getElementById("logo")
          ?.classList.remove("bg-[url('/src/assets/logoDark.jpg')]");
      }

      document.documentElement.style.setProperty("--bg-light", "rgb(24,34,45)");
      document.documentElement.style.setProperty("--bg-dark", "rgb(24,34,45)");
      document.documentElement.style.setProperty("--color-light", "white");
      document.documentElement.style.setProperty("--color-dark", "white");
    }
  }, []);
  return (
    <div className=" flex min-h-screen flex-col lg:grid lg:grid-cols-[1fr,2fr,1fr] dark:bg-black dark:text-white bg-white text-black">
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
            <Route path="edit" element={<EditProfile />} />
            <Route path="poster/:handle" element={<Poster />} />
          </Route>
          <Route path="signin" element={<Signin />} />
          <Route path="login" element={<Login />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="tweetPage/:id" element={<TweetPage />} />
          <Route path="newtweet/:quote?" element={<MobileTweet />} />
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
      {newTheme && (
        <div
          className="fixed flex justify-center items-center inset-0 !bg-[var(--bg-lessDark)] z-50"
          ref={ref}
          onClick={(e) => {
            if (e.target === ref.current) {
              setNewTheme(false);
            }
          }}
        >
          <Suspense fallback={<Skeleton />}>
            <Theme setNewTheme={setNewTheme} />
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default App;
