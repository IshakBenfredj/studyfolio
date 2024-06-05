import { useContext, useEffect, useState } from "react";
import Axios from "../../api";
import Title from "../../components/Title";
import Loading from "../../components/loading/Loading";
import Search from "../../components/admin/Search";
import Filter from "../../components/admin/Filter";
import EditPopup from "../../components/admin/EditPopup";
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

export default function Students() {
  // const [students, setStudents] = useState([]);
  const [studentsSearch, setStudentsSearch] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [usersToEdit, setUsersToEdit] = useState([]);
  // const [loading, setLoading] = useState(true);

  const { students, setStudents, loading } = useContext(DataContext);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setStudentsSearch(students);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(students);
  }, [students]);

  const handleSelectedStudents = (id) => {
    if (selectedStudents.includes(id)) {
      const filterSelectedStudents = selectedStudents.filter((s) => s != id);
      console.log(filterSelectedStudents);
      setSelectedStudents(filterSelectedStudents);
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const { data } = await Axios.post("/delete_students", { ids: [id] });
      const filteredStudents = students.filter((t) => t.id !== id);
      setStudents(filteredStudents);
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  const deleteMany = async () => {
    try {
      const { data } = await Axios.post("/delete_students", {
        ids: selectedStudents,
      });
      const filteredStudents = students.filter(
        (teacher) => !selectedStudents.includes(teacher.id)
      );

      setStudents(filteredStudents);
      handleSuccess(data.message);
      setSelectedStudents([]);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  const selectAll = async () => {
    const ids = students.map((t) => t.id);
    setSelectedStudents([...selectedStudents, ...ids]);
  };

  return (
    <>
      {usersToEdit.length > 0 && (
        <EditPopup
          table={usersToEdit}
          setTable={setUsersToEdit}
          users={students}
        />
      )}
      <div className="py-10 sc:overflow-y-auto w-full h-screen flex flex-col items-center">
        <div className="md:w-1/2">
          <Title text={"Students List"} />
        </div>
        <Search
          table={studentsSearch}
          setTable={setStudentsSearch}
          firstTable={students}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <Filter
          table={studentsSearch}
          setTable={setStudentsSearch}
          firstTable={students}
        />
        {selectedStudents.length > 0 && (
          <div className="mb-3 center gap-6">
            <button
              onClick={deleteMany}
              className="bg-red-500 text-white py-2 px-4 rounded-full"
            >
              Delete many
            </button>
            <button
              onClick={() => setUsersToEdit(selectedStudents)}
              className="bg-green-500 text-white py-2 px-4 rounded-full"
            >
              Edit many
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
          {selectedStudents.length > 0 && (
            <span
              className="py-2 px-4 bg-blue-400 text-white rounded-full cursor-pointer"
              onClick={() => setSelectedStudents([])}
            >
              unselect {selectedStudents.length}
            </span>
          )}
        </div>
        {loading ? (
          <Loading />
        ) : !studentsSearch.length ? (
          <div className="no-result">
            {!searchText.length
              ? "No students added"
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
                  <TableCell>batch</TableCell>
                  <TableCell>group</TableCell>
                  <TableCell>Events</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentsSearch.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell onClick={() => handleSelectedStudents(s.id)}>
                      <div className="w-full h-full center">
                        <div className="w-6 h-6 border-[1px] border-secondary rounded-md center">
                          {selectedStudents.includes(s.id) && (
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
                    <TableCell>{s.group?.promo.name}</TableCell>
                    <TableCell>{s.group?.number}</TableCell>
                    <TableCell>
                      <div className="center gap-4 h-full">
                        <Button
                          onClick={() => setUsersToEdit([s.id])}
                          variant="text"
                          color="success"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteStudent(s.id)}
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
    </>
  );
}

{
  /* <table>
  <thead>
    <th>Select</th>
    <th>id</th>
    <th>full name</th>
    <th>email</th>
    <th>batch</th>
    <th>group</th>
    <th>Events</th>
  </thead>
  <tbody>
    {studentsSearch.map((s) => (
      <tr key={s.id}>
        <td onClick={() => handleSelectedStudents(s.id)}>
          <div className="w-full h-full center">
            <div className="w-6 h-6 border-[1px] border-secondary rounded-md center">
              {selectedStudents.includes(s.id) && (
                <span className="w-[90%] h-[90%] bg-primary rounded-md"></span>
              )}
            </div>
          </div>
        </td>
        <td>{s.id}</td>
        <td>
          {s.fname} {s.lname}
        </td>
        <td>{s.email}</td>
        <td>{s.group?.promo.name}</td>
        <td>{s.group?.number}</td>
        <td>
          <div className="center gap-4 h-full">
            <button
              onClick={() => setUsersToEdit([s.id])}
              className="text-green-500"
            >
              Edit
            </button>
            <button
              onClick={() => deleteStudent(s.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>; */
}
