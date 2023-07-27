import { useState, useRef } from "react";
import Header from "../../components/Header";
import MainTweet from "./MainTweet";
import ProfilePix from "../../components/ProfilePix";
import Tweet from "../../components/Tweet";
import Bottom from "../../components/Bottom";
import Hr from "../../components/Hr";
import { useParams } from "react-router-dom";
import Skeleton from "../../components/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../../features/post/postSlice";
import axios from "axios";
import Tag from "../../components/Tag";
import { AppDispatch, RootState } from "../../app/store";

export default function TweetPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const [match, setMatch] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState("");
  const { id } = useParams();
  const tags = useRef<HTMLDivElement>(null!);
  const input = useRef<HTMLTextAreaElement>(null!);
  const posts = useSelector((state: RootState) => state.post);
  const [comments, setComments] = useState(
    posts[1].filter((post) => post.PostId === id)
  );
  const post = posts[0].find((post) => post._id === id);

  const comment = comments.map((comment) => {
    return <Tweet key={comment._id} post={comment} />;
  });
  return Object.keys(post!).length ? (
    <div className="h-full w-full">
      <Header text="Post" />
      <div className="p-3">
        <MainTweet id={post!._id} />
      </div>
      <div className="flex mt-2 mx-auto mb-3 p-2 max-w-2xl h-10 items-center gap-2">
        <ProfilePix pp={user.pp} />
        <textarea
          className="w-full h-full rounded-2xl"
          value={content}
          ref={input}
          onChange={(e) => {
            setContent(e.target.value);
            const regex = e.target.value
              .slice(e.target.value.lastIndexOf("@"))
              .match(/@\S+/);
            if (regex) {
              setMatch(regex[0]);
            }
          }}
          onBeforeInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
            const { data }: { data: string } = e as any;
            if (data === "@") {
              tags.current.classList.remove("!hidden");
            } else if (
              data === " " ||
              (content === "" && data === "Backspace") ||
              content === ""
            ) {
              tags.current.classList.add("!hidden");
              setMatch("");
            }
          }}
          onBlur={() => tags.current?.classList.add("!hidden")}
          placeholder="Post your reply"
        ></textarea>
        <button
          className="py-2 !bg-[var(--button-primary)] !text-white px-4 rounded-3xl font-bold border"
          onClick={async () => {
            const data = await axios.post(
              "https://my-twitter-backend.onrender.com/comments",
              {
                content: content,
                handle: user.handle,
                username: user.username,
                PostId: post?._id,
                likes: 0,
                commentCount: 0,
                pp: user.pp,
              }
            );

            dispatch(
              addComment({
                ...data.data,
              })
            );
            setComments([data.data, ...comments]);
            setContent("");
          }}
        >
          Post
        </button>
      </div>
      <div className="mx-w-2xl relative">
        <div
          className="absolute !hidden top-0 z-50"
          ref={tags}
          onClick={() => {
            input.current.focus();
            tags.current.classList.add("!hidden");
          }}
        >
          <Tag query={match} content={content} setContent={setContent} />
        </div>
      </div>
      {comment}
      <Bottom />
    </div>
  ) : (
    <Skeleton />
  );
}
