import { useEffect, useState } from "react";

const day = 60 * 60 * 24 * 1000;
const minutes = 60 * 1000;
const seconds = 1000;
const hour = 60 * 60 * 1000;

export default function Counter() {
  const [timer, setTimer] = useState(60000);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1000);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const result = `${Math.floor(timer / minutes)}: ${Math.floor(
    (timer / seconds) % 60
  )}`;

  return <div>{timer !== 0 && result}</div>;
}
