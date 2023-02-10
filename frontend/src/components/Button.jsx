import reactLogo from "../assets/react.svg";
const Button = ({ word, svg }) => {
  return (
    <button className=" w-full text-black border-slate-300 border bg-white h-10 flex p-3 gap-1 justify-center items-center rounded-3xl">
      <img src={svg} height="24px" width="24px" />
      {word}
    </button>
  );
};

export default Button;
