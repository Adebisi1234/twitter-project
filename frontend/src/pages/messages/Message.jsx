import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import reactLogo from "../../assets/react.svg";
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
  const [messages, setMessages] = useState([
    Object.keys(message).length ? message : {},
  ]);
  console.log("handle", handle);
  console.log("messages", messages);

  useEffect(() => {
    axios
      .get(`https://twitterb.up.railway.app/users/get/@${handle}`)
      .then((res) => setUser(res.data));
  }, []);
  let result = [];
  Object.keys(messages[0]).length
    ? (result = message.content.map((mes) => {
        if (mes.from === handle) {
          return <Others text={mes.message} />;
        } else {
          return <Self text={mes.message} />;
        }
      }))
    : "";
  return Object.keys(user).length ? (
    <div>
      <Header />

      <div className="mt-7 px-10 flex w-full justify-center items-center flex-col gap-1">
        <ProfilePix pp={user.pp ? user.pp : reactLogo} />
        <h1>{user.username}</h1>
        <p>{user.handle}</p>
        <p className="whitespace-pre-wrap ">{user.bio}</p>
        <p>{user.followersCount} followers</p>
      </div>

      <div className="message other flex-col flex mt-16 gap-y-10 p-2 ">
        {Object.keys(messages[0]).length && result}
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
                .post("https://twitterb.up.railway.app/messages/new", {
                  owner: users.handle,
                  receiver: handle,
                  content: [{ from: users.handle, message: content }],
                })
                .then((res) => {
                  console.log(res.data);
                  if (Object.keys(message)) {
                    setMessages([message, res.data]);
                  } else {
                    setMessages([res.data]);
                  }
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
