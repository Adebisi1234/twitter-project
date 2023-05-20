export default function Theme({
  setNewTheme,
}: {
  setNewTheme: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function setColor(color: string) {
    document.documentElement.style.setProperty("--button-primary", color);
  }
  function setBg(color: string) {
    if (color === "white") {
      document.documentElement.style.setProperty("--bg-light", color);
      document.documentElement.style.setProperty(
        "--bg-lessDark",
        "rgba(171, 182, 182, 0.574)"
      );
      if (document.getElementById("logo")) {
        document
          .getElementById("logo")
          ?.classList.remove("dark:bg-[url('/src/assets/logo.jpg')]");
        document
          .getElementById("logo")
          ?.classList.remove("bg-[url('/src/assets/logo.jpg')]");
        document
          .getElementById("logo")
          ?.classList.add("bg-[url('/src/assets/logoDark.jpg')]");
      }
      document.documentElement.style.setProperty("--bg-dark", color);
      document.documentElement.style.setProperty("--color-light", "black");
      document.documentElement.style.setProperty("--color-dark", "black");
    } else {
      if (document.getElementById("logo")) {
        document
          .getElementById("logo")
          ?.classList.add("bg-[url('/src/assets/logo.jpg')]");
        document
          .getElementById("logo")
          ?.classList.remove("bg-[url('/src/assets/logoDark.jpg')]");
      }

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
            className="blue rounded-full w-9 h-9 !bg-[#1d9bf0]"
            onClick={() => {
              setColor("#1d9bf0");
            }}
          ></div>
          <div
            className="yellow rounded-full w-9 h-9 !bg-[#FFD400]"
            onClick={() => {
              setColor("#FFD400");
            }}
          ></div>
          <div
            className="pink rounded-full w-9 h-9 !bg-[#F91880]"
            onClick={() => {
              setColor("#F91880");
            }}
          ></div>
          <div
            className="purple rounded-full w-9 h-9 !bg-[#7856FF]"
            onClick={() => {
              setColor("#7856FF");
            }}
          ></div>
          <div
            className="orange rounded-full w-9 h-9 !bg-[#ff7a00]"
            onClick={() => {
              setColor("#ff7a00");
            }}
          ></div>
          <div
            className="green rounded-full w-9 h-9 !bg-[#00ba7c]"
            onClick={() => {
              setColor("#00ba7c");
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
                  const themesArr = [...themes] as HTMLInputElement[];
                  themesArr.forEach((element) => {
                    if (element === e.target) {
                      const target = e.target as HTMLInputElement;
                      target.checked = true;
                      setBg("white");
                    } else {
                      element.checked = false;
                    }
                  });
                }}
              />
            </div>
            <p className="!text-[var(--button-primary)] !bg-transparent">
              Default
            </p>
          </div>
          <div className="!bg-[rgb(24,34,45)] w-full h-12 flex items-center gap-2 border-4">
            <div className="w-8 h-8 rounded-full overflow-hidden mx-[20%]">
              <input
                type="checkbox"
                name="change"
                className="h-[101%] w-[101%] themes"
                onClick={(e) => {
                  let themes = document.getElementsByClassName("themes");
                  const themesArr = [...themes] as HTMLInputElement[];
                  themesArr.forEach((element) => {
                    if (element === e.target) {
                      const target = e.target as HTMLInputElement;
                      target.checked = true;
                      setBg("rgb(24,34,45)");
                    } else {
                      element.checked = false;
                    }
                  });
                }}
              />
            </div>
            <p className="!text-[var(--button-primary)] !bg-transparent">Dim</p>
          </div>
          <div className="!bg-black w-full h-12 flex items-center gap-2 border-4">
            <div className="w-8 h-8 rounded-full overflow-hidden mx-[20%]">
              <input
                type="checkbox"
                name="change"
                className="h-[101%] w-[101%] themes"
                onClick={(e) => {
                  let themes = document.getElementsByClassName("themes");
                  const themesArr = [...themes] as HTMLInputElement[];
                  themesArr.forEach((element) => {
                    if (element === e.target) {
                      const target = e.target as HTMLInputElement;
                      target.checked = true;
                      setBg("black");
                    } else {
                      element.checked = false;
                    }
                  });
                }}
              />
            </div>
            <p className="!text-[var(--button-primary)] !bg-transparent">
              Night
            </p>
          </div>
        </div>
      </div>
      <button
        className="rounded-2xl p-2 !bg-[var(--button-primary)] !text-white"
        onClick={() => {
          setNewTheme(false);
        }}
      >
        Done
      </button>
    </div>
  );
}
