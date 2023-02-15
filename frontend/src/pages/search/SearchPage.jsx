import React from "react";
import Bottom from "../../components/Bottom";
import Hr from "../../components/Hr";
import Tweet from "../../components/Tweet";

export default function SearchPage() {
  return (
    <>
      <div className="input flex gap-3 rounded-3xl p-2 mt-1">
        <div className="w-7 dark:bg-[url('/src/assets/searchDark.png')] bg-[url('/src/assets/search.png')] bg-left bg-cover h-7"></div>

        <input
          type="text"
          placeholder="Search Clone"
          className="w-full bg-transparent outline-none "
        />
      </div>
      <Tweet author="owner" text="message from me" />
      <Bottom />
    </>
  );
}
