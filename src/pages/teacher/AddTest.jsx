import { useContext, useEffect, useState } from "react";
import Input from "../../components/Input";
import Title from "../../components/Title";
import Button from "../../components/Button";
import UploadFile from "../../components/uploads/UploadFile";
import Axios from "../../api";
import { DataContext } from "../../context/dataContext";
import { UserContext } from "../../context/userContext";
import { handleError, handleSuccess } from "../../utils/toastify";

export default function AddTest() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [id_section, setIdSection] = useState("null");
  const [section_name, setSectionName] = useState("");
  const [id_module, setIdModule] = useState("");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  const { modules, roles } = useContext(DataContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getSections = async () => {
      const { data } = await Axios.post("/get_module_sections", { id_module });
      setSections(data);
    };
    id_module && getSections();
  }, [id_module]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("id_section", id_section);
        formData.append("id_module", id_module);
        formData.append("description", description);
        formData.append("section_name", section_name);
        formData.append("type", "TEST");
        formData.append("file", file);
        const { data } = await Axios.post("/add_test", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        section_name && setSections([...sections, data.section]);
        handleSuccess(data.message);
        setName("");
        setDescription("");
        setFile(null);
        setIdSection("null");
        setSectionName("");
        setIdModule("");
        setSections([]);
      } catch (error) {
        handleError(error.response.data.error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="md:w-5/12 w-[95%] space-y-3" onSubmit={handleSubmit}>
        <Title text={"Add Test"} />
        <Input selectBox set={setIdModule}>
          <option disabled selected={!id_module}>
            Select Module
          </option>
          {modules.map((m) => {
            if (
              roles.find(
                (r) =>
                  r.module.id == m.id &&
                  r.teacher.id == user.id &&
                  r.permission === "W"
              )
            )
              return (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              );
          })}
        </Input>
        {sections.length > 0 && (
          <Input selectBox set={setIdSection}>
            <option disabled selected>
              Select Section
            </option>
            <option value={"null"}>New Section</option>
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Input>
        )}
        {(!sections.length || id_section === "null") && id_module && (
          <Input
            type={"text"}
            name={"sectionName"}
            label={"new section"}
            state={section_name}
            set={setSectionName}
          />
        )}
        <Input
          type={"text"}
          name={"name"}
          label={"Test Name"}
          state={name}
          set={setName}
        />
        <Input
          name={"description"}
          label={"description"}
          state={description}
          set={setDescription}
          textarea
        />
        <UploadFile file={file} setFile={setFile} />
        <div className="pt-4 w-[60%] mx-auto">
          <Button text={"Add Test"} loading={loading} />
        </div>
      </form>
    </div>
  );
}
