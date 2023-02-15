import React from "react";
import { Link } from "react-router-dom";
import Bottom from "../../components/Bottom";
const Search = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex flex-col ml-auto lg:w-[90%] !sticky top-0 gap-4 dark:bg-black dark:text-white h-screen w-full bg-white text-black">
      <div className="input flex gap-3 rounded-3xl p-2 mt-1">
        <Link to="/searchPage">
          <div className="w-7 dark:bg-[url('/src/assets/searchDark.png')] bg-[url('/src/assets/search.png')] bg-left bg-cover h-7"></div>
        </Link>

        <input
          type="text"
          placeholder="Search Clone"
          className="w-full bg-transparent outline-none "
        />
      </div>

      <div className="trends p-1 rounded-2xl mr-2 flex flex-col gap-2">
        <Link to="/searchPage">
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

        <Link to="/searchPage">
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

        <Link to="/searchPage">
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

        <Link to="/searchPage">
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
  );
};

export default Search;
