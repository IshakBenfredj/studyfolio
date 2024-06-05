import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Title from "../../components/Title";
import { DataContext } from "../../context/dataContext";
import { UserContext } from "../../context/userContext";
import Axios from "../../api";
import UploadFile from "../../components/uploads/UploadFile";
import { handleError, handleSuccess } from "../../utils/toastify";

export default function AddResource() {
  const [resource_name, setName] = useState("");
  const [file, setFile] = useState("");
  const [id_section, setIdSection] = useState("null");
  const [section_name, setSectionName] = useState("");
  const [id_module, setIdModule] = useState("");
  const [sections, setSections] = useState([]);
  const [type, setType] = useState("COURS");
  const [link, setLink] = useState("");
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
        formData.append("resource_name", resource_name);
        formData.append("id_section", id_section);
        formData.append("id_module", id_module);
        formData.append("id_teacher", user.id);
        formData.append("section_name", section_name);
        formData.append("link", link);
        formData.append("type", type);
        formData.append("file", file);

        const { data } = await Axios.post("/add_resource", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(data.data.drive_link);
        section_name && setSections([...sections, data.section]);
        handleSuccess(data.message);
      } catch (error) {
        handleError(error.response.data.error);
      }
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="md:w-5/12 w-[95%] space-y-3" onSubmit={handleSubmit}>
        <Title text={"Add Resource"} />
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
        <Input selectBox set={setType}>
          <option value="COURS" selected>
            COURS
          </option>
          <option value="TD">TD/TP</option>
          <option value="MOOC">MOOC</option>
        </Input>
        <Input
          type={"text"}
          name={"name"}
          label={"Resource Name"}
          state={resource_name}
          set={setName}
        />
        {type !== "MOOC" ? (
          <UploadFile file={file} setFile={setFile} />
        ) : (
          <Input
            type={"link"}
            name={"mooc link"}
            label={"mooc link"}
            state={link}
            set={setLink}
          />
        )}
        <div className="pt-4 w-[60%] mx-auto">
          <Button text={"Add New"} loading={loading} />
        </div>
      </form>
    </div>
  );
}
