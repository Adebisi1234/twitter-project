import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Bottom from "../../components/Bottom";
import Header from "./Header";
import Note from "./Note";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    axios
      .get(`https://twitterb.up.railway.app/notifications/all/${user.handle}`)
      .then((res) => setNotifications(...res.data));
  }, []);

  const notes = notifications.map((note) => {
    return (
      <Note
        key={note._id}
        text={note.text}
        action={note.action}
        name={note.username}
      />
    );
  });
  return (
    <div className="dark:bg-black dark:text-white">
      <Header />
      <div className="pl-2">{notes}</div>
      <Bottom />
    </div>
  );
}
