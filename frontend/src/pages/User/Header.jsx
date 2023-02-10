export default function Header({ user, tweets }) {
  return (
    <header className="w-full flex h-12 p-2 dark:bg-black dark:text-white dark:border-b items-center gap-3">
      <div className="arrow h-full w-10">
        <div className="w-8 bg-[url('/src/assets/logoDark.jpg')] dark:bg-[url('/src/assets/logo.jpg')] bg-cover h-8"></div>
      </div>
      <div className="user w-full">
        <h2>{user}</h2>
        <small className="font-thin opacity-60">{tweets} Tweets</small>
      </div>
    </header>
  );
}
