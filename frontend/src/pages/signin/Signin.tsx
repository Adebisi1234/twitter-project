import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import HomePage from "../home/HomePage";
import Form from "./Form";
import { RootState } from "../../app/store";

const Signin = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return !Object.keys(user).length ? (
    <div>
      <Header />
      <Form />
    </div>
  ) : (
    <HomePage />
  );
};

export default Signin;
