import { Link, NavLink } from "react-router-dom";
import images from "../../constants/images";
import Dropdown from "./Dropdown";

export default function Navbar() {
  return (
    <div className="bg-white w-full py-2 relative z-40">
      <div className="container flex justify-between items-center">
        <Link to="/student">
          <img src={images.logosfp} alt="" className="w-36 p-1" />
        </Link>
        <div className="center gap-3 text-gray-700 font-semibold">
          <NavLink
            to={""}
            className="hover:text-primary transition-all px-2 py-3"
          >
            Home
          </NavLink>
          <NavLink
            to={"modules"}
            className="hover:text-primary transition-all px-2 py-3"
          >
            Modules
          </NavLink>
          <NavLink
            to={"chat"}
            className="hover:text-primary transition-all px-2 py-3"
          >
            Chat
          </NavLink>
        </div>
        <div className="flex gap-3">
          <Dropdown />
          <Link
            to={""}
            target="_blank"
            className="p-2 bg-primary center text-white font-bold gap-2 rounded"
          >
            <img src={images.logowhite} alt="" className="w-8" />
            <span>ESI SBA</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
