import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bottom from "../../components/Bottom";
import Header from "./Header";
import axios from "axios";
import Note from "./Note";
import Skeleton from "../../components/Skeleton";
import { login } from "../../features/auth/userSlice";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mentions, setMentions] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(0);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(
        `https://my-twitter-backend.onrender.com/notifications/all/${user.handle}`
      )
      .then((res) => {
        res.data.length ? setNotifications(res.data) : "";
        setLoading(false);
      });
    axios
      .get(`https://my-twitter-backend.onrender.com/users/get/${user.handle}`)
      .then((data) => {
        dispatch(login(data.data));
      });
  }, []);

  const observer = new IntersectionObserver(
    (entries) => {
      const lastCard = entries[0];
      console.log(lastCard);
      if (!lastCard.isIntersecting) return;
      getNewNotifications(page);
      observer.unobserve(last);
      observer.observe(document.querySelector("#last"));
    },
    {
      threshold: 1,
    }
  );

  const getNewNotifications = async (page) => {
    console.log("observing");
    setIsFetching(true);
    const { data } = await axios.get(
      `https://my-twitter-backend.onrender.com/notifications/all/${user.handle}/${page}`
    );
    setNotifications((prev) => {
      return [...prev, ...data];
    });
    console.log(data);
    setIsFetching(false);
    setPage(page + 1);
  };

  const mention = notifications.map((note) => {
    if (note.action.includes("mention")) {
      return (
        <Note
          key={note._id}
          text={note.text}
          action={note.action}
          name={note.actionHandle}
          pp={note.pp}
          PostId={note.PostId}
        />
      );
    }
  });

  const notes = notifications.map((note, i) => {
    if (i === notifications.length - 1) {
      return (
        <div className="last" id="last" key={note._id}>
          <Note
            text={note.text}
            action={note.action}
            name={note.actionHandle}
            pp={note.pp}
            PostId={note.PostId}
          />
        </div>
      );
    }
    return (
      <Note
        key={note._id}
        text={note.text}
        action={note.action}
        name={note.actionHandle}
        pp={note.pp}
        PostId={note.PostId}
      />
    );
  });

  let last = document.querySelector("#last");
  console.log(last);
  if (last) {
    observer.observe(last);
  }

  return (
    <>
      {!loading ? (
        <div className="dark:bg-black dark:text-white">
          <Header setMentions={setMentions} />
          {notifications.length ? (
            <div className="pl-2">
              {!mentions ? notes : mention ? mention : <p>No mentions</p>}
              {isFetching && <Skeleton />}
            </div>
          ) : (
            <p className="text-center">No notifications check back later</p>
          )}
        </div>
      ) : (
        <Skeleton />
      )}
      <Bottom />
    </>
  );
}
