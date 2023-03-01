import React, { useEffect, useState } from "react";
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
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(
        `https://my-twitter-backend.onrender.com/notifications/all/${user.handle}`
      )
      .then((res) => {
        res.data.length ? setNotifications(res.data.reverse()) : "";
        setLoading(false);
      });
    axios
      .get(`https://my-twitter-backend.onrender.com/users/get/${user.handle}`)
      .then((data) => {
        dispatch(login(data.data));
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
