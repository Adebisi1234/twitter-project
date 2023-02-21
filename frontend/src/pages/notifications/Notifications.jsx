import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Bottom from "../../components/Bottom";
import Header from "./Header";
import axios from "axios";
import Note from "./Note";
import Skeleton from "../../components/Skeleton";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    axios
      .get(`https://twitterb.up.railway.app/notifications/all/${user.handle}`)
      .then((res) => {
        console.log(...res.data);
        setNotifications(res.data);
        console.log(notifications);
      });
  }, []);

  const notes = notifications.map((note) => {
    return (
      <Note
        key={note._id}
        text={note.text}
        action={note.action}
        name={note.handle}
        pp={note.pp}
      />
    );
  });
  return notifications.length ? (
    <div className="dark:bg-black dark:text-white">
      <Header />
      {notifications ? (
        <div className="pl-2">{notes}</div>
      ) : (
        "No notifications check back later"
      )}
      <Bottom />
    </div>
  ) : (
    <Skeleton />
  );
}
