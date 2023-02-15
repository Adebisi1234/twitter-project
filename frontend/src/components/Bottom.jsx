import reactLogo from "../assets/react.svg";
import homes from "../assets/homes.png";
import search from "../assets/search.png";
import messages from "../assets/messages.png";
import notifications from "../assets/notifications.png";
import { Link } from "react-router-dom";

const Bottom = () => {
  return (
    <footer className="flex md:hidden fixed bottom-0 bg-white dark:bg-black z-50 p-3 w-full justify-evenly gap-12 items-center">
      <div className="contain gap-2 flex bg-left">
        <Link to="/">
          <div className="w-7 dark:bg-[url('/src/assets/homesDark.png')] bg-[url('/src/assets/homes.png')] bg-left bg-cover h-7"></div>
        </Link>
      </div>
      <div className="contain gap-2 flex">
        <Link to="/search">
          <div className="w-7 dark:bg-[url('/src/assets/searchDark.png')] bg-[url('/src/assets/search.png')] bg-left-bottom bg-cover h-7"></div>
        </Link>
      </div>
      <div className="contain gap-2 flex">
        <Link to="/notifications">
          <div className="w-7 dark:bg-[url('/src/assets/notificationsDark.png')] bg-[url('/src/assets/notifications.png')] bg-left bg-cover bg-no-repeat h-7"></div>
        </Link>
      </div>
      <div className="contain gap-2 flex">
        <Link to="/messages">
          <div className="w-7 dark:bg-[url('/src/assets/messagesDark.png')] bg-[url('/src/assets/messages.png')] bg-left bg-cover h-7"></div>
        </Link>
      </div>
    </footer>
  );
};

export default Bottom;
