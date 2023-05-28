import Form from "./Form";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import HomePage from "../home/HomePage";
import { RootState } from "../../app/store";

const login = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return Object.keys(user).length ? (
    <HomePage />
  ) : (
    <div className="max-h-screen overflow-y-hidden">
      <Header />
      <Form />
    </div>
  );
};

export default login;
