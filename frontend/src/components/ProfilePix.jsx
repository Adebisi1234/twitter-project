import React from "react";
import { Link } from "react-router-dom";

const ProfilePix = ({ pp }) => {
  return (
    <Link to="/profile" className="h-fit">
      <div
        className="bg-[url(${pp})] h-9 w-9 bg-left rounded-full !bg-cover "
        style={{ background: `url(${pp})` }}
      ></div>
    </Link>
  );
};

export default ProfilePix;
