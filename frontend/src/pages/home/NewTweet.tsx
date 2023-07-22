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
import { useNavigate, useParams } from "react-router-dom";
import Tag from "../../components/Tag";
import { User } from "../../types/User";
import { RootState } from "../../app/store";
import useWindowSize from "../../utils/useWindowSize";

const NewTweet = ({ status, record }: { status?: string; record?: Blob }) => {
  const width = useWindowSize();
  const { quote } = useParams();
  const recorder = () => {
    const device = navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    let items: BlobEvent["data"][] = [];
    device.then((stream) => {
      let recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        items.push(e.data);
        if (recorder.state == "inactive") {
          const blob = new Blob(items, { type: "audio/mp3" });
          blob.name = "new audio";
          uploadFile(blob, setAudioUrl);
          stream.getAudioTracks().forEach((x) => x.stop());
        }
      };
      recorder.start();

      stopRecorder = () => {
        if (recorder.state !== "inactive") {
          recorder.stop();
          console.log("Stopped");
        }
      };
    });
  };
  const reference = useRef<HTMLDivElement>(null);
  const tags = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);

  let stopRecorder = () => {
    return;
  };
  const user = useSelector((state: RootState) => state.user.user);
  const [match, setMatch] = useState("");
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [content, setContent] = useState("");
  const [uploadStatus, setUploadStatus] = useState(status ? status : "");
  const navigate = useNavigate();

  const uploadFile = (
    file: Blob,
    setUrl: React.Dispatch<React.SetStateAction<string>>
  ) => {
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
        <ProfilePix pp={Object.keys(user).length ? user.pp : ""} />
        <div className="new-tweet w-full h-full flex flex-col ">
          <div className="input h-24 ">
            <textarea
              placeholder="What's happening?"
              ref={input}
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
              onBeforeInput={(e: any) => {
                if (e.data === "@") {
                  tags.current?.classList.remove("!hidden");
                } else if (
                  e.data === " " ||
                  (content === "" && e.data === "Backspace") ||
                  content === ""
                ) {
                  tags.current?.classList.add("!hidden");
                  setMatch("");
                }
              }}
            ></textarea>
            <div className="relative w-full">
              <div
                className="absolute !hidden top-0 z-50 -left-7"
                ref={tags}
                onClick={() => {
                  input.current?.focus();
                  tags.current?.classList.add("!hidden");
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
                className=" w-7 h-7 cursor-pointer relative !bg-[url('/src/assets/image.svg')] !bg-cover"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="absolute top-0 left-0 bottom-0 right-0"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>

                <input
                  className="hidden"
                  name="file"
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      const images = e.target.files[0];
                      uploadFile(images, setImageUrl);
                    }
                  }}
                ></input>
              </label>
              {width > 756 && (
                <div
                  ref={reference}
                  className=" w-7 h-7 relative cursor-pointer !bg-cover"
                  onPointerUp={() => {
                    reference.current?.classList.remove("animate-pulse");
                    stopRecorder();
                  }}
                  onPointerDown={() => {
                    reference.current?.classList.add("animate-pulse");
                    recorder();
                  }}
                >
                  <svg
                    className="absolute top-0 left-0 right-0 bottom-0"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m0-992a480 480 0 1 0 480 480A480 480 0 0 0 512 32z m16 623.2V736h48a16 16 0 0 1 0 32h-128a16 16 0 0 1 0-32h48v-80.8A160 160 0 0 1 352 496a16 16 0 0 1 32 0 128 128 0 0 0 256 0 16 16 0 0 1 32 0 160 160 0 0 1-144 159.2zM512 592a96 96 0 0 1-96-96v-144a96 96 0 0 1 192 0v144a96 96 0 0 1-96 96z m64-240a64 64 0 0 0-128 0v144a64 64 0 0 0 128 0v-144z" />
                  </svg>
                </div>
              )}
            </div>
            <span>{uploadStatus !== "" ? uploadStatus : status}</span>
            <button
              className=" !bg-[var(--button-primary)] px-5 ! py-1 rounded-3xl"
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
                      quoteId: quote,
                    }
                  )
                  .then((data) => {
                    dispatch(newPost(data.data));
                    if (width < 1024 || quote) {
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
