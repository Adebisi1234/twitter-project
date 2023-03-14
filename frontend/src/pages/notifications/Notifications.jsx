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
        if (notifications.length) {
          setLast(document.querySelector(".notes:last-child"));
        }
      });
    axios
      .get(`https://my-twitter-backend.onrender.com/users/get/${user.handle}`)
      .then((data) => {
        dispatch(login(data.data));
      });
  }, []);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(() => {
      setPage(page + 1);
      setIsFetching(true);
      const getNewNotifications = async (page) => {
        const { data } = await axios.get(
          `https://my-twitter-backend.onrender.com/notifications/all/${user.handle}/${page}`
        );
        if (data.length) {
          setNotifications((prev) => {
            return [...prev, data];
          });
          setIsFetching(false);
        } else {
          observer.unobserve(last);
        }
      };
      getNewNotifications(page);
    });
  });

  const [last, setLast] = useState(document.querySelector(".notes:last-child"));
  useEffect(() => {
    if (last) {
      observer.observe(last);
    }
    console.log("last");
  }, [last]);
  console.log(last);

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

  const notes = notifications.map((note) => {
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
  return (
    <>
      {!loading ? (
        <div className="dark:bg-black dark:text-white">
          <Header setMentions={setMentions} />
          {notifications.length ? (
            <div className="pl-2">
              {!mentions
                ? notes
                : mention
                ? mention
                : "No mentions please check back later"}
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
