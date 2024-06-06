/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function ModuleCard({ m, path }) {

  return (
    <Link
      to={`${path}/module/${m.id}`}
      className="bg-white rounded-lg overflow-hidden shadow"
    >
      <img
        src={m.image_link}
        alt=""
        className="h-40 object-cover w-full"
      />
      <div className="p-2">
        <h3 className="font-bold">
          {m.name} ({m.acronym})
        </h3>
      </div>
    </Link>
  );
}
