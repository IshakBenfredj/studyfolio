/* eslint-disable react/prop-types */
import { useContext } from "react";
import SideNavbarButton from "./SideNavbarButton";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function SidebarContainer({
  children,
  open,
  setOpen,
  typeUser,
}) {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };
  return (
    <nav
      className={`text-third duration-300 bg-secondary h-screen overflow-scroll no-scrollbar relative ${
        open ? " pl-6 pr-8 w-[80%] md:w-72" : "px-4 w-20 md:w-24 md:px-6"
      } `}
    >
      <div
        className={`cursor-pointer py-3 flex justify-end mt-4 ${
          open && "mr-6"
        } md:mr-0 `}
      >
        <HiOutlineMenuAlt2 size={40} onClick={() => setOpen(!open)} />
      </div>

      <div className="flex flex-col mt-2 gap-4 relative">
        <SideNavbarButton
          text={"Home"}
          icon={AiFillHome}
          state={open}
          link={""}
          typeUser={typeUser}
        />
        {children}
      </div>

      <button
        className={`cursor-pointer flex items-center gap-3.5 p-2 font-medium rounded-lg text-red-500 hover:bg-red-500 hover:text-third `}
        onClick={logout}
      >
        <div className="duration-200">
          <BiLogOut size={30} />
        </div>
        <h1 className={`whitespace-pre duration-200 ${!open && "hidden"} `}>
          Logout
        </h1>
      </button>
    </nav>
  );
}
