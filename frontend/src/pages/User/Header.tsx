import { Link } from "react-router-dom";
import React from "react";
import Logo from "../../components/Logo";

export default function Header({
  user,
  tweets,
}: {
  user: string;
  tweets: number;
}) {
  return (
    <header className="w-full flex h-12 p-2 border-b items-center gap-3">
      <div className="arrow h-full w-10">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="user w-full">
        <h2>{user}</h2>
        <small className="font-thin opacity-60">{tweets} Tweets</small>
      </div>
    </header>
  );
}
