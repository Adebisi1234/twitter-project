import reactLogo from "../../assets/react.svg";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import ProfilePix from "../../components/ProfilePix";
import Bottom from "../../components/Bottom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Post from "../../components/Post";

export default function MessagePage() {
  const user = useSelector((state) => state.user.user);
  const [data, setData] = useState([]);
  const [pp, setPp] = useState([]);
  const [username, setUsername] = useState([]);
  const handle = [];
  console.log("user handle", user.handle);
  useEffect(() => {
    axios
      .get("https://my-twitter-backend.onrender.com/messages/all", {
        params: {
          owner: user.handle,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("data", data);
  const result =
    data &&
    data.map((message, i) => {
      message.owner === user.handle
        ? (handle[i] = message.receiver)
        : (handle[i] = message.owner);
      console.log(handle);
      axios
        .get(`https://my-twitter-backend.onrender.com/users/get/${handle[i]}`)
        .then((res) => {
          setPp(res.data.pp);
          setUsername(res.data.user);
        });
      return (
        <div className="flex gap-3 mb-8 pl-3" key={handle[i]}>
          <ProfilePix pp={pp ? pp : reactLogo} />
          <Link
            to={`/messages/message/${JSON.stringify({
              message: message,
              handle: handle[i],
            })}`}
          >
            <div className="flex-col w-full">
              <h1 className=" flex gap-3">
                {username} <span>{handle[i]}</span>
              </h1>
              <p className="opacity-70">
                {message.content[message.content.length - 1].message}
              </p>
            </div>
          </Link>
        </div>
      );
    });

  return (
    <div className="dark:bg-black dark:text-white bg-white h-full text-black">
      <Header text="Messages" />
      <div className="input dark:bg-black bg-white px-20 flex gap-3 rounded-3xl w-full p-2 mb-3 mt-3">
        <div className="w-7 dark:bg-[url('/src/assets/searchDark.png')] bg-[url('/src/assets/search.png')] bg-left bg-cover h-7"></div>

        <input
          type="text"
          placeholder="Search Direct Messages"
          className="w-full bg-transparent outline-none "
        />
      </div>
      {result}
      <Bottom />
      <Link to="people">
        <Post />
      </Link>
    </div>
  );
}
