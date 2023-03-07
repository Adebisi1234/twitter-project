import Header from "../../components/Header";
import { useEffect, useState } from "react";
import Bottom from "../../components/Bottom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Post from "../../components/Post";

export default function MessagePage() {
  const user = useSelector((state) => state.user.user);
  const [data, setData] = useState([]);
  const handle = [];
  useEffect(() => {
    axios
      .get("https://my-twitter-backend.onrender.com/messages/all", {
        params: {
          owner: user.handle,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const result = data.map((message, i) => {
    message.owner === user.handle
      ? (handle[i] = message.receiver)
      : (handle[i] = message.owner);
    handle[i].includes("@") && (handle[i] = handle[i].replace("@", ""));
    return (
      <div className="flex gap-3 mb-8 pl-3" key={handle[i]}>
        <Link
          to={`/messages/message/${JSON.stringify({
            message: message,
            handle: handle[i],
          })}`}
        >
          <div className="flex-col w-full">
            <h1 className=" flex gap-3">
              <span>{handle[i]}</span>
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
    <div className="dark:bg-black lg:relative dark:text-white bg-white h-full text-black">
      <Header text="Messages" />
      <div className="input dark:bg-black bg-white px-20 flex gap-3 rounded-3xl w-full p-2 mb-3 mt-3">
        <div className="w-7 h-7">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
            </g>
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search Direct Messages"
          className="w-full bg-transparent outline-none "
        />
      </div>
      {result.length
        ? result
        : "There's currently no messages please send a message by clicking the button below"}
      <Bottom />
      <Link to="people">
        <Post />
      </Link>
    </div>
  );
}
