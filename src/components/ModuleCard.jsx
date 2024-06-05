/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/dataContext";
import { Link } from "react-router-dom";

export default function ModuleCard({ m, path }) {
  const { roles } = useContext(DataContext);
  // eslint-disable-next-line no-unused-vars
  const [teachers, setTeachers] = useState(null);

  useEffect(() => {
    const filterTeachers = roles?.filter((r) => r.module.id == m.module.id);
    setTeachers(filterTeachers);
  }, [m, roles]);

  return (
    <Link
      to={`${path}/module/${m.module.id}`}
      className="bg-white rounded-lg overflow-hidden shadow"
    >
      <img
        src={m.module.image_link}
        alt=""
        className="h-40 object-cover w-full"
      />
      <div className="p-2">
        <h3 className="font-bold">
          {m.module.name} ({m.module.acronym})
        </h3>
      </div>
    </Link>
  );
}
