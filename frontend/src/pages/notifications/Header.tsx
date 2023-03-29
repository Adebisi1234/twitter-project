import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Header({ setMentions }) {
  const all = useRef();
  const mentions = useRef();
  return (
    <header className="w-full flex flex-col p-2 dark:bg-black dark:text-white dark:border-b items-center gap-3">
      <div className="flex w-full h-12 gap-3">
        <div className="arrow h-full w-10">
          <Link to="/">
            <div className="w-8 bg-[url('/src/assets/logoDark.jpg')] dark:bg-[url('/src/assets/logo.jpg')] bg-cover h-8"></div>
          </Link>
        </div>
        <div className="user w-full">
          <h2>Notifications</h2>
        </div>
      </div>
      <div className="flex w-3/4 justify-evenly gap-3">
        <div
          ref={all}
          onClick={() => {
            all.current.classList.add("border-b-4");
            mentions.current.classList.remove("border-b-4");
            setMentions(false);
          }}
          className="border-b-4 !border-[var(--button-primary)]"
        >
          All
        </div>
        <div
          ref={mentions}
          onClick={() => {
            all.current.classList.remove("border-b-4");
            mentions.current.classList.add("border-b-4");
            setMentions(true);
          }}
          className=" !border-[var(--button-primary)]"
        >
          Mentions
        </div>
      </div>
    </header>
  );
}
