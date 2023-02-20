import post from "../assets/post.svg";

export default function Post() {
  return (
    <div className="fixed bottom-20 right-10 md:hidden rounded-full w-20 h-20 bg-blue-500">
      <img src={post} />
    </div>
  );
}
