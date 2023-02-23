import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfilePix = ({ pp, handle }) => {
  const user = useSelector((state) => state.user.user);
  return (
    <Link
      to={
        !handle || user.handle === handle
          ? "/profile"
          : `/profile/poster/${handle}`
      }
      className="h-fit"
    >
      <div
        className=" h-9 w-9 rounded-full !bg-cover "
        style={{ background: `url(${pp})` }}
      ></div>
    </Link>
  );
};

export default ProfilePix;
