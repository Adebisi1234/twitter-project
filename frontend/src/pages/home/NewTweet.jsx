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

const NewTweet = () => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  console.log(image);
  console.log(uploadStatus);
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
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
          setUploadStatus("");
        });
      }
    );
  };

  return (
    <div className="w-full m-auto max-w-2xl">
      <header className="w-full flex h-12 p-2  items-center gap-3 justify-between">
        <div className="arrow h-full w-10 bg-slate-800"></div>
        <button className="py-2 px-4 rounded-3xl !bg-[var(--button-primary)] dark:!bg-[var(--button-secondary)] border">
          Post
        </button>
      </header>
      <div className="gap-3 flex pl-2 w-full pt-2 dark:bg-slate-900 p-1 border-b-2 max-w-2xl">
        <ProfilePix pp={Object.keys(user).length && user.pp} />
        <div className="new-tweet w-full h-full flex flex-col ">
          <div className="input h-24 ">
            <textarea
              placeholder="What's happening?"
              className="w-full bg-transparent outline-none"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                console.log(content);
              }}
            ></textarea>
          </div>
          <div className="options flex justify-between items-center">
            <div className="buttons w-7 h-9 flex gap-2 justify-between">
              <label
                htmlFor="file"
                className=" w-7 h-7 !bg-[url('/src/assets/uploadImg.svg')] !bg-cover"
              >
                <input
                  className="hidden"
                  name="file"
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    const images = e.target.files[0];
                    console.log(images);

                    uploadImg(images);
                  }}
                ></input>
              </label>
            </div>
            <span>{uploadStatus}</span>
            <button
              className=" !bg-[var(--button-primary)] dark:!bg-[var(--button-secondary)] px-5 !text-white py-1 rounded-3xl"
              onClick={() => {
                const fetchNew = async () => {
                  const data = await axios.post(
                    "https://nice-purse-calf.cyclic.app/posts/newPost",
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
                  );

                  dispatch(newPost({ ...data.data }));
                };

                fetchNew();
                setContent("");
                setImage({});
                if (window.innerWidth < 1024) {
                  navigate(-1);
                }
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
