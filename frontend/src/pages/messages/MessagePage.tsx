import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Message from "./Message";
import Header from "../../components/Header";
import ProfilePix from "../../components/ProfilePix";
import { User } from "../../types/User";
import { RootState } from "../../app/store";

export default function MessagePage({ socket }: { socket: any }) {
  const user = useSelector((state: RootState) => state.user.user);
  const content = useRef<HTMLInputElement>(null);
  const { currentChat } = useParams();
  const [newMessage, setNewMessage] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<
    {
      sender: string;
      text: string;
      createdAt: string;
    }[]
  >([]);
  const [other, setOther] = useState<User>();
  const [chat, setChat] = useState(JSON.parse(currentChat!));

  if (!socket.active) {
    socket.connect();
  }

  const receiver = useRef(
    chat.members.find((member: string) => member !== user.handle)
  );

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (chat._id) {
          const res = await axios.get(
            `https://my-twitter-backend.onrender.com/messages/message/${chat._id}`
          );
          setMessages(res.data);
        } else {
          const res = await axios.get(
            `https://my-twitter-backend.onrender.com/conversations/find/${chat.members[0]}/${chat.members[1]}`
          );
          if (res.data) {
            setChat(res.data);
            const data = await axios.get(
              `https://my-twitter-backend.onrender.com/messages/message/${res.data._id}`
            );
            setMessages(data.data);
          }
        }

        const data = await axios.get(
          `https://my-twitter-backend.onrender.com/users/get/${receiver.current}`
        );
        setOther(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [chat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    socket.on("getMessage", (data: { sender: string; text: string }) => {
      setNewMessage({
        sender: data.sender,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    newMessage &&
      chat.members.includes(newMessage.sender) &&
      setMessages((prev) => [...prev, newMessage]);
  }, [newMessage]);

  const result = messages.map((message, i) => {
    return (
      <div key={i} ref={scrollRef}>
        <Message
          text={message.text}
          self={message.sender === user.handle && true}
        />
      </div>
    );
  });

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className=" px-10 flex w-full justify-center items-center flex-col gap-1">
        {other?.pp ? (
          <ProfilePix pp={other?.pp} handle={other?.handle} />
        ) : (
          <Link to={`/profile/poster/${other?.handle}`}>
            <div className="w-9 h-9">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                </g>
              </svg>
            </div>
          </Link>
        )}
        <h1>{other?.username}</h1>
        <p>{other?.handle}</p>
        <p className="whitespace-pre-wrap ">{other?.bio}</p>
        <p>{other?.followingCount} followers</p>
      </div>

      <div className="message flex-col h-full overflow-y-scroll flex gap-y-10 p-2 ">
        {result}
      </div>
      <div className="max-h-[60px] h-[60px] mt-2 bg-[var(--bg-primary)]  bg-slate-200 w-full p-2">
        <div className="flex h-9 w-full bottom-0 gap-2 items-center">
          <input
            ref={content}
            type="text"
            placeholder="Send a new message"
            className="w-full border-t"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                socket.emit("sendMessage", {
                  sender: user.handle,
                  receiver: other?.handle,
                  text: content.current?.value,
                });
                if (!chat._id) {
                  axios
                    .post(
                      `https://my-twitter-backend.onrender.com/conversations/`,
                      {
                        sender: user.handle,
                        receiver: other?.handle,
                      }
                    )
                    .then((data) => {
                      setChat(data.data);
                      axios.post(
                        "https://my-twitter-backend.onrender.com/messages/new",
                        {
                          sender: user.handle,
                          conversationId: data.data._id,
                          text: content.current?.value,
                        }
                      );
                    });
                } else {
                  axios.post(
                    "https://my-twitter-backend.onrender.com/messages/new",
                    {
                      sender: user.handle,
                      conversationId: chat._id,
                      text: content.current?.value,
                    }
                  );
                }
                content.current!.value = "";
              }
            }}
          />
          <div
            className="w-7 h-7"
            onClick={(e) => {
              socket.emit("sendMessage", {
                sender: user.handle,
                receiver: other?.handle,
                text: content.current?.value,
              });
              if (!chat._id) {
                axios
                  .post(
                    `https://my-twitter-backend.onrender.com/conversations/`,
                    {
                      sender: user.handle,
                      receiver: other?.handle,
                    }
                  )
                  .then((data) => {
                    setChat(data.data);
                    axios.post(
                      "https://my-twitter-backend.onrender.com/messages/new",
                      {
                        sender: user.handle,
                        conversationId: data.data._id,
                        text: content.current?.value,
                      }
                    );
                  });
              } else {
                axios.post(
                  "https://my-twitter-backend.onrender.com/messages/new",
                  {
                    sender: user.handle,
                    conversationId: chat._id,
                    text: content.current?.value,
                  }
                );
              }
              content.current!.value = "";
            }}
          >
            <svg id="svg" viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
    // ) : (
    //   <Skeleton />
    // );
  );
}
