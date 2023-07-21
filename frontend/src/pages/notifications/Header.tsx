import { useRef } from "react";
import { Link } from "react-router-dom";
import React from "react";
import Logo from "../../components/Logo";

export default function Header({
  setMentions,
}: {
  setMentions: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const all = useRef<HTMLDivElement>(null);
  const mentions = useRef<HTMLDivElement>(null);
  return (
    <header className="w-full flex flex-col p-2   dark:border-b items-center gap-3">
      <div className="flex w-full h-12 gap-3">
        <div className="arrow h-full w-10">
          <Link to="/">
            <Logo />
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
            all.current?.classList.add("border-b-4");
            mentions.current?.classList.remove("border-b-4");
            setMentions(false);
          }}
          className="border-b-4 !border-[var(--button-primary)]"
        >
          All
        </div>
        <div
          ref={mentions}
          onClick={() => {
            all.current?.classList.remove("border-b-4");
            mentions.current?.classList.add("border-b-4");
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
