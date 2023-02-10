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
          name="Devil"
          action="Liked your tweet"
          text="dladfl fkdfjaldsf dlkder daceda4 dfsdlfduie dakdr etedfdof dfkadf aidfe dadn and thi hou got to get connection if you wan bvecomea big start uncle"
        />
        <Note
          name="Devil"
          action="Liked your tweet"
          text="dladfl fkdfjaldsf dlkder daceda4 dfsdlfduie dakdr etedfdof dfkadf aidfe dadn and thi hou got to get connection if you wan bvecomea big start uncle"
        />
        <Note
          name="Devil"
          action="Liked your tweet"
          text="dladfl fkdfjaldsf dlkder daceda4 dfsdlfduie dakdr etedfdof dfkadf aidfe dadn and thi hou got to get connection if you wan bvecomea big start uncle"
        />
        <Note
          name="Devil"
          action="Liked your tweet"
          text="dladfl fkdfjaldsf dlkder daceda4 dfsdlfduie dakdr etedfdof dfkadf aidfe dadn and thi hou got to get connection if you wan bvecomea big start uncle"
        />
        <Note
          name="Devil"
          action="Liked your tweet"
          text="dladfl fkdfjaldsf dlkder daceda4 dfsdlfduie dakdr etedfdof dfkadf aidfe dadn and thi hou got to get connection if you wan bvecomea big start uncle"
        />
      </div>
      <Bottom />
    </div>
  );
}
