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
      className=" w-full  border-slate-300 border  h-10 flex p-3 gap-1 justify-center items-center"
      onClick={onClick()}
    >
      {svg && (
        <img
          loading="lazy"
          decoding="async"
          src={svg}
          height="24px"
          width="24px"
        />
      )}
      {word}
    </button>
  );
};

export default Button;
