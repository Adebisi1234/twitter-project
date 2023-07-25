import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";
import { User } from "../types/User";

export default function Tag({
  query,
  setContent,
  content,
}: {
  query?: string;
  setContent?: React.Dispatch<React.SetStateAction<string>>;
  content?: string;
}) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>();
  const navigate = useNavigate();

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

  const result = users?.map((user) => {
    if (content && setContent) {
      return (
        <div
          className="user flex py-1 border-b-2 cursor-pointer"
          key={user._id}
          onClick={() => {
            const newContent = content.replace(query!, user.handle);
            setContent(newContent);
            setUsers([]);
          }}
        >
          {user.pp ? (
            <img
              loading="lazy"
              decoding="async"
              src={user.pp}
              className="h-14 w-14 rounded-full"
            />
          ) : (
            <div className="w-14 bg-left-bottom bg-cover h-14">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                </g>
              </svg>
            </div>
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
    } else {
      return (
        <div
          className="user flex py-1 border-b-2 cursor-pointer"
          key={user._id}
          onClick={() => {
            navigate(`/profile/poster/${user.handle}`);
          }}
        >
          {user.pp ? (
            <img
              loading="lazy"
              decoding="async"
              src={user.pp}
              className="h-14 w-14 rounded-full"
            />
          ) : (
            <div className="w-14 h-14">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                </g>
              </svg>
            </div>
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
    }
  });
  return loading || !users?.length ? (
    <div
      className="min-h-[100px] max-h-[331.5px] gap-y-1 tagging justify-center items-center overflow-x-hidden min-w-[380px] absolute bg-[var(-bg-secondary)] text-[var(--color)] flex flex-col rounded-[4px]"
      onClick={() => {
        setUsers([]);
      }}
    >
      <Skeleton />
    </div>
  ) : (
    <div
      className="min-h-[100px] max-h-[331.5px] gap-y-1 tagging overflow-x-hidden min-w-[380px] absolute bg-[var(-bg-secondary)] text-[var(--color)] flex flex-col rounded-[4px]"
      onClick={() => {
        setUsers([]);
      }}
    >
      {result}
    </div>
  );
}
