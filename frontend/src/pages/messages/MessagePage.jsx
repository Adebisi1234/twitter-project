import reactLogo from "../../assets/react.svg";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../features/messages/messageSlice";
import ProfilePix from "../../components/ProfilePix";
import Bottom from "../../components/Bottom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MessagePage() {
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://twitterb.up.railway.app/messages/all")
      .then((res) => setMessages(...res.data));
    dispatch(getMessages(messages));
  }, []);

  return (
    <div className="dark:bg-black dark:text-white bg-white h-full text-black">
      <Header title="New" text="Messages" />
      <div className="input dark:bg-black bg-white px-20 flex gap-3 rounded-3xl w-full p-2 mb-3 mt-3">
        <div className="w-7 dark:bg-[url('/src/assets/searchDark.png')] bg-[url('/src/assets/search.png')] bg-left bg-cover h-7"></div>

        <input
          type="text"
          placeholder="Search Direct Messages"
          className="w-full bg-transparent outline-none "
        />
      </div>
      <Link to="/messages/message">
        <div className="flex gap-3 mb-8 pl-3">
          <ProfilePix pp={reactLogo} />
          <div className="flex-col w-full">
            <h1 className=" flex gap-3">
              Mechanic <span>@owner</span> • jan 30
            </h1>
            <p className="opacity-70">Not Yet Complete</p>
          </div>
        </div>
      </Link>
      <Link to="/messages/message">
        <div className="flex gap-3 mb-8 pl-3">
          <ProfilePix pp={reactLogo} />
          <div className="flex-col w-full">
            <h1 className=" flex gap-3">
              Mechanic <span>@owner</span> • jan 30
            </h1>
            <p className="opacity-70">Not Yet Complete</p>
          </div>
        </div>
      </Link>
      <Link to="/messages/message">
        <div className="flex gap-3 mb-8 pl-3">
          <ProfilePix pp={reactLogo} />
          <div className="flex-col w-full">
            <h1 className=" flex gap-3">
              Mechanic <span>@owner</span> • jan 30
            </h1>
            <p className="opacity-70">Not Yet Complete</p>
          </div>
        </div>
      </Link>
      <Link to="/messages/message">
        <div className="flex gap-3 mb-8 pl-3">
          <ProfilePix pp={reactLogo} />
          <div className="flex-col w-full">
            <h1>
              Mechanic <span>@owner</span> • jan 30
            </h1>
            <p className="opacity-70">Not Yet Complete</p>
          </div>
        </div>
      </Link>
      <Bottom />
    </div>
  );
}
