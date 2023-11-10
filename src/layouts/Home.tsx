import { NavBarComponents } from "../components/NavBarComponents";
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex">
      <NavBarComponents></NavBarComponents>
      <Outlet />
    </div>
  );
};
