import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/userSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";

export default function User() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const [uploadPPStatus, setUploadPPStatus] = useState("");
  const [uploadCoverStatus, setUploadCoverStatus] = useState("");
  const [pp, setPp] = useState(user.pp);
  const [CoverImg, setCoverImg] = useState(user.coverImg);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const dispatch = useDispatch();
  const uploadPP = (file: File) => {
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
  const uploadCover = (file: File) => {
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

  return (
    <div className="h-full w-full bg-[var(--bg-primary)] text-[var(--color)]">
      <Header text="Edit Profile" />
      <div className="big flex flex-col !bg-[var(--bg-primary)] !text-[var(--color)]">
        <div className="cover-img relative h-36 w-full !bg-black dark:!bg-teal-700 ">
          <div
            className="h-full !bg-green-700 bg-cover bg-no-repeat w-full flex justify-center items-center text-3xl"
            style={{ backgroundImage: `url(${user.coverImg})` }}
          >
            <div className="buttons w-7 h-9 flex gap-2 justify-between">
              <label
                htmlFor="coverImgReal"
                className=" w-7 h-7 !bg-[url('/src/assets/uploadImg.svg')] !bg-cover"
              >
                <input
                  className="hidden"
                  name="coverImgReal"
                  id="coverImgReal"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const { target } = e;
                    if (target.files != null) {
                      const images = target.files[0];
                      uploadCover(images);
                    }
                  }}
                ></input>
              </label>
            </div>
            <span>{uploadCoverStatus}</span>
          </div>
          <div
            className="pp h-28 absolute w-28 bg-cover bg-no-repeat  rounded-full ml-4 border -bottom-1/4 border-white !bg-black/90"
            style={{ backgroundImage: `url(${user.pp})` }}
          >
            <div className=" h-full w-full flex !bg-transparent justify-center items-center">
              <div className="buttons w-7 h-9 flex gap-2 justify-between">
                <label
                  htmlFor="ppReal"
                  id="ppLabel"
                  className=" w-7 h-7 !bg-[url('/src/assets/uploadImg.svg')] !bg-cover"
                >
                  <input
                    className="hidden"
                    name="ppReal"
                    id="ppReal"
                    type="file"
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const { target } = e;
                      if (target.files != null) {
                        const images = target.files[0];
                        uploadPP(images);
                      }
                    }}
                  ></input>
                </label>
              </div>
              <span>{uploadPPStatus}</span>
            </div>
          </div>
        </div>
        <div className=" bg-[var(--bg-primary)]   options">
          <div className="edit-profile opacity-0 flex items-end justify-end pr-3">
            <button className="border dark:border-white border-black py-3 px-4 rounded-3xl mt-1">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="ml-5">
          <div className="name border-2 my-6 bg-[var(--bg-primary)]  p-2">
            <label htmlFor="name" className="block opacity-90">
              Name
            </label>
            <input
              type="text"
              className="bg-transparent text-white"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="bio border p-2 bg-[var(--bg-primary)]  mb-4">
            <label htmlFor="bio" className="block">
              Bio
            </label>
            <textarea
              className="bg-transparent w-full no-scrollbar"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className="info bg-[var(--bg-primary)]  mb-4 border p-3">
            <label htmlFor="location" className="block">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="bg-transparent "
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>
        </div>
      </div>
      <button
        className="w-full !text-white border-slate-300 border !bg-green-500 h-10 flex p-3 gap-1 justify-center items-center rounded-3xl"
        onClick={() => {
          axios
            .post("https://my-twitter-backend.onrender.com/users/editProfile", {
              handle: user.handle,
              username: username ? username : user.username,
              bio: bio ? bio : user.bio,
              location: location ? location : user.location,
              pp: pp ? pp : user.pp,
              coverImg: CoverImg ? CoverImg : user.coverImg,
            })
            .then((res) => {
              dispatch(login(res.data));
              navigate("/profile");
            })
            .catch((err) => console.log(err));
        }}
      >
        Update
      </button>
    </div>
  );
}
