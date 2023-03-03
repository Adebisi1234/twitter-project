import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Bottom = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <footer className="flex lg:hidden fixed bottom-0 bg-white dark:bg-black z-50 p-3 w-full justify-evenly gap-12 items-center">
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
          <div className="w-7 dark:bg-[url('/src/assets/notificationsDark.png')] relative bg-[url('/src/assets/notifications.png')] bg-left bg-cover bg-no-repeat h-7">
            {user.notification !== 0 && (
              <div className="absolute -top-1 -right-1 rounded-full w-4 h-4 !bg-green-500 text-xs !text-white flex justify-center items-center">
                {user.notification}
              </div>
            )}
          </div>
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
