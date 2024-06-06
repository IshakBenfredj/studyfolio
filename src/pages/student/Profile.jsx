import { useContext, useState } from "react";
import images from "../../constants/images";
import { BsCameraFill } from "react-icons/bs";
import Button from "../../components/Button";
import Axios from "../../api";
import { UserContext } from "../../context/userContext";
import { handleSuccess } from "../../utils/toastify";

export default function Profile() {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(file ? file.name : "");

  const { user, setUser } = useContext(UserContext);

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
    formData.append("student_id", user.id);
    formData.append("file", file);
    try {
      const { data } = await Axios.post("/change_student_profile", formData);
      setFile("");
      setFileName("");
      var userUpdate = user;
      userUpdate.profile_pic = data;
      setUser(userUpdate);
      handleSuccess("Success");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-100 pb-4">
      <div className="relative">
        <div className="absolute w-[100%] left-0 right-0 rounded-full h-96 bg-primary/80 -top-64 z-0"></div>
        <div className="w-48 h-48 rounded-full mx-auto mt-6 relative overflow-hidden">
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
        {fileName && (
          <div className="md:w-1/3 w-11/12 mx-auto mt-4 space-y-2">
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
        <div className="bg-white shadow-lg rounded-lg mt-12 p-8 w-11/12 md:w-2/3 lg:w-1/2 mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Profile Information
          </h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <p className="text-xl font-medium">
                {user.fname} {user.lname}
              </p>
              <p className="text-gray-500">{user.state}</p>
            </div>
            <div className="w-full space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Phone:</span> {user.phone}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Date of Birth:</span>{" "}
                {formatDate(user.bdate)}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Group:</span>{" "}
                {user.group.number}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Promo:</span>{" "}
                {user.group.promo.name} ({user.group.promo.year})
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
