import { useRef, useState } from "react";
import Header from "../../components/Header";
import NewTweet from "./NewTweet";
export default function MobileTweet() {
  const recorder = () => {
    const device = navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    window.localStream = device;
    const items = [];
    device.then((stream) => {
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        items.push(e.data);
        if (recorder.state == "inactive") {
          stream.getAudioTracks().forEach((x) => x.stop());
          const blob = new Blob(items, { type: "audio/mp3" });
          blob.name = "new audio";
          blob.webkitRelativePath = "";
          setRecord(blob);
        }
      };
      recorder.start();

      stopRecorder = () => {
        if (recorder.state !== "inactive") {
          recorder.stop();
          console.log("Stopped");
        }
      };
    });
  };
  const ref = useRef();
  const [record, setRecord] = useState("");
  const [status, setStatus] = useState("");
  let stopRecorder = () => {
    return;
  };
  return (
    <div className="h-screen overflow-hidden">
      <Header text="New Tweet" />
      <NewTweet record={record} status={status} />
      <div className="w-full h-full flex justify-center items-center">
        <div
          ref={ref}
          className="h-[12%] w-1/4 rounded-full"
          onTouchStart={() => {
            setStatus("recording");

            ref.current.classList.add("animate-pulse");
            ref.current.classList.add("!bg-green-500");
            recorder();
          }}
          onTouchEnd={() => {
            ref.current.classList.remove("animate-pulse");
            ref.current.classList.remove("!bg-green-500");
            stopRecorder();
          }}
        >
          <div className=" !bg-[var(--button-primary)] bg-blend-multiply  cursor-pointer !bg-contain bg-bottom bg-no-repeat h-full w-full rounded-full">
            <svg
              style={{
                verticalAlign: "middle",
                backgroundColor: "transparent",
                fill: "currentColor",
                overflow: "hidden",
              }}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m0-992a480 480 0 1 0 480 480A480 480 0 0 0 512 32z m16 623.2V736h48a16 16 0 0 1 0 32h-128a16 16 0 0 1 0-32h48v-80.8A160 160 0 0 1 352 496a16 16 0 0 1 32 0 128 128 0 0 0 256 0 16 16 0 0 1 32 0 160 160 0 0 1-144 159.2zM512 592a96 96 0 0 1-96-96v-144a96 96 0 0 1 192 0v144a96 96 0 0 1-96 96z m64-240a64 64 0 0 0-128 0v144a64 64 0 0 0 128 0v-144z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
