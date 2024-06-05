import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/teacher/Sidebar";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Teacher Dashboard";
  }, []);

  return (
    <div className="flex bg-[#fafafa]">
      <Sidebar />
      <div className="overflow-y-scroll w-full h-screen">
        <Outlet />
      </div>
    </div>
  );
}
