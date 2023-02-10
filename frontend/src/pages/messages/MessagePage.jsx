import search from "../../assets/search.png";
import reactLogo from "../../assets/react.svg";
import Header from "../../components/Header";

import ProfilePix from "../../components/ProfilePix";
import Bottom from "../../components/Bottom";

export default function MessagePage() {
  return (
    <div className="dark:bg-black dark:text-white bg-white h-full text-black">
      <Header title="New" text="Messages" />
      <div className="input dark:bg-black bg-white px-20 flex gap-3 rounded-3xl w-full p-2 mb-3 mt-3">
        <div className="w-7 dark:bg-[url('/src/assets/searchDark.png')] bg-[url('/src/assets/search.png')] bg-left bg-cover h-7"></div>

        <input
          type="text"
          placeholder="Search Direct Messages"
          className="w-full bg-transparent outline-none "
        />
      </div>
      <div className="flex gap-3 mb-8 pl-3">
        <ProfilePix pp={reactLogo} />
        <div className="flex-col w-full">
          <h1 className=" flex gap-3">
            Mechanic <span>@owner</span> • jan 30
          </h1>
          <p className="opacity-70">Not Yet Complete</p>
        </div>
      </div>
      <div className="flex gap-3 mb-8 pl-3">
        <ProfilePix pp={reactLogo} />
        <div className="flex-col w-full">
          <h1 className=" flex gap-3">
            Mechanic <span>@owner</span> • jan 30
          </h1>
          <p className="opacity-70">Not Yet Complete</p>
        </div>
      </div>
      <div className="flex gap-3 mb-8 pl-3">
        <ProfilePix pp={reactLogo} />
        <div className="flex-col w-full">
          <h1 className=" flex gap-3">
            Mechanic <span>@owner</span> • jan 30
          </h1>
          <p className="opacity-70">Not Yet Complete</p>
        </div>
      </div>
      <div className="flex gap-3 mb-8 pl-3">
        <ProfilePix pp={reactLogo} />
        <div className="flex-col w-full">
          <h1>
            Mechanic <span>@owner</span> • jan 30
          </h1>
          <p className="opacity-70">Not Yet Complete</p>
        </div>
      </div>
      <Bottom />
    </div>
  );
}
