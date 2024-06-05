import { useContext, useEffect, useState } from "react";
import Axios from "../../api";
import Title from "../../components/Title";
import Loading from "../../components/loading/Loading";
import Search from "../../components/admin/Search";
import { handleError, handleSuccess } from "../../utils/toastify";
import { DataContext } from "../../context/dataContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

export default function Teachers() {
  const [teachersSearch, setTeachersSearch] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const { teachers, setTeachers, loading } = useContext(DataContext);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setTeachersSearch(teachers);
  }, [teachers]);

  const handleSelectedTeachers = (id) => {
    if (!selectedTeachers.includes(id)) {
      setSelectedTeachers([...selectedTeachers, id]);
    } else {
      const filterSelectedTeachers = selectedTeachers.filter((s) => s !== id);
      console.log(filterSelectedTeachers);
      setSelectedTeachers(filterSelectedTeachers);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      const { data } = await Axios.post("/delete_teachers", { ids: [id] });
      const filterTeachers = teachers.filter((t) => t.id != id);
      setTeachers(filterTeachers);
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  const deleteMany = async () => {
    try {
      const { data } = await Axios.post("/delete_teachers", {
        ids: selectedTeachers,
      });
      const filteredTeachers = teachers.filter(
        (teacher) => !selectedTeachers.includes(teacher.id)
      );

      setTeachers(filteredTeachers);
      handleSuccess(data.message);
      setSelectedTeachers([]);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  const selectAll = async () => {
    const ids = Teachers.map((t) => t.id);
    setSelectedTeachers([...selectedTeachers, ...ids]);
  };

  return (
    <div className="py-10 sc:overflow-y-auto w-full h-screen flex flex-col items-center">
      <div className="md:w-1/2">
        <Title text={"Teachers List"} />
      </div>
      <Search
        table={teachersSearch}
        setTable={setTeachersSearch}
        searchText={searchText}
        setSearchText={setSearchText}
        firstTable={teachers}
      />
      {selectedTeachers.length > 0 && (
        <div className="mb-3 center gap-6">
          <button
            onClick={deleteMany}
            className="bg-red-500 text-white py-2 px-4 rounded-full"
          >
            Delete many
          </button>
        </div>
      )}
      <div className="mb-4 center gap-6 font-bold capitalize">
        <span
          className="py-2 px-4 bg-blue-400 text-white rounded-full cursor-pointer"
          onClick={selectAll}
        >
          select all
        </span>
        {selectedTeachers.length > 0 && (
          <span
            className="py-2 px-4 bg-blue-400 text-white rounded-full cursor-pointer"
            onClick={() => setSelectedTeachers([])}
          >
            unselect {selectedTeachers.length}
          </span>
        )}
      </div>
      {loading ? (
        <Loading />
      ) : !teachersSearch.length ? (
        <div className="no-result">
          {!searchText.length
            ? "No Teachers added"
            : `There are no search results for '${searchText}'`}
        </div>
      ) : (
        <div className="overflow-x-scroll sc:overflow-visible w-11/12 sc:center items-start">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>id</TableCell>
                <TableCell>full name</TableCell>
                <TableCell>email</TableCell>
                <TableCell>Events</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachersSearch.map((s) => (
                <TableRow key={s.id}>
                  <TableCell onClick={() => handleSelectedTeachers(s.id)}>
                    <div className="w-full h-full center">
                      <div className="w-6 h-6 border-[1px] border-secondary rounded-md center">
                        {selectedTeachers.includes(s.id) && (
                          <span className="w-[90%] h-[90%] bg-primary rounded-md"></span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{s.id}</TableCell>
                  <TableCell>
                    {s.fname} {s.lname}
                  </TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>
                    <div className="center gap-4 h-full">
                      <Button
                        onClick={() => deleteTeacher(s.id)}
                        variant="text"
                        color="error"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// <table>

//   <thead>
//     <th>Select</th>
//     <th>id</th>
//     <th>full name</th>
//     <th>email</th>
//     <th>Events</th>
//   </thead>
//   <tbody>
//     {teachersSearch.map((s) => (
//       <tr key={s.id}>
//         <td onClick={() => handleSelectedTeachers(s.id)}>
//           <div className="w-full h-full center">
//             <div className="w-6 h-6 border-[1px] border-secondary rounded-md center">
//               {selectedTeachers.includes(s.id) && (
//                 <span className="w-[90%] h-[90%] bg-primary rounded-md"></span>
//               )}
//             </div>
//           </div>
//         </td>
//         <td>{s.id}</td>
//         <td>
//           {s.fname} {s.lname}
//         </td>
//         <td>{s.email}</td>
//         <td>
//           <div className="center gap-4 h-full">
//             <button
//               onClick={() => deleteTeacher(s.id)}
//               className="text-red-500"
//             >
//               Delete
//             </button>
//           </div>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>
