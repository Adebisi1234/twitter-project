import Bottom from "../../components/Bottom";
import Tweet from "../../components/Tweet";
import Header from "../../components/Header";
import uploadImg from "../../assets/uploadImg.svg";
import img2 from "../../assets/img2.png";
export default function User() {
  return (
    <div className="h-full w-full dark:bg-black dark:text-white bg-white text-black">
      <Header title="Save" text="Edit Profile" />
      <div className="big flex flex-col dark:!bg-black dark:!text-white !bg-white !text-black">
        <div className="cover-img relative h-36 w-full !bg-black dark:!bg-teal-700 ">
          <div className="h-full !bg-red-500 w-full flex justify-center items-center text-3xl">
            <img src={uploadImg} />
          </div>
          <div className="pp h-28 absolute w-28 rounded-full ml-4 border -bottom-1/4 border-white !bg-black">
            <div className=" h-full w-full flex !bg-transparent justify-center items-center">
              <img src={uploadImg} />
            </div>
          </div>
        </div>
        <div className=" dark:bg-black dark:text-white  options">
          <div className="edit-profile opacity-0 flex items-end justify-end pr-3">
            <button className="border dark:border-white border-black py-3 px-4 rounded-3xl mt-1">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="ml-5">
          <div className="name border-2 my-6 dark:bg-black dark:text-white p-2">
            <label htmlFor="name" className="block opacity-90">
              Name
            </label>
            <input
              type="text"
              className="bg-transparent text-white"
              placeholder="Username"
            />
          </div>
          <div className="bio border p-2 dark:bg-black dark:text-white mb-4">
            <label htmlFor="bio" className="block">
              Bio
            </label>
            <textarea className="bg-transparent w-full"></textarea>
          </div>
          <div className="info dark:bg-black dark:text-white mb-4 border p-3">
            <label htmlFor="location" className="block">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="bg-transparent "
              id="location"
              placeholder="Location"
            />
          </div>
        </div>
      </div>
      <button className="w-full !text-white border-slate-300 border !bg-green-500 h-10 flex p-3 gap-1 justify-center items-center rounded-3xl">
        Update
      </button>
    </div>
  );
}
