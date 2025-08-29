import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
