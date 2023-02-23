import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Bottom from "../../components/Bottom";
import Header from "./Header";
import axios from "axios";
import Note from "./Note";
import Skeleton from "../../components/Skeleton";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setloading] = useState(true);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    axios
      .get(
        `https://my-twitter-backend.onrender.com/notifications/all/${user.handle}`
      )
      .then((res) => {
        console.log("notification", res.data);
        res.data.length ? setNotifications(res.data.reverse()) : "";
        setloading(false);
        console.log(notifications);
      });
  }, []);

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
  return !loading ? (
    <div className="dark:bg-black dark:text-white">
      <Header />
      {notifications.length ? (
        <div className="pl-2">{notes}</div>
      ) : (
        <p className="text-center">No notifications check back later</p>
      )}
      <Bottom />
    </div>
  ) : (
    <Skeleton />
  );
}
