import { useRef, useState } from "react";
import Header from "../../components/Header";
import NewTweet from "./NewTweet";
export default function MobileTweet() {
  const ref = useRef("test");
  const [record, setRecord] = useState("");
  const [status, setStatus] = useState("");
  let stopRecorder = () => {
    return;
  };
  return (
    <div className="h-screen">
      <Header text="New Tweet" />
      <NewTweet record={record} status={status} />
      <div className="w-full h-full flex justify-center items-center">
        <div
          ref={ref}
          className="h-fit w-1/4 rounded-full"
          onTouchEnd={() => {
            ref.current.classList.remove("animate-pulse");
            ref.current.classList.remove("!bg-green-500");
            stopRecorder();
          }}
          onTouchStart={() => {
            setStatus("recording");

            ref.current.classList.add("animate-pulse");
            ref.current.classList.add("!bg-green-500");
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

              setTimeout(() => {
                if (recorder.state !== "inactive") {
                  recorder.stop();
                }
              }, 5000);
            });
          }}
        >
          <img src="/src/assets/sound.svg" className="!bg-transparent" />
        </div>
      </div>
    </div>
  );
}
