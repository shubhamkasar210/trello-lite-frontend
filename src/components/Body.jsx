import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Body = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Body;
