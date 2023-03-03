import { useEffect, useState } from "react";
import ProfilePix from "../../components/ProfilePix";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { newPost } from "../../features/post/postSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useNavigate } from "react-router-dom";
import Tag from "../../components/Tag";

const NewTweet = () => {
  const user = useSelector((state) => state.user.user);
  const [match, setMatch] = useState("");
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const navigate = useNavigate();

  const uploadImg = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadStatus(`${Math.floor(progress)}% uploading please wait`);
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
          setImageUrl(downloadURL);
          setUploadStatus("Uploaded");
          document.getElementById("file").setAttribute("readOnly", true);
        });
      }
    );
  };

  return (
    <div className="w-full m-auto max-w-2xl">
      <div className="gap-3 flex pl-2 w-full pt-2 dark:bg-slate-900 p-1 border-b-2 max-w-2xl">
        <ProfilePix pp={Object.keys(user).length && user.pp} />
        <div className="new-tweet w-full h-full flex flex-col ">
          <div className="input h-24 ">
            <textarea
              placeholder="What's happening?"
              id="newTweet"
              className="w-full bg-transparent outline-none"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                const regex = e.target.value
                  .slice(e.target.value.lastIndexOf("@"))
                  .match(/@\S+/);
                if (regex) {
                  setMatch(regex[0]);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "@") {
                  document
                    .getElementById("newTags")
                    .classList.remove("!hidden");
                } else if (
                  e.key === " " ||
                  (content === "" && e.key === "Backspace") ||
                  content === ""
                ) {
                  document.getElementById("newTags").classList.add("!hidden");
                  setMatch("");
                }
              }}
            ></textarea>
            <div className="relative w-full">
              <div
                className="absolute !hidden top-0 z-50 -left-7"
                id="newTags"
                onClick={() => {
                  document.getElementById("newTweet").focus();
                  document.getElementById("newTags").classList.add("!hidden");
                }}
              >
                <Tag query={match} content={content} setContent={setContent} />
              </div>
            </div>
          </div>
          <div className="options flex justify-between items-center">
            <div className="buttons w-7 h-9 flex gap-2 justify-between">
              <label
                htmlFor="file"
                className=" w-7 h-7 !bg-[url('/src/assets/uploadImg.png')] dark:!bg-[url('/src/assets/uploadImgDark.png')] !bg-cover"
              >
                <input
                  className="hidden"
                  name="file"
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const images = e.target.files[0];

                    uploadImg(images);
                  }}
                ></input>
              </label>
            </div>
            <span>{uploadStatus}</span>
            <button
              className=" !bg-[var(--button-primary)] dark:!bg-[var(--button-secondary)] px-5 !text-white py-1 rounded-3xl"
              onClick={() => {
                axios
                  .post(
                    "https://my-twitter-backend.onrender.com/posts/newPost",
                    {
                      likes: 0,
                      comment: false,
                      commentCount: 0,
                      content: content,
                      handle: user.handle,
                      username: user.username,
                      pp: user.pp,
                      img: imageUrl,
                    }
                  )
                  .then((data) => {
                    dispatch(newPost(data.data));
                    if (window.innerWidth < 1024) {
                      navigate(-1);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    setUploadStatus(err.response.data.message);
                  });

                setContent("");
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTweet;
