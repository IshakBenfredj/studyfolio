import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "../../components/admin/SideNavBar";

export default function DashboardAdmin() {
  useEffect(() => {
    document.title = "Administrator dashboard";
  }, []);

  return (
    <div className="flex bg-[#fafafa]">
      <SideNavBar />
      <div className="overflow-y-scroll sc:overflow-visible w-full">
        <Outlet />
      </div>
    </div>
  );
}



