import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Input from "../components/Input";
import Button from "../components/Button";
import images from "../constants/images";
import Axios from "../api";
import { handleError } from "../utils/toastify";
import { UserContext } from "../context/userContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "StudyFolio Login";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/login", {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      if (data) {
        data.state === "admin" && navigate("/admin/dashboard");
        data.state === "teacher" && navigate("/teacher/dashboard");
        data.state === "student" && navigate("/student");
      }
      setUser(data);
    } catch (error) {
      handleError(error.response.data.message);
    }
  };
  return (
    <div className="flex">
      <div className="lg:w-1/3 md:w-2/5 w-full h-screen p-4 flex flex-col gap-16 justify-center items-center ">
        <img src={images.logo} alt="" className="mx-auto w-2/5" />
        <form className="space-y-4 w-4/5 mx-auto" onSubmit={handleSubmit}>
          <img src={images.logosfp} alt="" className="w-2/3 mx-auto" />
          <Input
            type={"email"}
            name={"email"}
            label={"Email"}
            set={setEmail}
            state={email}
          />
          <Input
            type={"password"}
            name={"password"}
            label={"Password"}
            set={setPassword}
            state={password}
          />
          <Button text={"Log In"} />
          <Link to={"/lost_password"} className="mt-2 text-primary block">
            Lost password ?
          </Link>
        </form>
      </div>
      <div
        className="lg:w-2/3 md:w-3/5 md:block hidden h-screen p-10 relative before:w-full before:h-full before:top-0 before:left-0 
      before:bg-black/60 before:absolute before:z-10"
      >
        <img
          src={images.esisba}
          alt="ESI SBA"
          className="w-full h-full top-0 left-0 absolute z-0"
        />
        <div className="relative z-10">
          <h3 className="text-white font-bold text-4xl leading-10">
            <p>StudyFolio:</p>
            <p className="mt-2">ESI SBA E-Learn</p>
          </h3>
          <p className="text-gray-200 mt-4 w-1/3 text-sm">
            An educational platform dedicated to the Higher School of Computer
            Science in Sidi Bel Abbes to conduct distance learning and teaching.
          </p>
          <Link
            to={"https://www.esi-sba.dz/fr/"}
            target="_blank"
            className="mt-4 p-2 text-white flex items-center gap-2 border-[1px] border-white w-fit transition-all
            hover:text-black hover:bg-white"
          >
            ESI SBA WEBSITE
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
