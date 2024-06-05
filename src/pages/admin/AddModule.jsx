import { useContext, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Title from "../../components/Title";
import UploadImage from "../../components/uploads/UploadImage";
import { handleError, handleSuccess } from "../../utils/toastify";
import Axios from "../../api";
import { DataContext } from "../../context/dataContext";

export default function AddModule() {
  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [coefficient, setCoefficient] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const { modules, setModules } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("acronym", acronym);
      formData.append("description", description);
      formData.append("coefficient", coefficient);
      formData.append("file", file);

      const { data } = await Axios.post("/add_module", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(data.data);
      setModules([...modules, data.data]);
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="md:w-5/12 w-[95%] space-y-3" onSubmit={handleSubmit}>
        <Title text={"Add Module"} />
        <Input
          type={"text"}
          name={"Name"}
          label={"name"}
          state={name}
          set={setName}
        />
        <Input
          type={"text"}
          name={"acronym"}
          label={"acronym"}
          state={acronym}
          set={setAcronym}
        />
        <Input
          type={"number"}
          name={"coefficient"}
          label={"coefficient"}
          state={coefficient}
          set={setCoefficient}
        />
        <Input
          label={"description"}
          state={description}
          set={setDescription}
          textarea
        />
        {/* <Input
          type={"text"}
          label={"Image Link"}
          state={image}
          set={setImage}
        /> */}
        <UploadImage file={file} setFile={setFile} />
        <div className="pt-4 w-[60%] mx-auto">
          <Button text={"Add New"} />
        </div>
      </form>
    </div>
  );
}
