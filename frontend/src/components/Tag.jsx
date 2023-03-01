import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

export default function Tag({ query, setContent, content }) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      if (query) {
        axios
          .get(`https://my-twitter-backend.onrender.com/users/some/${query}`)
          .then((data) => {
            setUsers(data.data);
            setLoading(false);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [query]);

  const result = users.map((user) => {
    return (
      <div
        className="user flex py-1 border-b-2 cursor-pointer"
        key={user._id}
        onClick={() => {
          const newContent = content.replace(query, user.handle);
          setContent(newContent);
          setUsers([]);
        }}
      >
        {user.pp ? (
          <img src={user.pp} className="h-14 w-14 rounded-full" />
        ) : (
          <div className="w-14 dark:bg-[url('/src/assets/profileDark.png')] bg-[url('/src/assets/profile.png')] bg-left-bottom bg-cover h-14"></div>
        )}
        <div>
          <h1 className="font-semibold">{user.username}</h1>
          <p>{user.handle}</p>
          <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
            {user.bio}
          </p>
        </div>
      </div>
    );
  });
  return loading || !users.length ? (
    <div
      className="min-h-[100px] max-h-[331.5px] gap-y-1 tagging justify-center items-center overflow-x-hidden min-w-[380px] absolute bg-[rgba(255,255,255,1.00)] border-black flex flex-col rounded-[4px]"
      onClick={() => {
        setUsers([]);
      }}
    >
      <Skeleton />
    </div>
  ) : (
    <div
      className="min-h-[100px] max-h-[331.5px] gap-y-1 tagging overflow-x-hidden min-w-[380px] absolute bg-[rgba(255,255,255,1.00)] border-black flex flex-col rounded-[4px]"
      onClick={() => {
        setUsers([]);
      }}
    >
      {result}
    </div>
  );
}
