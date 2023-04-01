export default function Message({ self, text }: { self: boolean; text: string }) {
  return (
    <p
      className={`max-w-[50%]  w-fit rounded-md p-1 ${
        self && "!bg-[var(--button-primary)]"
      } ${self && "ml-auto !text-white"}`}
    >
      {text}
    </p>
  );
}
