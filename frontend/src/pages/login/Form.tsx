import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/userSlice";
import axios from "axios";
import HomePage from "../home/HomePage";
import Skeleton from "../../components/Skeleton";
import Button from "../../components/Button";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import google from "../../assets/google.svg";
import { RootState } from "../../app/store";

const Form = () => {
  const img = useRef<HTMLInputElement>(null);
  const errs = useRef<HTMLInputElement>(null!);
  const pass = useRef<HTMLInputElement>(null);
  const userInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        pass.current?.classList.add("!hidden");
        userInput.current?.classList.add("!hidden");
        let email = result.user.email?.includes("@")
          ? result.user.email
          : `@${result.user.email}`;
        img.current?.classList.replace("hidden", "flex");
        console.log(result);
        axios
          .post("https://my-twitter-backend.onrender.com/auth/google", {
            username: result.user.displayName,
            pp: result.user.photoURL,
            handle: email,
            bio: "This profile is from google",
            location: "Nigeria",
            fromGoogle: true,
          })
          .then((data) => {
            console.log(data.data);
            dispatch(login(data.data));
            navigate("/home");
          })
          .catch((err) => {
            errs.current.textContent = err.response.data.message;
          });
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("https://my-twitter-backend.onrender.com/auth/signin", {
        username: username,
        password: password,
      })
      .then((data) => {
        const details = data.data;
        dispatch(login(details));
      })

      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        errs.current.textContent = err.response.data.message;
      });
  };

  return !Object.keys(user).length ? (
    <div className="w-full overflow-hidden  bg-[var(--bg-primary)] text-[var(--color)]">
      <div className=" mx-4 h-screen flex flex-col gap-4 my-36 ">
        <h1 className=" text-3xl text-[var(--color)]  font-bold mb-2">
          Sign in to Clone
        </h1>
        <Button
          onClick={() => signInWithGoogle}
          word="Sign in with google"
          svg={google}
        />
        <div className="flex w-full items-center">
          <div className="border w-full"></div>
          <div>or</div>
          <div className="border w-full"></div>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            required
            type="text"
            placeholder="handle"
            ref={userInput}
            className="w-full pl-2 h-14 border border-1 border-slate-300 "
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
          <input
            required
            type="password"
            id="password"
            ref={pass}
            placeholder="password"
            className="w-full pl-2 h-14 border border-1 border-slate-300 "
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />

          <button
            onClick={() => {
              if (userInput.current?.value && pass.current?.value) {
                img.current?.classList.replace("hidden", "flex");
              }
            }}
            type="submit"
            className="text-[var(--color)] bg-[var(--bg-primary)] hover:bg-[var(--button-primary)]  w-full p-3 mt-2 font-bold rounded-3xl"
          >
            Log in
          </button>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              setUsername("check");
              setPassword("testing");
              const { target }: any = e;
              target.classList.add("hidden");
              img.current?.classList.replace("hidden", "flex");
            }}
            type="submit"
            className="bg-[var(--color)] text-[var(--bg-primary)] hover:bg-[var(--button-primary)]  w-full p-3 mt-2 font-bold rounded-3xl"
          >
            Test Clone out without an account
          </button>
          <div
            className="h-12 w-fit mx-auto hidden justify-center items-center"
            id="img"
            ref={img}
          >
            <Skeleton />
          </div>
          <span id="err" ref={errs}></span>
        </form>

        <p className="">
          Don't have an account?{" "}
          <Link to="/signin" className=" text-[var(--button-primary)] ">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  ) : (
    <HomePage />
  );
};

export default Form;
