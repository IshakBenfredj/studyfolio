import { useContext, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Title from "../../components/Title";
import { handleError, handleSuccess } from "../../utils/toastify";
import Axios from "../../api";
import { DataContext } from "../../context/dataContext";

export default function AddTeacher() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [bdate, setBdate] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { teachers, setTeachers } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(
        "/add_teacher",
        {
          fname,
          lname,
          email,
          password,
          bdate,
          phone,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setTeachers([...teachers, data.teacher]);
      console.log(data.teacher);
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response.data.details);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="md:w-5/12 w-[95%] space-y-3" onSubmit={handleSubmit}>
        <Title text={"Add Teacher"} />
        <Input
          type={"text"}
          name={"fname"}
          label={"First Name"}
          state={fname}
          set={setFname}
        />
        <Input
          type={"text"}
          name={"lname"}
          label={"last name"}
          state={lname}
          set={setLname}
        />
        <Input
          type={"email"}
          name={"email"}
          label={"Email"}
          state={email}
          set={setEmail}
        />
        <Input
          type={"date"}
          name={"bdate"}
          label={"date birthday"}
          state={bdate}
          set={setBdate}
          date
        />
        <Input
          type={"number"}
          name={"phone"}
          label={"Phone"}
          state={phone}
          set={setPhone}
        />

        <Input
          type={"password"}
          name={"password"}
          label={"Password"}
          state={password}
          set={setPassword}
        />
        <div className="pt-4 w-[60%] mx-auto">
          <Button text={"Add New"} />
        </div>
      </form>
    </div>
  );
}
