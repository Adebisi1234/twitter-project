import Header from "../../components/Header";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Bottom from "../../components/Bottom";

export default function People() {
  const user = useSelector((state) => state.user.user);

  const people = user.following.map((follower) => {
    return (
      <Link
        to={`/messages/message/${JSON.stringify({
          message: {},
          handle: follower,
        })}`}
        key={follower}
      >
        <div className="flex gap-3 mb-8 pl-3">
          <div className="w-full">
            <h1 className="font-bold">{follower}</h1>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <div className="dark:bg-black dark:text-white bg-white h-full text-black">
      <Header text="Messages" />
      <div className="input dark:bg-black bg-white px-20 flex gap-3 rounded-3xl w-full p-2 mb-3 mt-3">
        <div className="w-7 dark:bg-[url('/src/assets/searchDark.png')] bg-[url('/src/assets/search.png')] bg-left bg-cover h-7"></div>

        <input
          type="text"
          placeholder="Search People"
          className="w-full bg-transparent outline-none "
        />
      </div>
      {people.length
        ? people
        : "No followers found, someone needs to follow you to send a message"}
      <Bottom />
    </div>
  );
}
