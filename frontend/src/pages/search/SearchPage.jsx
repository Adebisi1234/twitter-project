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
      const data = await axios.get(
        "https://my-twitter-backend.onrender.com/posts/search",
        {
          params: {
            q: query,
          },
        }
      );
      setResult(data.data);
    };
    searchFunc(query);
  }, [query]);
  return (
    <>
      <div className="input flex gap-3 rounded-3xl p-2 mt-1">
        <div className="w-7 h-7">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
            </g>
          </svg>
        </div>

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
