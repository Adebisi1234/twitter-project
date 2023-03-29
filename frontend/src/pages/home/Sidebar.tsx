import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/userSlice";
const Sidebar = ({ setNewTheme }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  let location = useLocation();
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
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-7 h-7 !bg-transparent"
                  >
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
            {location.pathname === "/" || location.pathname === "/home" ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-7 h-7 !bg-transparent"
              >
                <g>
                  <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-7 h-7 !bg-transparent"
              >
                <g>
                  <path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"></path>
                </g>
              </svg>
            )}
            Home
          </li>
        </Link>
        <Link to="/profile">
          <li className="flex p-2 rounded-3xl gap-6  ">
            {location.pathname.includes("profile") ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-7 h-7 !bg-transparent"
              >
                <g>
                  <path d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-7 h-7 !bg-transparent"
              >
                <g>
                  <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                </g>
              </svg>
            )}
            Profile
          </li>
        </Link>
        <Link to="/messages">
          <li className="flex gap-6  p-2 rounded-3xl">
            {location.pathname.includes("message") ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-7 h-7 !bg-transparent"
              >
                <g>
                  <path d="M1.998 4.499c0-.828.671-1.499 1.5-1.499h17c.828 0 1.5.671 1.5 1.499v2.858l-10 4.545-10-4.547V4.499zm0 5.053V19.5c0 .828.671 1.5 1.5 1.5h17c.828 0 1.5-.672 1.5-1.5V9.554l-10 4.545-10-4.547z"></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-7 h-7 !bg-transparent"
              >
                <g>
                  <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                </g>
              </svg>
            )}
            Messages
          </li>
        </Link>
        <Link to="/notifications">
          <li className="flex gap-6 p-2 rounded-3xl">
            <div className="relative w-7 h-7 !bg-transparent">
              {location.pathname.includes("not") ? (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-7 h-7 !bg-transparent"
                >
                  <g>
                    <path d="M11.996 2c-4.062 0-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958C19.48 5.017 16.054 2 11.996 2zM9.171 18h5.658c-.412 1.165-1.523 2-2.829 2s-2.417-.835-2.829-2z"></path>
                  </g>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-7 h-7 !bg-transparent"
                >
                  <g>
                    <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path>
                  </g>
                </svg>
              )}
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
            {location.pathname.includes("search") ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-7 h-7 !bg-transparent"
              >
                <g>
                  <path d="M10.25 4.25c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.657 0 3.155-.67 4.243-1.757 1.087-1.088 1.757-2.586 1.757-4.243 0-3.314-2.686-6-6-6zm-9 6c0-4.971 4.029-9 9-9s9 4.029 9 9c0 1.943-.617 3.744-1.664 5.215l4.475 4.474-2.122 2.122-4.474-4.475c-1.471 1.047-3.272 1.664-5.215 1.664-4.971 0-9-4.029-9-9z"></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 !bg-transparent"
                aria-hidden="true"
              >
                <g>
                  <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                </g>
              </svg>
            )}
            Search
          </li>
        </Link>
        <li
          className="flex gap-6 p-2 rounded-3xl"
          onClick={() => {
            setNewTheme(true);
          }}
        >
          <svg
            className="w-7 h-7 !bg-transparent"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M512 51.2a460.8 460.8 0 0 0 0 921.6c78.5408 0 133.12-40.0384 139.264-102.4 2.3552-23.6544-6.5536-44.9536-15.1552-65.6384-14.336-34.5088-24.6784-59.4944 9.216-93.2864s73.5232-27.4432 119.7056-20.48c29.7984 4.5056 60.416 9.0112 89.1904 1.2288C929.5872 672.0512 972.8 606.208 972.8 512A461.312 461.312 0 0 0 512 51.2z m331.3664 601.9072c-20.48 5.5296-45.568 1.8432-71.68-2.2528-47.4112-7.0656-106.496-15.9744-154.7264 31.9488-53.4528 53.248-33.0752 102.4-18.1248 138.1376a105.2672 105.2672 0 0 1 12.1856 45.8752C604.672 927.1296 533.6064 931.84 512 931.84a419.84 419.84 0 1 1 419.84-419.84c0 43.6224-11.4688 120.1152-88.4736 141.1072z" />
            <path d="M235.52 512m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" />
            <path d="M307.2 337.92m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" />
            <path d="M471.04 245.76m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" />
            <path d="M655.36 276.48m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" />
            <path d="M778.24 419.84m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" />
          </svg>
          Theme
        </li>
      </ul>
      <div className="grow flex items-end">
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
