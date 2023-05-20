import { useRef } from "react";
const Header = ({
  imgs,
  slide,
  setIsFollowing,
  setNewTheme,
}: {
  imgs: string;
  slide: React.RefObject<HTMLDivElement>;
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  setNewTheme: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const you = useRef<HTMLSpanElement>(null);
  const follow = useRef<HTMLSpanElement>(null);
  return (
    <header className="w-full dark:text-[var(--color-dark)] border-b-2 bg-transparent backdrop-blur-lg z-30 text-[var(--color-white)] sticky top-0">
      <div className="flex w-full justify-between p-2 border-b-2">
        {imgs && window.innerWidth < 756 ? (
          <img
            src={imgs}
            className="h-7 rounded-full"
            onClick={() => {
              slide.current?.classList.toggle("-translate-x-full");
            }}
          />
        ) : (
          window.innerWidth < 756 && (
            <div
              className="w-7 lg:hidden h-7"
              onClick={() => {
                slide.current?.classList.toggle("-translate-x-full");
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

        <div className="h-full header w-fit ml-auto flex justify-center items-center font-extrabold">
          <div
            className="w-8 bg-[url('/src/assets/logoDark.jpg')] dark:bg-[url('/src/assets/logo.jpg')] bg-cover h-8"
            id="logo"
          ></div>
        </div>
        <div className="h-full w-fit flex justify-end items-end ml-auto">
          <svg
            className="w-8 h-8"
            viewBox="0 0 1024 1024"
            onClick={() => {
              setNewTheme(true);
            }}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M512 51.2a460.8 460.8 0 0 0 0 921.6c78.5408 0 133.12-40.0384 139.264-102.4 2.3552-23.6544-6.5536-44.9536-15.1552-65.6384-14.336-34.5088-24.6784-59.4944 9.216-93.2864s73.5232-27.4432 119.7056-20.48c29.7984 4.5056 60.416 9.0112 89.1904 1.2288C929.5872 672.0512 972.8 606.208 972.8 512A461.312 461.312 0 0 0 512 51.2z m331.3664 601.9072c-20.48 5.5296-45.568 1.8432-71.68-2.2528-47.4112-7.0656-106.496-15.9744-154.7264 31.9488-53.4528 53.248-33.0752 102.4-18.1248 138.1376a105.2672 105.2672 0 0 1 12.1856 45.8752C604.672 927.1296 533.6064 931.84 512 931.84a419.84 419.84 0 1 1 419.84-419.84c0 43.6224-11.4688 120.1152-88.4736 141.1072z" />
            <path d="M235.52 512m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" />
            <path d="M307.2 337.92m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" />
            <path d="M471.04 245.76m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" />
            <path d="M655.36 276.48m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" />
            <path d="M778.24 419.84m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center h-11 w-full">
        <button
          className=" w-full h-full"
          onClick={() => {
            you.current?.classList.add("border-b-4");
            follow.current?.classList.remove("border-b-4");
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
            you.current?.classList.remove("border-b-4");
            follow.current?.classList.add("border-b-4");
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
