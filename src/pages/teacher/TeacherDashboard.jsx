import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";

// Import Icons
import { FaCalendarAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { DataContext } from "../../context/dataContext";
import ModuleCard from "../../components/ModuleCard";

export default function TeacherDashboard() {
  const { user } = useContext(UserContext);
  const { roles } = useContext(DataContext);

  useEffect(() => {
    console.log(roles);
  }, [roles]);

  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  return (
    <div className="p-4 overflow-y-auto">
      <h1 className="text-5xl font-bold">
        {user.fname} {user.lname}
      </h1>
      <img src={user.profile_pic} alt="" />
      <div className="grid grid-cols-2 mt-5">
        <div>
          <div className="bg-white rounded-md shadow text-primary">
            <div className="flex items-center gap-2 text-lg p-2 border-b-[1px] border-gray-100">
              <MdEmail size={20} />
              {user.email}
            </div>
            <div className="flex items-center gap-2 text-lg p-2 border-b-[1px] border-gray-100">
              <FaPhone size={20} />
              {user.phone}
            </div>
            <div className="flex items-center gap-2 text-lg p-2">
              <FaCalendarAlt size={20} />
              {user.bdate.split("-")[2]}&nbsp;
              {months[user.bdate.split("-")[1]]}&nbsp;
              {user.bdate.split("-")[0]}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {roles.map((r) => (
              <ModuleCard m={r} path={"/teacher/dashboard"} key={r.module.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
