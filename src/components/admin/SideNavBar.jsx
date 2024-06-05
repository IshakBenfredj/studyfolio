import { useState } from "react";
import SideNavbarButton from "../SideNavbarButton";
import { FaUserTie, FaUserGraduate, FaPlus } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { GiNotebook } from "react-icons/gi";
import SidebarContainer from "../SidebarContainer";

export default function SideNavBar() {
  const [open, setOpen] = useState(false);
  return (
    <SidebarContainer open={open} setOpen={setOpen} typeUser={'admin'}>
      <div>
        <h1
          className={`font-bold text-xl capitalize flex items-center gap-2 py-2 mb-2 ${
            !open && "justify-center text-secondary bg-third rounded-md"
          }`}
        >
          <FaUserGraduate size={30} className={!open && "text-center"} />
          <span className={!open && "hidden"}>Students</span>
        </h1>
        <SideNavbarButton
          text={"Add New"}
          icon={FaPlus}
          state={open}
          link={"addStudents"}
          typeUser={"admin"}
        />
        {/* <SideNavbarButton text={"Modify"} icon={PiGearFill} state={open} /> */}
        <SideNavbarButton
          text={"List"}
          icon={FaClipboardList}
          state={open}
          link={"studentsList"}
          typeUser={"admin"}
        />
      </div>
      <div>
        <h1
          className={`font-bold text-xl capitalize flex items-center gap-2 py-2 mb-2 ${
            !open && "justify-center text-secondary bg-third rounded-md"
          }`}
        >
          <SiGoogleclassroom size={30} className={!open && "text-center"} />
          <span className={!open && "hidden"}>Batches</span>
        </h1>
        <SideNavbarButton
          text={"Add New"}
          icon={FaPlus}
          state={open}
          link={"addPromo"}
          typeUser={"admin"}
        />
        <SideNavbarButton
          text={"List"}
          icon={FaClipboardList}
          state={open}
          link={"promosList"}
          typeUser={"admin"}
        />
      </div>
      <div>
        <h1
          className={`font-bold text-xl capitalize flex items-center gap-2 py-2 mb-2 ${
            !open && "justify-center text-secondary bg-third rounded-md"
          }`}
        >
          <FaUserTie size={30} className={!open && "text-center"} />
          <span className={!open && "hidden"}>Teachers</span>
        </h1>
        <SideNavbarButton
          text={"Add New"}
          icon={FaPlus}
          state={open}
          link={"addTeachers"}
          typeUser={"admin"}
        />
        {/* <SideNavbarButton text={"Modify"} icon={PiGearFill} state={open} /> */}
        <SideNavbarButton
          text={"List"}
          icon={FaClipboardList}
          state={open}
          link={"teachersList"}
          typeUser={"admin"}
        />
      </div>
      <div>
        <h1
          className={`font-bold text-xl capitalize flex items-center gap-2 py-2 mb-2 ${
            !open && "justify-center text-secondary bg-third rounded-md"
          }`}
        >
          <GiNotebook size={30} className={!open && "text-center"} />
          <span className={!open && "hidden"}>Modules</span>
        </h1>
        <SideNavbarButton
          text={"Add New"}
          icon={FaPlus}
          state={open}
          link={"addModule"}
          typeUser={"admin"}
        />
        {/* <SideNavbarButton text={"Modify"} icon={PiGearFill} state={open} /> */}
        <SideNavbarButton
          text={"List"}
          icon={FaClipboardList}
          state={open}
          link={"modulesList"}
          typeUser={"admin"}
        />
      </div>
    </SidebarContainer>
  );
}
