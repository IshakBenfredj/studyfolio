/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import Axios from "../../api";
import Title from "../../components/Title";
import Loading from "../../components/loading/Loading";
import Search from "../../components/admin/Search";
import { handleError, handleSuccess } from "../../utils/toastify";
import TeachersRole from "../../components/admin/TeachersRole";
import { DataContext } from "../../context/dataContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Button,
} from "@mui/material";

export default function Modules() {
  const [modulesSearch, setModulesSearch] = useState([]);
  const [moduleId, setModuleId] = useState("");

  const { modules, loading } = useContext(DataContext);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setModulesSearch(modules);
  }, [modules]);

  return (
    <>
      {moduleId && (
        <TeachersRole moduleId={moduleId} setModuleId={setModuleId} />
      )}
      <div className="py-10 sc:overflow-y-auto w-full h-screen flex flex-col items-center">
        <div className="md:w-1/2">
          <Title text={"Modules List"} />
        </div>
        <Search
          table={modulesSearch}
          setTable={setModulesSearch}
          searchText={searchText}
          setSearchText={setSearchText}
          firstTable={modules}
          module
        />
        {loading ? (
          <Loading />
        ) : !modulesSearch.length ? (
          <div className="no-result">
            {!searchText.length
              ? "No Modules added"
              : `There are no search results for '${searchText}'`}
          </div>
        ) : (
          <div className="overflow-x-scroll sc:overflow-visible w-11/12 sc:center items-start">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Acronym</TableCell>
                    <TableCell>Coefficient</TableCell>
                    <TableCell>Profs Cours</TableCell>
                    <TableCell>Profs Td</TableCell>
                    <TableCell>Events</TableCell>
                    {/* Add other table headers as needed */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modulesSearch.map((m) => (
                    <Tr key={m.id} m={m} setModuleId={setModuleId} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
}

const Tr = ({ m, setModuleId }) => {
  const [rolesCharge, setRolesCharge] = useState(null);
  const [rolesTd, setRolesTd] = useState(null);

  const { modules, setModules, roles } = useContext(DataContext);

  useEffect(() => {
    const charge = roles.filter(
      (e) => e.type_charge === "COURS" && e.module.id == m.id
    );
    if (charge.length > 0) {
      setRolesCharge(charge);
    }
    const td = roles.filter(
      (e) => e.type_charge === "TD" && e.module.id == m.id
    );
    if (td.length > 0) {
      setRolesTd(td);
    }
  }, [m, roles]);

  const deleteModule = async (id) => {
    try {
      const { data } = await Axios.post("/delete_module", { id_module: id });
      const filterd = modules.filter((m) => m.id != id);
      setModules(filterd);
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  return (
    <TableRow key={m.id}>
      <TableCell>{m.name}</TableCell>
      <TableCell>{m.acronym}</TableCell>
      <TableCell>{m.coefficient}</TableCell>
      <TableCell>
        {rolesCharge &&
          rolesCharge.map((r) => (
            <li key={r.id}>
              {r.teacher.fname} {r.teacher.lname}
            </li>
          ))}
      </TableCell>
      <TableCell>
        {rolesTd &&
          rolesTd.map((r) => (
            <li key={r.id}>
              {r.teacher.fname} {r.teacher.lname}
            </li>
          ))}
      </TableCell>
      <TableCell>
        <div className="center gap-4 h-full">
          <Button
            onClick={() => setModuleId(m.id)}
            variant="text"
            color="success"
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteModule(m.id)}
            variant="text"
            color="error"
          >
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

// <tr key={m.id}>
//   <td>{m.name}</td>
//   <td>{m.acronym}</td>
//   {/* <td><a href={m.image_link} download={true}>ksdkdk</a></td> */}
//   <td>{m.coefficient}</td>
//   {/* <td>{promoModules.find((s) => s.module.id == m.id).semester}</td> */}
//   <td>
//     {rolesCharge &&
//       rolesCharge.map((r) => (
//         <li key={r.id}>
//           {r.teacher.fname} {r.teacher.lname}
//         </li>
//       ))}
//   </td>
//   <td>
//     {rolesTd &&
//       rolesTd.map((r) => (
//         <li key={r.id}>
//           {r.teacher.fname} {r.teacher.lname}
//         </li>
//       ))}
//   </td>
//   <td>
//     <div className="center gap-4 h-full">
//       <button onClick={() => setModuleId(m.id)} className="text-green-500">
//         Edit
//       </button>
//       <button onClick={() => deleteModule(m.id)} className="text-red-500">
//         Delete
//       </button>
//     </div>
//   </td>
// </tr>

// {/* <table>
//   <thead>
//     <th>Name</th>
//     <th>Acronym</th>
//     <th>Coefficient</th>
//     {/* <th>Semester</th> */}
//     <th>Profs Cours</th>
//     <th>Profs Td</th>
//     <th>Events</th>
//   </thead>
//   <tbody>
//     {modulesSearch.map((m) => (
//       <Tr key={m.id} m={m} setModuleId={setModuleId} />
//     ))}
//   </tbody>
// </table>; */}
