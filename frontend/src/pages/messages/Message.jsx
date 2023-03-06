import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import ProfilePix from "../../components/ProfilePix";
import Skeleton from "../../components/Skeleton";
import Hr from "../../components/Hr";
import Others from "./Others";
import Self from "./Self";

export default function Message() {
  const [user, setUser] = useState({});
  const users = useSelector((state) => state.user.user);
  const { object } = useParams();
  const { message, handle } = JSON.parse(object);
  const [content, setContent] = useState("");

  const [maps, setMaps] = useState(
    Object.keys(message).length !== 0 ? message.content : {}
  );

  console.log(maps);
  useEffect(() => {
    !handle.includes("@")
      ? axios
          .get(`https://my-twitter-backend.onrender.com/users/get/@${handle}`)
          .then((res) => setUser(res.data))
      : axios
          .get(`https://my-twitter-backend.onrender.com/users/get/${handle}`)
          .then((res) => setUser(res.data));
  }, []);
  let result = [];
  Object.keys(maps).length
    ? (result = maps.map((mes) => {
        if (mes.from === users.handle) {
          return <Others key={mes._id} text={mes.message} />;
        } else {
          return <Self key={mes._id} text={mes.message} />;
        }
      }))
    : "";
  return Object.keys(user).length ? (
    <div>
      <Header />

      <div className="mt-7 px-10 flex w-full justify-center items-center flex-col gap-1">
        {user.pp ? (
          <ProfilePix pp={user.pp} handle={user.handle} />
        ) : (
          <Link to={`/profile/poster/${handle}`}>
            <div className="w-9 dark:bg-[url('/src/assets/profileDark.png')] bg-[url('/src/assets/profile.png')] bg-left-bottom bg-cover h-9"></div>
          </Link>
        )}
        <h1>{user.username}</h1>
        <p>{user.handle}</p>
        <p className="whitespace-pre-wrap ">{user.bio}</p>
        <p>{user.followersCount} followers</p>
      </div>

      <div className="message flex-col flex mt-16 gap-y-10 p-2 ">
        {Object.keys(maps).length ? result : ""}
        <Hr />
      </div>
      <div className="fixed bottom-0 dark:bg-black dark:text-white bg-slate-200 w-full p-2">
        <div className="flex h-9 w-full bottom-0 gap-2 items-center">
          <input
            type="text"
            placeholder="Send a new message"
            className="w-full"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <div
            className="w-7 dark:bg-[url('/src/assets/sendDark.png')] bg-[url('/src/assets/send.png')] bg-left bg-cover h-7"
            onClick={() => {
              axios
                .post("https://my-twitter-backend.onrender.com/messages/new", {
                  owner: users.handle,
                  receiver: handle,
                  content: [{ from: users.handle, message: content }],
                })
                .then((res) => {
                  setMaps(res.data.content);
                });

              setContent("");
            }}
          ></div>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton />
  );
}
