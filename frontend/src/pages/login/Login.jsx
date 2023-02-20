import Form from "./Form";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import HomePage from "../home/HomePage";

const login = () => {
  const user = useSelector((state) => state.user.user);
  return user.length ? (
    <HomePage />
  ) : (
    <div className="max-h-screen overflow-y-hidden">
      <Header />
      <Form />
    </div>
  );
};

export default login;
