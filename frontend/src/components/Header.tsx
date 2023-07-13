import { Link } from "react-router-dom";
import React from "react";
import Logo from "./Logo";

const Header = ({ title, text }: { title?: string; text?: string }) => {
  return (
    <header className="w-full flex h-12 p-2 mt-2 bg-[var(--bg-primary)] text-[var(--color)] items-center gap-3 justify-between">
      <div className="arrow h-full w-10">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      {text && <h1 className="font-bold mr-auto">{text}</h1>}
      {title && (
        <button className="py-2 px-4 rounded-3xl border">{title}</button>
      )}
    </header>
  );
};

export default Header;
