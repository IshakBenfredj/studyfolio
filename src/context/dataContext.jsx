/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import Axios from "../api";

export const DataContext = createContext();

export default function DataContextProvider({ children }) {
  const [promos, setPromos] = useState([]);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [modules, setModules] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoModules, setPromoModules] = useState(null);

  function set(data) {
    setGroups(data.groups);
    setPromos(data.promos);
    setStudents(data.students);
    setTeachers(data.teachers.filter((t) => t.state !== "admin"));
    setModules(data.modules);
    setRoles(data.roles);
    setPromoModules(data.studies);
    setLoading(false)
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.get("/get");
      localStorage.setItem("data", JSON.stringify(data));
      set(data);
      // setLoading(false);
    };
    const dataLocals = localStorage.getItem("data");
    if (dataLocals) set(JSON.parse(dataLocals));
    getData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        promos,
        setPromos,
        groups,
        setGroups,
        students,
        setStudents,
        teachers,
        setTeachers,
        modules,
        setModules,
        roles,
        setRoles,
        promoModules,
        setPromoModules,
        loading,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
