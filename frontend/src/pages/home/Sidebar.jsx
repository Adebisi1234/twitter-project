import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/userSlice";
import home from "../../assets/home.svg";
import search from "../../assets/search.svg";
import message from "../../assets/message.svg";
import notification from "../../assets/notification.svg";
import profile from "../../assets/profile.svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  return Object.keys(user).length ? (
    <div
      className="flex lg:w-[90%] pl-2 z-50 !sticky top-0 flex-col h-screen w-full sidebar"
      id="sidebar"
    >
      <div>
        <div className="flex justify-between p-3 ">
          <h1>Account Info</h1>
          <span
            className="lg:hidden"
            onClick={() => {
              const slide = document.getElementById("slide");
              slide.classList.toggle("-translate-x-full");
            }}
          >
            X
          </span>
        </div>
        <div className="account flex justify-between p-3">
          <div className="user">
            <div className="details mb-3">
              {user.pp ? (
                <img src={user.pp} className="h-7 w-7 !bg-cover rounded-full" />
              ) : (
                <div className="w-9 h-9">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                    </g>
                  </svg>
                </div>
              )}
              <h1>{user.username ? user.username : "owner"}</h1>
              <small>{user.handle ? user.handle : "owner"}</small>
            </div>
            <div className="follow-count mb-4 flex gap-4">
              <div className="following">{user.followingCount} followers</div>
              <div className="followers">{user.followersCount} following</div>
            </div>
          </div>
        </div>
      </div>
      <ul className="p-3 flex flex-col gap-2">
        <Link to="/">
          <li className="flex p-2 rounded-3xl gap-6  ">
            <div className="w-7 h-7 hover:!bg-[var(--button-primary)]">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"></path>
                </g>
              </svg>
            </div>
            Home
          </li>
        </Link>
        <Link to="/profile">
          <li className="flex p-2 rounded-3xl gap-6  ">
            <div className="w-7 h-7 hover:!bg-[var(--button-primary)]">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                </g>
              </svg>
            </div>
            Profile
          </li>
        </Link>
        <Link to="/messages">
          <li className="flex gap-6  p-2 rounded-3xl">
            <div className="w-7 h-7 hover:!bg-[var(--button-primary)]">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                </g>
              </svg>
            </div>
            Messages
          </li>
        </Link>
        <Link to="/notifications">
          <li className="flex gap-6 p-2 rounded-3xl">
            <div className="w-7 relative h-7">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path>
                </g>
              </svg>
              {user.notification !== 0 && (
                <div className="absolute -top-1 -right-1 rounded-full w-4 h-4 !bg-green-500 text-xs !text-white flex justify-center items-center">
                  {user.notification ? user.notification : 0}
                </div>
              )}
            </div>
            Notifications
          </li>
        </Link>
        <Link to="/search">
          <li className="flex gap-6  p-2 rounded-3xl">
            <div className="w-7 h-7 hover:!bg-[var(--button-primary)]">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                </g>
              </svg>
            </div>
            Search
          </li>
        </Link>
      </ul>
      <div className="mt-auto mb-14 md:mb-0">
        <button
          className=" w-full !text-white border-slate-300 border !bg-red-500 h-10 flex p-3 gap-1 mb-20 lg:mb-0 justify-center items-center rounded-3xl"
          onClick={() => {
            localStorage.clear();
            dispatch(logout());
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Sidebar;
