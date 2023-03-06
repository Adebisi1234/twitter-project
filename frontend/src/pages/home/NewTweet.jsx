import { useEffect, useRef, useState } from "react";
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

const NewTweet = ({ status, record }) => {
  const reference = useRef("");

  let stopRecorder = () => {
    console.log("let's what happens");
  };
  const user = useSelector((state) => state.user.user);
  const [match, setMatch] = useState("");
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [content, setContent] = useState("");
  const [uploadStatus, setUploadStatus] = useState(status ? status : "");
  const navigate = useNavigate();

  const uploadFile = (file, setUrl) => {
    console.log("uploading");
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
          setUrl(downloadURL);
          setUploadStatus("Uploaded");
        });
      }
    );
  };

  useEffect(() => {
    if (typeof record === "object") {
      uploadFile(record, setAudioUrl);
    }
  }, [record]);

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
              onBeforeInput={(e) => {
                if (e.data === "@") {
                  document
                    .getElementById("newTags")
                    .classList.remove("!hidden");
                } else if (
                  e.data === " " ||
                  (content === "" && e.data === "Backspace") ||
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
            <div className="buttons w-auto h-9 flex gap-3 items-center justify-between">
              <label
                htmlFor="file"
                className=" w-7 h-7 cursor-pointer !bg-[url('/src/assets/uploadImg.png')] dark:!bg-[url('/src/assets/uploadImgDark.png')] !bg-cover"
              >
                <input
                  className="hidden"
                  name="file"
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const images = e.target.files[0];
                    uploadFile(images, setImageUrl);
                  }}
                ></input>
              </label>
              {window.innerWidth > 756 && (
                <div
                  ref={reference}
                  className=" w-7 h-7 !bg-[url('/src/assets/sound.png')] dark:!bg-[url('/src/assets/soundDark.png')] cursor-pointer !bg-cover"
                  id="record"
                  onMouseLeave={() => {
                    reference.current.classList.remove("animate-pulse");
                    stopRecorder();
                  }}
                  onMouseDown={() => {
                    reference.current.classList.add("animate-pulse");
                    const device = navigator.mediaDevices.getUserMedia({
                      audio: true,
                    });
                    setUploadStatus("recording");
                    const items = [];
                    device.then((stream) => {
                      const recorder = new MediaRecorder(stream);
                      recorder.ondataavailable = (e) => {
                        items.push(e.data);
                        if (recorder.state == "inactive") {
                          stream.getAudioTracks().forEach((x) => x.stop());
                          const blob = new Blob(items, { type: "audio/mp3" });
                          blob.name = "new audio";
                          blob.webkitRelativePath = "";
                          uploadFile(blob, setAudioUrl);
                        }
                      };
                      recorder.start();

                      stopRecorder = () => {
                        if (recorder.state !== "inactive") {
                          recorder.stop();
                        }
                      };

                      setTimeout(() => {
                        if (recorder.state !== "inactive") {
                          recorder.stop();
                        }
                      }, 5000);
                    });
                  }}
                ></div>
              )}
            </div>
            <span>{uploadStatus !== "" ? uploadStatus : status}</span>
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
                      audioUrl: audioUrl,
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
