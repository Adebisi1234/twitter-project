import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/auth/userSlice";
import HomePage from "../home/HomePage";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
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

const Form = () => {
  const [username, setUsername] = useState("");
  const [fromGoogle, setFromGoogle] = useState(false);

  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [handle, setHandle] = useState("@");

  const [uploadPPStatus, setUploadPPStatus] = useState("");
  const [uploadCoverStatus, setUploadCoverStatus] = useState("");
  const [Pp, setPp] = useState("");
  const [CoverImg, setCoverImg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUsername(result.user.displayName);
        setHandle(`@${result.user.email}`);
        setBio("This profile is from google");
        setFromGoogle(true);
        const pass = document.getElementById("password");
        pass.classList.add("!hidden");
        const label = document.getElementById("ppLabel");
        labe.classList.add("!hidden");
      })
      .catch((err) => console.log(err));
  };

  const uploadPP = (file) => {
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
          setUploadPPStatus("");
        });
      }
    );
  };
  const uploadCover = (file) => {
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
          setUploadCoverStatus("");
        });
      }
    );
  };

  return !Object.keys(user).length ? (
    <div className="h-full dark:bg-black dark:text-black bg-white text-white">
      <div className=" mx-4 h-2/3 flex flex-col gap-4 my-14 ">
        <h1 className=" text-3xl dark:text-white font-bold mb-2">
          Join Clone today
        </h1>
        <Button
          onClick={() => signInWithGoogle}
          word="Signin with google"
          svg={google}
        />
        <div className="flex w-full items-center">
          <div className="border w-full h-1"></div>
          <div>or</div>
          <div className="border w-full h-1"></div>
        </div>
        <div className="input handle border p-3">
          <label htmlFor="handle" className="block">
            handle:
          </label>
          <input
            value={handle}
            onChange={(e) => {
              setHandle(e.target.value);
            }}
            type="text"
            id="handle"
            name="handle"
            className="border-b w-full"
          />
        </div>
        <div className="input border p-3 username">
          <label htmlFor="username" className="block">
            username:
          </label>
          <input
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
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            name="password"
            className="border-b w-full"
          />
        </div>
        <div className="input border p-3 bio">
          <label htmlFor="bio" className="block">
            bio:
          </label>
          <input
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
            <label
              htmlFor="ppReal"
              id="ppLabel"
              className=" w-7 h-7 !bg-[url('/src/assets/uploadImg.png')] dark:!bg-[url('/src/assets/uploadImgDark.png')] !bg-cover"
            >
              <input
                className="hidden"
                name="ppReal"
                id="ppReal"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const images = e.target.files[0];
                  console.log(images);

                  uploadPP(images);
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
              <label
                htmlFor="coverImgReal"
                className=" w-7 h-7 !bg-[url('/src/assets/uploadImg.png')] dark:!bg-[url('/src/assets/uploadImgDark.png')] !bg-cover"
              >
                <input
                  className="hidden"
                  name="coverImgReal"
                  id="coverImgReal"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const images = e.target.files[0];
                    console.log(images);

                    uploadCover(images);
                  }}
                ></input>
              </label>
            </div>
            <span>{uploadCoverStatus}</span>
          </label>
        </div>
        <button
          className=" bg-black hover:!bg-[var(--button-primary)] hover:dark:!bg-[var(--button-primary)] my-2 dark:bg-white dark:text-black text-white w-full p-1 font-bold rounded-3xl"
          onClick={() => {
            document.getElementById("img").classList.replace("hidden", "flex");
            if (!fromGoogle) {
              axios
                .post("https://nice-purse-calf.cyclic.app/auth/signup", {
                  username: username,
                  password: password,
                  handle: handle,
                  bio: bio,
                  pp: Pp,
                  coverImg: CoverImg,
                  location: "Nigeria",
                })
                .then((data) => {
                  console.log(data.data);
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
                  console.log(data.data);
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
            }
          }}
        >
          Create account
        </button>
        <div className="h-7 w-7 hidden justify-center items-center" id="img">
          <Skeleton />
        </div>
      </div>
    </div>
  ) : (
    <HomePage />
  );
};

export default Form;
