import React from "react";

const ProfilePix = ({ pp }) => {
  return (
    <a href="#">
      <div
        className="bg-[url(${pp})] h-9 w-9 bg-left rounded-full !bg-cover "
        style={{ background: `url(${pp})` }}
      ></div>
    </a>
  );
};

export default ProfilePix;
