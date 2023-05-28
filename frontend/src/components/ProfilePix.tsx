import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { User } from "../types/User";
import { RootState } from "../app/store";

const ProfilePix = ({ pp, handle }: { pp?: string; handle?: string }) => {
  const user = useSelector((state: RootState) => state.user.user);
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
        className=" lg:h-14 lg:w-14 h-9 w-9 rounded-full !bg-cover"
        style={{ background: `url('${pp}')` }}
      ></div>
    </Link>
  );
};

export default ProfilePix;
