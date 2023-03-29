import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Bottom from "../../components/Bottom";
import Skeleton from "../../components/Skeleton";
import Tag from "../../components/Tag";
const Search = () => {
  const user = useSelector((state) => state.user.user);
  const tags = useRef();
  const input = useRef();
  const [match, setMatch] = useState("");
  const [query, setQuery] = useState("");
  return Object.keys(user).length ? (
    <div className="flex flex-col ml-auto lg:w-[90%] !sticky top-0 gap-4 dark:bg-black dark:text-white h-screen w-full bg-white text-black">
      <div className="input flex gap-3 rounded-3xl p-2 mt-1">
        <Link to={`/searchPage/${query}`}>
          <div className="w-7 h-7">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
              </g>
            </svg>
          </div>
        </Link>

        <div className="w-full">
          <input
            type="text"
            id="search"
            ref={input}
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
                tags.current.classList.remove("!hidden");
              } else if (
                e.key === " " ||
                (query === "" && e.key === "Backspace") ||
                query === ""
              ) {
                tags.current.classList.add("!hidden");
                setMatch("");
              }
            }}
          />
          <div className="relative w-full">
            <div
              className="absolute top-0 z-50 -left-7 !hidden"
              id="searchTags"
              ref={tags}
              onClick={() => {
                input.current.focus();
                tags.current.classList.add("!hidden");
              }}
            >
              <Tag query={match} />
            </div>
          </div>
        </div>
      </div>

      <div className="trends p-1 rounded-2xl mr-2 flex flex-col gap-2">
        <Link to="/searchPage/hireMe">
          <div className="trend mr-3 p-2 rounded-2xl mb-2">
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
