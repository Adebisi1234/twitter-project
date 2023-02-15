import Bottom from "../../components/Bottom";
import Tweet from "../../components/Tweet";
import Header from "./Header";
import img2 from "../../assets/img2.png";
import Hr from "../../components/Hr";
import { Link } from "react-router-dom";
export default function User() {
  return (
    <div className="w-full">
      <Header user="Owner" tweets="27" />
      <div className="big flex flex-col dark:bg-black dark:text-black bg-white text-black">
        <div className="cover-img relative h-36 w-full !bg-green-500 !dark:bg-red-500 ">
          <div className="pp h-28 absolute w-28 rounded-full translate-y-20 ml-4 border border-white bg-black"></div>
        </div>
        <div className=" dark:bg-black dark:text-white  options">
          <div className="not-you">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="edit-profile flex items-end justify-end pr-3">
            <Link to="/profile/edit">
              <button className="border dark:border-white border-black py-3 px-4 rounded-3xl mt-1">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
        <div className="ml-5">
          <div className="name dark:bg-black dark:text-white mb-6">
            <h1 className="text-xl font-bold">Owner</h1>
            <small className="font-thin opacity-80">@God</small>
          </div>
          <div className="bio dark:bg-black dark:text-white mb-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
            reiciendis laudantium doloribus.
          </div>
          <div className="info dark:bg-black dark:text-white mb-4 flex flex-wrap opacity-80 gap-x-8">
            <div>Nigeria </div>
            <div>Nigeria </div>
            <div>Nigeria </div>
            <div>Nigeria </div>
            <div>Nigeria </div>
          </div>

          <div className="follow-count dark:bg-black dark:text-white mb-4 flex gap-4">
            <div className="following">745 Following</div>
            <div className="followers">168 Followers</div>
          </div>

          <div className="tweets dark:bg-black dark:text-white flex items-center justify-evenly w-full gap-11">
            <h1
              className="post font-extrabold border-b-4 border-b-blue-500"
              id="posts"
              onClick={() => {
                const posts = document.getElementById("posts");
                posts.classList.add("border-b-4");

                const likes = document.getElementById("likes");

                likes.classList.remove("border-b-4");
              }}
            >
              Posts
            </h1>
            <h1
              className="likes font-extrabold border-b-blue-500"
              id="likes"
              onClick={() => {
                const posts = document.getElementById("posts");
                posts.classList.remove("border-b-4");

                const likes = document.getElementById("likes");

                likes.classList.add("border-b-4");
              }}
            >
              Likes
            </h1>
          </div>
          <Tweet
            author="@God"
            text="Lorem ipsum I don't fucking know the rest but I know it ends with fuck"
            img={img2}
          />
          <Tweet
            author="@God"
            text="Lorem ipsum I don't fucking know the rest but I know it ends with fuck"
            img={img2}
          />
        </div>
        <Hr />
      </div>
      <Bottom />
    </div>
  );
}
