import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";

// Import Icons
import { FaCalendarAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import ModuleCard from "../../components/ModuleCard";
import images from "../../constants/images";
import { BsCameraFill } from "react-icons/bs";
import Axios from "../../api";
import { handleSuccess } from "../../utils/toastify";
import Button from "../../components/Button";
import Loading from "../../components/loading/Loading";

export default function TeacherDashboard() {
  const [file, setFile] = useState("");
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [fileName, setFileName] = useState(file ? file.name : "");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const handleGet = async () => {
      setLoadingPage(true);
      try {
        const { data } = await Axios.post("get_module_by_teacher", {
          teacher_id: user.id,
        });
        setModules(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      setLoadingPage(false);
    };
    handleGet();
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      console.log(file);
    }
  };

  const changeProfile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("teacher_id", user.id);
    formData.append("file", file);
    try {
      const { data } = await Axios.post("/change_teacher_profile", formData);
      setFile("");
      setFileName("");
      var userUpdate = user;
      userUpdate.profile_pic = data;
      setUser(userUpdate);
      handleSuccess("Change Success");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

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
      <div className="flex gap-4 items-center md:w-1/2 w-full mt-5">
        <div className="">
          <div className="w-40 h-40 rounded-full mx-auto relative overflow-hidden">
            <img
              src={user.profile_pic ? user.profile_pic : images.profil}
              alt=""
              className="z-40 relative"
            />
            <label
              htmlFor="pp"
              className="absolute bg-black/70 w-full h-full top-0 left-0 z-50 center transition-all opacity-0 hover:opacity-100 cursor-pointer"
            >
              <BsCameraFill size={33} color="white" />
            </label>
            <input
              type="file"
              id="pp"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="bg-white rounded-md shadow text-primary w-full">
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
          {fileName && (
            <div className="mt-4 flex items-center gap-3">
              <p className="text-lg text-gray-500 text-center">{fileName}</p>
              <div className="w-2/3 mx-auto">
                <Button
                  text={"Change Profile"}
                  clickFunc={changeProfile}
                  loading={loading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {loadingPage ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-4 gap-3 mt-4">
          {modules.map((m) => (
            <ModuleCard
              m={m}
              path={"/teacher/dashboard"}
              key={m.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
