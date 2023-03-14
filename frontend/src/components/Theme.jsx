import React from "react";
import Tweet from "../components/Tweet";

export default function Theme({ setNewTheme }) {
  function setColor(color) {
    document.documentElement.style.setProperty("--button-primary", color);
  }
  function setBg(color) {
    if (color === "white") {
      document.documentElement.style.setProperty("--bg-light", color);
      document.documentElement.style.setProperty(
        "--bg-lessDark",
        "rgba(171, 182, 182, 0.574)"
      );
      document.documentElement.style.setProperty("--bg-dark", color);
      document.documentElement.style.setProperty("--color-light", "black");
      document.documentElement.style.setProperty("--color-dark", "black");
    } else {
      document.documentElement.style.setProperty("--bg-light", color);
      document.documentElement.style.setProperty("--bg-dark", color);
      document.documentElement.style.setProperty("--color-light", "white");
      document.documentElement.style.setProperty("--color-dark", "white");
    }
  }
  return (
    <div className="w-fit h-fit max-w-xl tagging flex flex-col items-center justify-center gap-2 px-2 pb-1">
      <header className="w-full flex gap-5 p-3 items-center">
        <p
          onClick={() => {
            setNewTheme(false);
          }}
        >
          X
        </p>
        <h1>Customize your view</h1>
      </header>

      <div className="color w-full">
        <h3 className="mb-2">Color</h3>
        <div className="colors  gap-x-14 gap-y-3 grid grid-cols-3 !bg-[var(--bg-lessDark)] py-3 rounded-md px-4 justify-between w-full">
          <div
            className="blue rounded-full w-9 h-9 !bg-blue-500"
            onClick={() => {
              setColor("blue");
            }}
          ></div>
          <div
            className="yellow rounded-full w-9 h-9 !bg-yellow-500"
            onClick={() => {
              setColor("yellow");
            }}
          ></div>
          <div
            className="pink rounded-full w-9 h-9 !bg-pink-500"
            onClick={() => {
              setColor("pink");
            }}
          ></div>
          <div
            className="purple rounded-full w-9 h-9 !bg-purple-500"
            onClick={() => {
              setColor("purple");
            }}
          ></div>
          <div
            className="orange rounded-full w-9 h-9 !bg-orange-500"
            onClick={() => {
              setColor("orange");
            }}
          ></div>
          <div
            className="green rounded-full w-9 h-9 !bg-green-500"
            onClick={() => {
              setColor("green");
            }}
          ></div>
        </div>
      </div>
      <div className="background p-2 w-full">
        <h3 className="mb-2">Background</h3>
        <div className="flex flex-col gap-y-3 dark:!bg-[var(--bg-lessDark)] py-3 rounded-md px-4 justify-between w-full">
          <div className="!bg-white w-full h-12 flex items-center gap-2 border-4">
            <div className="w-8 h-8 rounded-full overflow-hidden mx-[20%]">
              <input
                type="checkbox"
                name="change"
                className="h-[101%] w-[101%] themes"
                onClick={(e) => {
                  let themes = document.getElementsByClassName("themes");
                  themes = [...themes];
                  themes.forEach((element) => {
                    if (element === e.target) {
                      e.target.checked = true;
                      setBg("white");
                    } else {
                      element.checked = false;
                    }
                  });
                }}
              />
            </div>
            <p className="!text-[var(--button-primary)] !bg-transparent">DAY</p>
          </div>
          <div className="!bg-black/70 w-full h-12 flex items-center gap-2 border-4">
            <div className="w-8 h-8 rounded-full overflow-hidden mx-[20%]">
              <input
                type="checkbox"
                name="change"
                className="h-[101%] w-[101%] themes"
                onClick={(e) => {
                  let themes = document.getElementsByClassName("themes");
                  themes = [...themes];
                  themes.forEach((element) => {
                    if (element === e.target) {
                      e.target.checked = true;
                      setBg("rgb(24,34,45)");
                    } else {
                      element.checked = false;
                    }
                  });
                }}
              />
            </div>
            <p className="!text-[var(--button-primary)] !bg-transparent">DIM</p>
          </div>
          <div className="!bg-black w-full h-12 flex items-center gap-2 border-4">
            <div className="w-8 h-8 rounded-full overflow-hidden mx-[20%]">
              <input
                type="checkbox"
                name="change"
                className="h-[101%] w-[101%] themes"
                onClick={(e) => {
                  let themes = document.getElementsByClassName("themes");
                  themes = [...themes];
                  themes.forEach((element) => {
                    if (element === e.target) {
                      e.target.checked = true;
                      setBg("black");
                    } else {
                      element.checked = false;
                    }
                  });
                }}
              />
            </div>
            <p className="!text-[var(--button-primary)] !bg-transparent">
              NIGHT
            </p>
          </div>
        </div>
      </div>
      <button
        className="rounded-2xl p-2 !bg-[var(--button-primary)]"
        onClick={() => {
          setNewTheme(false);
        }}
      >
        Done
      </button>
    </div>
  );
}
