import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bottom from "../../components/Bottom";
import Header from "./Header";
import axios from "axios";
import Note from "./Note";
import Skeleton from "../../components/Skeleton";
import { login } from "../../features/auth/userSlice";
import { User } from "../../types/User";
import { RootState } from "../../app/store";

interface Notes {
  _id: string;
  text: string;
  action: string;
  actionHandle: string;
  pp: string;
  PostId: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notes[]>([]);
  const [loading, setLoading] = useState(true);
  const [mentions, setMentions] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const observer = useRef<any>();
  const ref = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("visible");
          getNewNotifications(page);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  // Getting new Notifications after pargination
  const getNewNotifications = async (page: number) => {
    setIsFetching(true);
    const { data } = await axios.get(
      `https://my-twitter-backend.onrender.com/notifications/all/${user.handle}/${page}`
    );
    if (data.length) {
      setNotifications((prev: Notes[]) => {
        return [...new Set([...notifications, ...data])];
      });
    } else {
      setHasMore(false);
    }
    setIsFetching(false);
    setPage((page) => page + 1);
  };
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
  console.log(page);

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
        <div className="last" ref={ref} key={note._id}>
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

  return (
    <>
      {!loading ? (
        <div className="bg-[var(--bg-primary)] ">
          <Header setMentions={setMentions} />
          {notifications.length ? (
            <div className="pl-2">
              {!mentions ? notes : mention ? mention : <p>No mentions</p>}
              {!hasMore && <p className="text-center font-bold">.</p>}
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
