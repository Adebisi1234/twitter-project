import React from "react";
import { Link } from "react-router-dom";
import ProfilePix from "../../components/ProfilePix";

export default function Note({
  name,
  action,
  text,
  PostId,
  pp,
}: {
  name: string;
  action: string;
  text: string;
  PostId: string;
  pp: string;
}) {
  return (
    <>
      <div className="flex notes p-3 gap-3   items-start mb-4 border-b">
        <div className="react">
          {action.includes("liked") ? (
            <div className="w-7 h-7 !text-[#f91880]">
              <svg viewBox="0 0 24 24" aria-hidden="true" id="liked">
                <g>
                  <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </g>
              </svg>
            </div>
          ) : action.includes("mentioned") ? (
            <div className="w-7 h-7">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                </g>
              </svg>
            </div>
          ) : (
            <div className="w-7 h-7 text-[var(--button-primary)]">
              <svg viewBox="0 0 24 24" id="retweet" aria-hidden="true">
                <g>
                  <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
                </g>
              </svg>
            </div>
          )}
        </div>
        <div className="content flex flex-col gap-1">
          {pp ? (
            <ProfilePix pp={pp} handle={name} />
          ) : (
            <Link to={`/profile/poster/${name}`}>
              <svg
                viewBox="0 0 24 24"
                className="lg:h-14 lg:w-14 h-9 w-9"
                aria-hidden="true"
              >
                <g>
                  <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                </g>
              </svg>
            </Link>
          )}
          <Link to={`/tweetPage/${PostId}`}>
            <p>
              <span className="font-bold">{name}</span> {action}
            </p>
            <p>{text}</p>
          </Link>
        </div>
      </div>
    </>
  );
}
