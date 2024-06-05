import { useContext, useEffect, useState } from "react";
import PopupContainer from "../PopupContainer";
import { DataContext } from "../../context/dataContext";
import Button from "../Button";
import { MdDeleteForever } from "react-icons/md";
import Input from "../Input";
import Axios from "../../api";
import { handleError, handleSuccess } from "../../utils/toastify";

// eslint-disable-next-line react/prop-types
export default function TeachersRole({ moduleId, setModuleId }) {
  const [rolesCharge, setRolesCharge] = useState(null);
  const [rolesTd, setRolesTd] = useState(null);
  const [teacherId, setTeacherId] = useState("");
  const [type_charge, setTypeCharge] = useState("COURS");
  const [permission, setPermission] = useState("W");

  const { roles, setRoles, teachers, modules } = useContext(DataContext);

  const deleteRole = async () => {
    //
  };
  const addRole = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/assign_role", {
        id_teacher: teacherId,
        id_module: moduleId,
        type_charge,
        permission,
      });
      const info = {
        teacher: teachers.find((e) => e.id == teacherId),
        module: modules.find((e) => e.id == moduleId),
        type_charge,
        permission,
      };
      setRoles([...roles, info]);
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response.data.message);
    }
  };

  useEffect(() => {
    const charge = roles.filter(
      (e) => e.type_charge === "COURS" && e.module.id == moduleId
    );
    if (charge.length > 0) {
      setRolesCharge(charge);
    }
    const td = roles.filter(
      (e) => e.type_charge === "TD" && e.module.id == moduleId
    );
    if (td.length > 0) {
      setRolesTd(td);
    }
  }, [roles, moduleId]);

  return (
    <PopupContainer>
      <div className="bg-third h-1/2 overflow-y-scroll sc:w-1/3 md:2/3 w-11/12 rounded-md p-3 space-y-3">
        <form className="text-secondary space-y-2" onSubmit={addRole}>
          <h1 className="text-secondary font-bold capitalize text-xl text-center">
            Add New
          </h1>
          <Input selectBox set={setTeacherId}>
            <option disabled selected>
              Select Prof
            </option>
            {teachers.length > 0 &&
              teachers.map((teacher) => (
                <option
                  key={teacher.id}
                  value={teacher.id}
                  className="text-secondary"
                >
                  {teacher.fname} {teacher.lname}
                </option>
              ))}
          </Input>
          <Input selectBox set={setTypeCharge}>
            <option selected value={"COURS"}>
              COURSE
            </option>
            <option value={"TD"}>TD</option>
          </Input>
          <Input selectBox set={setPermission}>
            <option selected value={"W"}>
              Write
            </option>
            <option value={"R"}>Read</option>
          </Input>
          <div className="grid grid-cols-4 w-full gap-2">
            <Button text={"Close"} danger clickFunc={() => setModuleId("")} />
            <div className="col-span-3">
              <Button text={"Add Role"} />
            </div>
          </div>
        </form>
        <h1 className="text-secondary font-bold capitalize text-xl text-center">
          Teachers Of Course
        </h1>
        <div className="space-y-2 font-semibold">
          {!rolesCharge ? (
            <p className="text-red-500 text-center font-bold capitalize">
              No profes here
            </p>
          ) : (
            rolesCharge.map((r) => (
              <div key={r.id} className="center justify-between">
                <p>
                  {r.teacher.fname} {r.teacher.lname}
                </p>
                <p>
                  <MdDeleteForever
                    size={24}
                    className="text-red-500 cursor-pointer"
                    onClick={deleteRole}
                  />
                </p>
              </div>
            ))
          )}
        </div>
        <h1 className="text-secondary font-bold capitalize text-xl text-center">
          Teachers Of Td
        </h1>
        <div className="space-y-2 font-semibold">
          {!rolesTd ? (
            <p className="text-red-500 text-center font-bold capitalize">
              No profes here
            </p>
          ) : (
            rolesTd.map((r) => (
              <div key={r.id} className="center justify-between">
                <p>
                  {r.teacher.fname} {r.teacher.lname}
                </p>
                <p>
                  <MdDeleteForever
                    size={24}
                    className="text-red-500 cursor-pointer"
                    onClick={deleteRole}
                  />
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </PopupContainer>
  );
}
