import { useRef } from "react";
import profile from "../../assets/profile.svg";
const Header = ({ imgs, slide, setIsFollowing }) => {
  const you = useRef();
  const follow = useRef();
  return (
    <header className="w-full dark:text-white border-b-2 bg-transparent backdrop-blur-lg sticky top-0 text-black">
      <div className="flex w-full p-2 border-b-2">
        {imgs && window.innerWidth < 756 ? (
          <img
            src={imgs}
            className="h-7 rounded-full"
            onClick={() => {
              slide.current.classList.toggle("-translate-x-full");
            }}
          />
        ) : (
          window.innerWidth < 756 && (
            <div
              className="w-7 lg:hidden h-7"
              onClick={() => {
                slide.current.classList.toggle("-translate-x-full");
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                </g>
              </svg>
            </div>
          )
        )}

        <div className="h-full header w-full flex justify-center items-center font-extrabold">
          <div className="w-8 bg-[url('/src/assets/logoDark.jpg')] dark:bg-[url('/src/assets/logo.jpg')] bg-cover h-8"></div>
        </div>
      </div>
      <div className="flex items-center h-11 w-full">
        <button
          className=" w-full h-full border-r-2"
          onClick={() => {
            you.current.classList.add("border-b-4");
            follow.current.classList.remove("border-b-4");
            setIsFollowing(false);
          }}
        >
          <span
            className="pb-[6px] !border-b-[var(--button-primary)] border-b-4"
            ref={you}
          >
            For You
          </span>
        </button>
        <button
          className="w-full h-full"
          onClick={() => {
            you.current.classList.remove("border-b-4");
            follow.current.classList.add("border-b-4");
            setIsFollowing(true);
          }}
        >
          <span
            className="pb-[6px] !border-b-[var(--button-primary)]"
            ref={follow}
          >
            Following
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
