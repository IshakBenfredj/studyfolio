import { useState } from "react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

// eslint-disable-next-line react/prop-types
export default function Drop({ children, title }) {
  const [fermer, setFermer] = useState(false);

  return (
    <div className="bg-white shadow-md border-[1px] border-primary p-3 w-full">
      <div
        onClick={() => setFermer(!fermer)}
        className="flex justify-between cursor-pointer"
      >
        <div className="text-lg font-semibold text-primary">
          <p>{title}</p>
        </div>
        {fermer ? (
          <MdOutlineKeyboardArrowUp size={24} />
        ) : (
          <MdOutlineKeyboardArrowDown size={24} />
        )}
      </div>
      <div
        className={`transition-all duration-500 overflow-hidden ${
          !fermer ? "h-0" : "min-h-fit"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
