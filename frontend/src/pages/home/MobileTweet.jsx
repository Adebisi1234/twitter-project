import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import NewTweet from "./NewTweet";

export default function MobileTweet() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)}>
      <NewTweet />
    </div>
  );
}
