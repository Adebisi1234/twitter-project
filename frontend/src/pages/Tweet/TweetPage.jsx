import { useState } from "react";
import Header from "../../components/Header";
import MainTweet from "./MainTweet";
import img2 from "../../assets/img2.png";
import img from "../../assets/img.jpg";
import reactLogo from "../../assets/react.svg";
import ProfilePix from "../../components/ProfilePix";
import Tweet from "../../components/Tweet";
import Bottom from "../../components/Bottom";
import Hr from "../../components/Hr";
import { useParams } from "react-router-dom";
import Skeleton from "../../components/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import { newPost, addComment } from "../../features/post/postSlice";
import axios from "axios";

export default function TweetPage() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const { id } = useParams();
  const posts = useSelector((state) => state.post);

  const [comments, setComments] = useState(
    posts[1].filter((post) => post.PostId === id)
  );
  const post = posts[0].find((post) => post._id === id);

  const comment = comments.map((comment) => {
    return <Tweet key={comment._id} post={comment} />;
  });
  return Object.keys(post).length ? (
    <div className="h-full w-full">
      <Header text="Post" />
      <div className="p-3">
        <MainTweet id={post._id} />
      </div>
      <div className="flex mt-2 mb-3 p-2 h-10 items-center gap-2">
        <ProfilePix pp={post.pp} />
        <textarea
          className="w-full h-full rounded-2xl"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post your reply"
        ></textarea>
        <button
          className="py-2 !bg-green-500 !text-white px-4 rounded-3xl font-bold border"
          onClick={async () => {
            const data = await axios.post("http://localhost:3000/comments", {
              content: content,
              handle: user.handle,
              username: user.username,
              PostId: post._id,
              likes: 0,
              commentCount: 0,
              pp: user.pp,
            });

            dispatch(
              addComment({
                ...data.data,
              })
            );
            setComments([data.data, ...comments]);
            console.log(comments.length);
          }}
        >
          Post
        </button>
      </div>
      {comment}
      <Hr />
      <Bottom />
    </div>
  ) : (
    <Skeleton />
  );
}
