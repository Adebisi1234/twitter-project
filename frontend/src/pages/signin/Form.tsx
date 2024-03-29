import axios from "axios";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/userSlice";
import HomePage from "../home/HomePage";
import { auth, provider } from "../../firebase";
import { UserCredential, signInWithPopup } from "firebase/auth";
import google from "../../assets/google.svg";
import Button from "../../components/Button";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import Skeleton from "../../components/Skeleton";
import { User } from "../../types/User";
import { RootState } from "../../app/store";

const Form = () => {
  const [username, setUsername] = useState("");
  const [fromGoogle, setFromGoogle] = useState(false);

  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [handle, setHandle] = useState("");

  const [uploadPPStatus, setUploadPPStatus] = useState("");
  const [uploadCoverStatus, setUploadCoverStatus] = useState("");
  const [Pp, setPp] = useState("");
  const [CoverImg, setCoverImg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pass = useRef<HTMLInputElement>(null);
  const ppLabel = useRef<HTMLInputElement>(null);
  const coverLabel = useRef<HTMLInputElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const errs = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user.user);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        setUsername(result.user.displayName!);
        let userHandle = result.user.email?.replace("@gmail.com", "");
        setHandle(`@${userHandle}`);
        setBio("This profile is from google");
        setFromGoogle(true);

        pass.current?.classList.add("!hidden");
        ppLabel.current?.classList.add("!hidden");
      })
      .catch((err) => console.log(err));
  };

  const uploadPP = (file: Blob) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPPStatus(`${Math.floor(progress)}% uploading please wait`);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setPp(downloadURL);
          setUploadPPStatus("Uploaded");
          ppLabel.current?.setAttribute("readOnly", "true");
        });
      }
    );
  };
  const uploadCover = (file: Blob) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadCoverStatus(`${Math.floor(progress)}% uploading please wait`);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setCoverImg(downloadURL);
          setUploadCoverStatus("Uploaded");

          coverLabel.current?.setAttribute("readOnly", "true");
        });
      }
    );
  };

  return !Object.keys(user).length ? (
    <div className="h-full bg-[var(--bg-primary)] text-[var(--color)]">
      <div className=" mx-4 h-fit flex flex-col gap-4 my-14 ">
        <h1 className=" text-3xl  font-bold mb-2">Join Clone today</h1>
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
        <div className="input handle border p-3">
          <label htmlFor="handle" className="block">
            handle:
          </label>
          <div className="flex">
            <span>@</span>
            <input
              required
              value={handle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value[e.target.value.length - 1] !== "@" &&
                  setHandle(e.target.value);
              }}
              type="text"
              id="handle"
              name="handle"
              className="border-b w-full"
            />
          </div>
        </div>
        <div className="input border p-3 username">
          <label htmlFor="username" className="block">
            username:
          </label>
          <input
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            id="username"
            name="username"
            className="border-b w-full"
          />
        </div>
        <div className="input border p-3 password">
          <label htmlFor="password" className="block">
            password:
          </label>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            ref={pass}
            name="password"
            className="border-b w-full"
          />
        </div>
        <div className="input border p-3 bio">
          <label htmlFor="bio" className="block">
            bio:
          </label>
          <input
            required
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            type="text"
            id="bio"
            name="bio"
            className="border-b w-full"
          />
        </div>
        <div className="input border p-3 bio">
          <label htmlFor="pp" className="block">
            profilePix:
          </label>
          <div className="buttons w-7 h-9 flex gap-2 justify-between">
            <label htmlFor="ppReal" className=" w-7 h-7 relative">
              <svg
                className="absolute top-0 bottom-0 left-0 right-0"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z" />
              </svg>
              <input
                required
                className="hidden"
                name="ppReal"
                id="ppReal"
                ref={ppLabel}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    const images = e.target.files[0];
                    uploadPP(images);
                  }
                }}
              ></input>
            </label>
          </div>
          <span>{uploadPPStatus}</span>
        </div>
        <div className="input border p-3 coverImg">
          <label htmlFor="coverImg" className="block">
            coverImage:
            <div className="buttons w-7 h-9 flex gap-2 justify-between">
              <label htmlFor="coverImgReal" className=" w-7 h-7 relative">
                <svg
                  className="absolute top-0 bottom-0 left-0 right-0"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z" />
                </svg>
                <input
                  required
                  className="hidden"
                  name="coverImgReal"
                  ref={coverLabel}
                  id="coverImgReal"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      const images = e.target.files[0];
                      uploadCover(images);
                    }
                  }}
                ></input>
              </label>
            </div>
            <span>{uploadCoverStatus}</span>
          </label>
        </div>
        <button
          className=" hover:bg-[var(--button-primary)] bg-[var(--color)] text-[var(--bg-primary)] p-3 my-3  w-full font-bold rounded-3xl"
          onClick={() => {
            img.current?.classList.replace("hidden", "flex");
            if (!fromGoogle) {
              axios
                .post("https://my-twitter-backend.onrender.com/auth/signup", {
                  username: username,
                  password: password,
                  handle: handle,
                  bio: bio,
                  pp: Pp,
                  coverImg: CoverImg,
                  location: "Nigeria",
                })
                .then((data) => {
                  dispatch(
                    login({
                      ...data.data,
                    })
                  );
                })
                .then(() => {
                  navigate("/home");
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              axios
                .post("https://my-twitter-backend.onrender.com/auth/google", {
                  username: username,
                  pp: Pp,
                  handle: handle,
                  bio: bio,
                  fromGoogle: fromGoogle,
                  coverImg: CoverImg,
                  location: "Nigeria",
                })
                .then((data) => {
                  dispatch(login(data.data));
                })
                .then(() => {
                  navigate("/home");
                })
                .catch((err) => {
                  errs.current!.textContent = err.response.data.message;
                });
            }
          }}
        >
          Create account
        </button>
        <span id="errs" ref={errs}></span>
        <div
          className="h-7 w-full hidden justify-center items-center"
          id="img"
          ref={img}
        >
          <Skeleton />
        </div>
      </div>
    </div>
  ) : (
    <HomePage />
  );
};

export default Form;
