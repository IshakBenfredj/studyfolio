/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

export default function SideNavbarButton({
  text,
  icon: Icon,
  state,
  link,
  typeUser,
}) {
  const path = useLocation().pathname;
  const pathUser =
    typeUser === "admin"
      ? "/admin/dashboard/"
      : typeUser === "teacher"
      ? "/teacher/dashboard/"
      : "/student/";
  return (
    <Link
      to={pathUser + link}
      className={`cursor-pointer flex items-center gap-3.5 p-2 font-medium rounded-lg hover:bg-third hover:text-secondary ${
        path.startsWith(`${pathUser}${link}`) && "bg-primary"
      } ${!state && "justify-center"} `}
    >
      <div className="duration-200">
        <Icon size={24} />
      </div>
      <h1 className={`whitespace-pre ${!state && "hidden  "}`}>{text} </h1>
    </Link>
  );
}
