const Button = ({
  word,
  svg,
  onClick,
}: {
  word: string;
  svg: string;
  onClick: Function;
}) => {
  return (
    <button
      className=" w-full text-[var(--color)] border-slate-300 border bg-[var(--bg-primary)] h-10 flex p-3 gap-1 justify-center items-center"
      onClick={onClick()}
    >
      {svg && <img src={svg} height="24px" width="24px" />}
      {word}
    </button>
  );
};

export default Button;
