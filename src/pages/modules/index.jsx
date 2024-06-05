import { useContext, useEffect, useState } from "react";
import { handleError, handleSuccess } from "../../utils/toastify";
import Axios from "../../api";
import { Link, useParams } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Loading from "../../components/loading/Loading";
import images, { files } from "../../constants/images";
import { UserContext } from "../../context/userContext";
import { DataContext } from "../../context/dataContext";

export default function ModuleDetails() {
  const { id_module } = useParams();
  const [data, setData] = useState(null);
  const { user } = useContext(UserContext);
  const { roles } = useContext(DataContext);

  const getData = async () => {
    try {
      const { data } = await Axios.post("/get_ressource", { id_module });
      setData(data);
      console.log(data);
    } catch (error) {
      handleError(error.response.data.details);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_module]);

  const deleteActivity = async (id) => {
    try {
      const response = await Axios.post("/delete_activity", { id });
      handleSuccess(response.data.message);
      getData();
    } catch (error) {
      handleError(error.response.data.error);
    }
  };
  const deleteResource = async (id) => {
    try {
      const response = await Axios.post("/delete_resource", { id });
      handleSuccess(response.data.message);
      getData();
    } catch (error) {
      handleError(error.response.data.error);
    }
  };
  const deleteSection = async (id) => {
    try {
      await Axios.post("/delete_section", { sections: [id] });
      const { data } = await Axios.post("/get_ressource", { id_module });
      setData(data);
      handleSuccess("");
    } catch (error) {
      console.log(error);
    }
  };
  const specialCss = "sc:overflow-y-auto w-full h-screen";
  return (
    <div className={`p-4 ${user.state === "teacher" && specialCss}`}>
      {!data ? (
        <Loading />
      ) : !data.length ? (
        <div className="no-result text-center text-4xl">No Data Added</div>
      ) : (
        <div className="sc:w-2/3 w-11/12 mx-auto space-y-4">
          <h1 className="font-bold text-3xl my-3 text-primary">Module :</h1>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<IoIosArrowDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <b>
                {data[0].module.name} ({data[0].module.acronym})
              </b>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-gray-700">{data[0]?.module.description}</p>
              <h5 className="font-semibold mt-2">
                Coefficient :{" "}
                <span className="text-primary">
                  {data[0].module.coefficient}
                </span>
              </h5>
            </AccordionDetails>
          </Accordion>
          <h1 className="font-bold text-3xl my-3 text-primary">Sections :</h1>
          {data.map((d) => (
            <Accordion key={d.id}>
              <AccordionSummary
                expandIcon={<IoIosArrowDown />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <b>{d.name}</b>
              </AccordionSummary>
              <AccordionDetails>
                {user?.state === "teacher" &&
                  roles.find(
                    (r) => r.teacher.id == user.id && r.module.id == id_module
                  ).permission == "W" && (
                    <button
                      className="border-2 border-red-500 text-red-500 p-2"
                      onClick={() => deleteSection(d.id)}
                    >
                      Delete Section
                    </button>
                  )}
                <h1 className="font-bold my-3 text-primary">Activities :</h1>
                {!d.activities.length ? (
                  <div className="no-result">No Activities added</div>
                ) : (
                  d.activities.map((r, index) => (
                    <div
                      className="p-3 relative bg-[#f7f7f7] my-2 border-l-4 border-primary flex justify-between items-center"
                      key={r.id}
                    >
                      <Link
                        to={`/${
                          user.state === "teacher"
                            ? "teacher/dashboard"
                            : "student"
                        }/activity/${r.id}`}
                        className={`flex items-center gap-2 ${
                          index !== d.activities.length - 1 && "border-b-[1px]"
                        }`}
                      >
                        <img src={images.devoir} alt="" className="w-7" />
                        {r.name}
                      </Link>
                      {user?.state === "teacher" &&
                        roles.find(
                          (r) =>
                            r.teacher.id == user.id && r.module.id == id_module
                        ).permission == "W" && (
                          <MdDelete
                            size={24}
                            className="text-red-400 cursor-pointer"
                            onClick={() => deleteActivity(r.id)}
                          />
                        )}
                    </div>
                  ))
                )}
                <h1 className="font-bold my-3 text-primary">Ressources :</h1>
                {!d.ressources.length ? (
                  <div className="no-result">No ressources added</div>
                ) : (
                  d.ressources.map((r, index) => (
                    <div
                      className="p-3 relative bg-[#f7f7f7] border-l-4 border-primary flex justify-between items-center"
                      key={r.id}
                    >
                      <Link
                        target="_blank"
                        to={r.drive_link}
                        className={`flex items-center gap-2  ${
                          index !== d.ressources.length - 1 && "border-b-[1px]"
                        }`}
                      >
                        <img src={files[r.extension]} alt="" className="w-7" />
                        {r.name}
                      </Link>
                      {user?.state === "teacher" &&
                        roles.find(
                          (r) =>
                            r.teacher.id == user.id && r.module.id == id_module
                        ).permission == "W" && (
                          <MdDelete
                            size={24}
                            className="text-red-400 cursor-pointer"
                            onClick={() => deleteResource(r.id)}
                          />
                        )}
                    </div>
                  ))
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
}
