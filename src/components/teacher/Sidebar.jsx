import { useState } from "react";
import SideNavbarButton from "../SideNavbarButton";
import { FaPlus } from "react-icons/fa";
import SidebarContainer from "../SidebarContainer";
import { FaFileArrowUp } from "react-icons/fa6";
import { BsFillFileEarmarkFontFill } from "react-icons/bs";
import { MdQuiz } from "react-icons/md";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <SidebarContainer open={open} setOpen={setOpen} typeUser={"teacher"}>
      <div>
        <h1
          className={`font-bold text-xl capitalize flex items-center gap-2 py-2 mb-2 ${
            !open && "justify-center text-secondary bg-third rounded-md"
          }`}
        >
          <FaFileArrowUp size={30} className={!open && "text-center"} />
          <span className={!open && "hidden"}>Resources</span>
        </h1>
        <SideNavbarButton
          text={"Add New"}
          icon={FaPlus}
          state={open}
          link={"addResource"}
          typeUser={"teacher"}
        />
        <SideNavbarButton
          text={"New Test"}
          icon={BsFillFileEarmarkFontFill}
          state={open}
          link={"addTest"}
          typeUser={"teacher"}
        />
        <SideNavbarButton
          text={"New Quiz"}
          icon={MdQuiz}
          state={open}
          link={"AddQuiz"}
          typeUser={"teacher"}
        />
      </div>
    </SidebarContainer>
  );
}
