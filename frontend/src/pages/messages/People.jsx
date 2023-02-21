import search from "../../assets/search.png";
import reactLogo from "../../assets/react.svg";
import Header from "../../components/Header";

import ProfilePix from "../../components/ProfilePix";
import Bottom from "../../components/Bottom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../features/messages/messageSlice";
import { Link } from "react-router-dom";

export default function People() {
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    axios
      .get("https://twitterb.up.railway.app/messages/all")
      .then((res) => setMessages(...res.data));
    dispatch(getMessages(messages));
  }, []);
  const people = user.followers.map((follower) => {
    return (
      <Link to={`/messages/message/${follower}`}>
        <div className="flex gap-3 mb-8 pl-3">
          <ProfilePix pp={reactLogo} />
          <div className="w-full">
            <h1 className="text-3xl font-bold">{follower}</h1>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <div className="dark:bg-black dark:text-white bg-white h-full text-black">
      <Header title="New" text="Messages" />
      <div className="input dark:bg-black bg-white px-20 flex gap-3 rounded-3xl w-full p-2 mb-3 mt-3">
        <div className="w-7 dark:bg-[url('/src/assets/searchDark.png')] bg-[url('/src/assets/search.png')] bg-left bg-cover h-7"></div>

        <input
          type="text"
          placeholder="Search People"
          className="w-full bg-transparent outline-none "
        />
      </div>
      {people
        ? people
        : "No followers found, someone needs to follow you to send a message"}
      <Bottom />
    </div>
  );
}
