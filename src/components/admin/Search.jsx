/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";

export default function Search({
  setTable,
  searchText,
  setSearchText,
  firstTable,
  module,
  promo
}) {
  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const filterTable = firstTable.filter((e) => {
        const name = !module ? `${e.fname} ${e.lname}` : e.name;
        return name.toLowerCase().includes(value.toLowerCase());
      });
      setTable(filterTable);
    } else {
      setTable(firstTable);
    }
  };
  const handleSearch2 = (value) => {
    setSearchText(value);
    if (value) {
      const filterTable = firstTable.filter((e) => {
        const name = e.module.name;
        return name.toLowerCase().includes(value.toLowerCase());
      });
      setTable(filterTable);
    } else {
      setTable(firstTable);
    }
  };
  return (
    <div className="w-1/3">
      <div className="mb-6 border-2 border-gray-600 rounded-full center overflow-hidden">
        <span className="p-2 text-2xl center bg-white text-secondary">
          <FaSearch />
        </span>
        <input
          type="search"
          className="border-none outline-none w-full h-full p-3"
          placeholder="Search"
          onChange={(e) => promo ? handleSearch2(e.target.value) : handleSearch(e.target.value)}
          value={searchText}
        />
      </div>
    </div>
  );
}
