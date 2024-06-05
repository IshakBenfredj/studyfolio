import { useContext, useState } from "react";
import images from "../../constants/images";
import { BsCameraFill } from "react-icons/bs";
import Button from "../../components/Button";
import Axios from "../../api";
import { UserContext } from "../../context/userContext";
import { handleSuccess } from "../../utils/toastify";

export default function Profile() {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState(file ? file.name : "");

  const { user } = useContext(UserContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      console.log(file);
    }
  };

  const changeProfile = async () => {
    const formData = new FormData();
    formData.append("student_id", user.id);
    formData.append("file", file);
    try {
      await Axios.post("/change_student_profile", formData);
      setFile("");
      setFileName("");

      handleSuccess("SUccess");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="fixed w-[100%] left-0 right-0 rounded-full h-96 bg-primary/80 -top-52 z-0"></div>
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
              <Button text={"Change Profile"} clickFunc={changeProfile} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
