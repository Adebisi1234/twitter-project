import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Bottom from "../../components/Bottom";
import Skeleton from "../../components/Skeleton";
import Tweet from "../../components/Tweet";

export default function SearchPage() {
  const { id } = useParams();
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState(id);

  const res = result.map((post) => {
    return <Tweet post={post} />;
  });
  useEffect(() => {
    const searchFunc = async (query) => {
      const data = await axios.get("http://localhost:3000/posts/search", {
        params: {
          q: query,
        },
      });
      setResult(data.data);
    };
    searchFunc(query);
  }, [query]);
  return (
    <>
      <div className="input flex gap-3 rounded-3xl p-2 mt-1">
        <div className="w-7 dark:bg-[url('/src/assets/searchDark.png')] bg-[url('/src/assets/search.png')] bg-left bg-cover h-7"></div>

        <input
          type="text"
          placeholder="Search Clone"
          className="w-full bg-transparent outline-none "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {res.length ? res : <Skeleton />}
      <Bottom />
    </>
  );
}
