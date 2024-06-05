import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/student/Navbar";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Home | Modules";
  }, []);

  return (
    <div className="bg-[#f7f7f7] min-h-screen">
      <Navbar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
