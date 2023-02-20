import React from "react";
import Bottom from "../../components/Bottom";
import Header from "./Header";
import Note from "./Note";

export default function Notifications() {
  return (
    <div className="dark:bg-black dark:text-white">
      <Header />
      <div className="pl-2">
        <Note
          name="Test"
          action="Liked your tweet"
          text="This page is not ready yet ...
          Check back later cheers."
        />
        <Note
          name="Test"
          action="Liked your tweet"
          text="This page is not ready yet ...
          Check back later cheers."
        />
        <Note
          name="Test"
          action="Liked your tweet"
          text="This page is not ready yet ...
          Check back later cheers."
        />
        <Note
          name="Test"
          action="Liked your tweet"
          text="This page is not ready yet ...
          Check back later cheers."
        />
        <Note
          name="Test"
          action="Liked your tweet"
          text="This page is not ready yet ...
          Check back later cheers."
        />
      </div>
      <Bottom />
    </div>
  );
}
