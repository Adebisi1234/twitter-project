import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import HomePage from "../home/HomePage";
import Form from "./Form";

const Signin = () => {
  const user = useSelector((state) => state.user.user);
  return !Object.keys(user).length ? (
    <div className="max-h-screen">
      <Header />
      <Form />
    </div>
  ) : (
    <HomePage />
  );
};

export default Signin;
