import React from "react";
import Bottom from "../../components/Bottom";
const Search = () => {
  const game = undefined;
  return (
    game && (
      <div className="flex flex-col ml-auto lg:w-[90%] !sticky top-0 gap-4 dark:bg-black dark:text-white h-screen w-full bg-white text-black">
        <div className="input flex gap-3 rounded-3xl p-2 mt-1">
          <div className="w-7 dark:bg-[url('/src/assets/searchDark.png')] bg-[url('/src/assets/search.png')] bg-left bg-cover h-7"></div>

          <input
            type="text"
            placeholder="Search Clone"
            className="w-full bg-transparent outline-none "
          />
        </div>

        <div className="trends p-1 rounded-2xl mr-2 pl-4 pb-3  flex flex-col gap-2">
          <div className="trend mr-3 mb-2">
            <div className="trending flex justify-between items-center">
              <small className=" font-light opacity-70 ">Trending now</small>
              <small className=" font-light  opacity-70 ">•••</small>
            </div>

            <h1>#HireMe</h1>

            <div className="trending flex justify-between items-center">
              <small className=" font-light  opacity-70 ">200 tweets</small>
            </div>
          </div>

          <div className="trend mr-3 mb-2">
            <div className="trending flex justify-between items-center">
              <small className=" font-light  opacity-70 ">Trending now</small>
              <small className=" font-light  opacity-70 ">•••</small>
            </div>

            <h1>#HireMe</h1>

            <div className="trending flex justify-between items-center">
              <small className=" font-light opacity-70 ">200 tweets</small>
            </div>
          </div>

          <div className="trend mr-3 mb-2">
            <div className="trending flex justify-between items-center">
              <small className=" font-light opacity-70 ">Trending now</small>
              <small className=" font-light opacity-70 ">•••</small>
            </div>

            <h1>#HireMe</h1>

            <div className="trending flex justify-between items-center">
              <small className=" font-light opacity-70 ">200 tweets</small>
            </div>
          </div>

          <div className="trend mr-3 mb-2">
            <div className="trending flex justify-between items-center">
              <small className=" font-light opacity-70 ">Trending now</small>
              <small className=" font-light opacity-70 ">•••</small>
            </div>

            <h1>#HireMe</h1>

            <div className="trending flex justify-between items-center">
              <small className=" font-light  opacity-70 ">200 tweets</small>
            </div>
          </div>

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
    )
  );
};

export default Search;
