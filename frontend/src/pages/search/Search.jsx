import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Bottom from "../../components/Bottom";
import Skeleton from "../../components/Skeleton";
import Tag from "../../components/Tag";
const Search = () => {
  const user = useSelector((state) => state.user.user);
  const [match, setMatch] = useState("");
  const [query, setQuery] = useState("");
  return Object.keys(user).length ? (
    <div className="flex flex-col ml-auto lg:w-[90%] !sticky top-0 gap-4 dark:bg-black dark:text-white h-screen w-full bg-white text-black">
      <div className="input flex gap-3 rounded-3xl p-2 mt-1">
        <Link to={`/searchPage/${query}`}>
          <div className="w-7 dark:bg-[url('/src/assets/searchDark.png')] bg-[url('/src/assets/search.png')] bg-left bg-cover h-7"></div>
        </Link>

        <div className="w-full">
          <input
            type="text"
            id="search"
            placeholder="Search Clone"
            className="w-full bg-transparent outline-none "
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              const regex = e.target.value
                .slice(e.target.value.lastIndexOf("@"))
                .match(/@\S+/);
              if (regex) {
                setMatch(regex[0]);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "@") {
                document
                  .getElementById("searchTags")
                  .classList.remove("!hidden");
              } else if (
                e.key === " " ||
                (query === "" && e.key === "Backspace") ||
                query === ""
              ) {
                document.getElementById("searchTags").classList.add("!hidden");
                setMatch("");
              }
            }}
          />
          <div className="relative w-full">
            <div
              className="absolute top-0 z-50 -left-7 !hidden"
              id="searchTags"
              onClick={() => {
                document.getElementById("search").focus();
                document.getElementById("searchTags").classList.add("!hidden");
              }}
            >
              <Tag query={match} content={query} setContent={setQuery} />
            </div>
          </div>
        </div>
      </div>

      <div className="trends p-1 rounded-2xl mr-2 flex flex-col gap-2">
        <Link to="/searchPage/hireMe">
          <div className="trend mr-3 p-2 rounded-2xl  mb-2">
            <div className="trending flex justify-between items-center">
              <small className="opacity-70 ">Trending now</small>
              <small className=" opacity-70 ">•••</small>
            </div>

            <h1>#HireMe</h1>

            <div className="trending flex justify-between items-center">
              <small className=" opacity-70 ">200 tweets</small>
            </div>
          </div>
        </Link>

        <Link to="/searchPage/hireMe">
          <div className="trend mr-3 p-2 rounded-2xl mb-2">
            <div className="trending flex justify-between items-center">
              <small className=" opacity-70 ">Trending now</small>
              <small className=" opacity-70 ">•••</small>
            </div>

            <h1>#HireMe</h1>

            <div className="trending flex justify-between items-center">
              <small className="opacity-70 ">200 tweets</small>
            </div>
          </div>
        </Link>

        <Link to="/searchPage/hireMe">
          <div className="trend mr-3 p-2 rounded-2xl mb-2">
            <div className="trending flex justify-between items-center">
              <small className="opacity-70 ">Trending now</small>
              <small className="opacity-70 ">•••</small>
            </div>

            <h1>#HireMe</h1>

            <div className="trending flex justify-between items-center">
              <small className="opacity-70 ">200 tweets</small>
            </div>
          </div>
        </Link>

        <Link to="/searchPage/hireMe">
          <div className="trend mr-3 p-2 rounded-2xl mb-2">
            <div className="trending flex justify-between items-center">
              <small className="opacity-70 ">Trending now</small>
              <small className="opacity-70 ">•••</small>
            </div>

            <h1>#HireMe</h1>

            <div className="trending flex justify-between items-center">
              <small className=" opacity-70 ">200 tweets</small>
            </div>
          </div>
        </Link>

        <a href="#" className="text-teal-500">
          Show more
        </a>
      </div>

      <div className="p-2 terms rounded-2xl flex flex-wrap gap-4">
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
        <p>Cookie Policy</p>
        <p>Imprint</p>
        <p>Ads Info</p>
      </div>
      <Bottom />
    </div>
  ) : (
    ""
  );
};

export default Search;
