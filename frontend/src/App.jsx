import reactLogo from "./assets/react.svg";
import "./App.css";
import Login from "./pages/login/Login";
import Form from "./pages/login/Form";
import Signin from "./pages/signin/Signin";
import Step1 from "./pages/signin/step/Step1";
import HomePage from "./pages/home/HomePage";
import ProfilePix from "./components/ProfilePix";
import NewTweet from "./pages/home/NewTweet";
import Search from "./pages/search/Search";
import EditProfile from "./pages/User/EditProfile";
import User from "./pages/User/User";
import Notifications from "./pages/notifications/Notifications";
import MainTweet from "./pages/Tweet/MainTweet";
import TweetPage from "./pages/Tweet/TweetPage";
import MessagePage from "./pages/messages/MessagePage";
import People from "./pages/messages/People";
import Sidebar from "./pages/home/Sidebar";
import Message from "./pages/messages/Message";

function App() {
  return (
    <div className=" flex flex-col dark:bg-black dark:text-white bg-white text-black h-full">
      <HomePage />
      <div
        className=" fixed top-0 left-0 bg-slate-800 -translate-x-full max-w-[70%] min-w-[280px] transition-all duration-300"
        id="slide"
      >
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
