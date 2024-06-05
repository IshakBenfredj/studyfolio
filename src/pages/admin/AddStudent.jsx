import { useContext, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Title from "../../components/Title";
import images from "../../constants/images";
import UploadCsv from "../../components/uploads/UploadCsv";
import Axios from "../../api";
import { handleError, handleSuccess } from "../../utils/toastify";
import { DataContext } from "../../context/dataContext";

export default function AddStudent() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBdate] = useState("");
  const [phone, setPhone] = useState("");

  const [promo_id, setPromoId] = useState(null);
  const [group_id, setGroupId] = useState(null);

  const { promos, groups, setStudents, students } = useContext(DataContext);

  const [file, setFile] = useState(null);
  const [methodAdd, setMethodAdd] = useState("manuell");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (methodAdd === "csv") {
      await handleStudentCsv();
      return;
    }
    await handleStudentManuell();
  };
  const handleStudentManuell = async () => {
    setLoading(true);
    try {
      const { data } = await Axios.post(
        "/add_student",
        {
          email,
          fname,
          lname,
          birthday,
          phone,
          password,
          group_id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setStudents([...students, data.student]);
      setFile("");
      setGroupId("");
      setPromoId("");
      setEmail("");
      setFname("");
      setLname("");
      setBdate("");
      setPhone("");
      setPassword("");
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response.data.message);
    }
    setLoading(false);
  };
  const handleStudentCsv = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("group_id", group_id);
      const { data } = await Axios.post("/add_student_csv", formData);
      setStudents([...students, ...data.students]);
      setFile("");
      setGroupId("");
      setPromoId("");
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response.data.details);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-y-scroll py-9 pt-16">
      <form
        className="md:w-5/12 w-[95%] space-y-3 mt-8"
        onSubmit={handleSubmit}
      >
        <Title text={"Add Student"} />
        {/* Buttons for choose which methode will use to add students */}
        <div className="flex justify-center text-sm  md:text-md lg:text-lg gap-8 mx-6 my-4">
          <div
            className={`relative py-2 px-5 border-gray-600 rounded cursor-pointer ${
              methodAdd === "manuell"
                ? "bg-primary/70 text-white"
                : "text-gray-600"
            } border-2`}
            onClick={() => setMethodAdd("manuell")}
          >
            <img
              src={images.form}
              alt=""
              className="absolute -top-3 -left-3 w-8"
            />
            <p>Manual Add</p>
          </div>
          <div
            className={`relative py-2 px-5 border-gray-600 rounded cursor-pointer ${
              methodAdd === "csv" ? "bg-primary/70 text-white" : "text-gray-600"
            } border-2`}
            onClick={() => setMethodAdd("csv")}
          >
            <img
              src={images.csv}
              alt=""
              className="absolute -top-3 -left-3 w-8"
            />
            <p>Add By CSV</p>
          </div>
        </div>
        {methodAdd === "manuell" ? (
          <>
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
              label={"Last Name"}
              state={lname}
              set={setLname}
            />
            <Input
              type={"email"}
              name={"Email"}
              label={"Email"}
              state={email}
              set={setEmail}
            />
            <Input
              type={"date"}
              name={"bdate"}
              label={"date"}
              state={birthday}
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
          </>
        ) : (
          <UploadCsv file={file} setFile={setFile} />
        )}
        <Input selectBox set={setPromoId}>
          <option disabled selected={!promo_id}>
            Select Batch
          </option>
          {promos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Input>
        <Input selectBox set={setGroupId}>
          <option disabled selected={!group_id}>
            Select Group
          </option>
          {promo_id &&
            groups.map(
              (g) =>
                g.promo.id == promo_id && (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                )
            )}
        </Input>
        <div className="pt-4 w-[60%] mx-auto">
          <Button text={"Add New"} loading={loading} />
        </div>
      </form>
    </div>
  );
}
