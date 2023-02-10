import reactLogo from "../../assets/react.svg";
import Header from "../../components/Header";
import ProfilePix from "../../components/ProfilePix";
import Others from "./Others";
import Self from "./Self";

export default function Message() {
  return (
    <div>
      <Header />

      <div className="mt-7 px-10 flex w-full justify-center items-center flex-col gap-1">
        <ProfilePix pp={reactLogo} />
        <h1>Owner</h1>
        <p>@God</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
          recusandae!
        </p>
        <p>10 followers</p>
      </div>

      <div className="message other flex-col flex mt-16 gap-y-10 p-2 ">
        <Others />
        <Self />
      </div>
      <div className="fixed bottom-0 dark:bg-black dark:text-white bg-slate-200 w-full p-2">
        <div className="flex h-9  bottom-0 gap-2 items-center">
          <div className="w-5 h-5 bg-slate-600"></div>
          <div className="w-5 h-5 bg-slate-600"></div>
          <div className="w-5 h-5 bg-slate-600"></div>
          <div>
            <input
              type="text"
              placeholder="Start a new message"
              className="w-full"
            />
          </div>
          <div className="w-5 h-5 bg-slate-600 ml-auto "></div>
        </div>
      </div>
    </div>
  );
}
