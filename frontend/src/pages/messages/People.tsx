import React from "react";
import ProfilePix from "../../components/ProfilePix";

export default function People({
  online,
  username,
  img,
  handle,
}: {
  online: boolean;
  username: string;
  img: string;
  handle: string;
}) {
  return (
    <div className="flex space space-x-2 items-center">
      <div className="relative img">
        {img ? (
          <ProfilePix pp={img} handle={handle} />
        ) : (
          <div className="w-9 h-9">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
              </g>
            </svg>
          </div>
        )}
        {online && <div className="relative w-1 h-1 rounded-full"></div>}
      </div>
      <div className="username">
        {username}
        <span id="primary">{handle}</span>
      </div>
    </div>
  );
}
