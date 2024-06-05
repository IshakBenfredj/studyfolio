/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Input({
  type,
  name,
  label,
  state,
  set,
  date,
  selectBox,
  textarea,
  children,
  func,
}) {
  const [labelTop, setLabelTop] = useState(false);
  if (selectBox)
    return (
      <div className="w-full mx-auto h-10 relative">
        <select
          className="w-full h-full border border-gray-400 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none px-3"
          autoComplete="new-password"
          onChange={(e) => set(e.target.value)}
        >
          {children}
        </select>
      </div>
    );
  if (textarea)
    return (
      <div className="w-full mx-auto h-20 relative">
        <label
          htmlFor={name}
          className={`absolute capitalize transition-all duration-200 ${
            labelTop || date ? "-top-3 text-blue-600 bg-white px-1" : "top-2 text-gray-400"
          } left-2`}
        >
          {label}
        </label>
        <textarea
          className="w-full pt-4 h-full border border-gray-400 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none px-3"
          autoComplete="new-password"
          value={state}
          onChange={(e) => set(e.target.value)}
          onFocus={() => setLabelTop(true)}
          onBlur={() => !state && setLabelTop(false)}
        ></textarea>
      </div>
    );
  return (
    <div className="w-full mx-auto h-10 relative">
      <label
        htmlFor={name}
        className={`absolute capitalize transition-all duration-200 ${
          labelTop || date
            ? "-top-3 text-blue-600 bg-white px-1"
            : "-translate-y-1/2 top-1/2 text-gray-400"
        } left-2`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={state}
        className="w-full h-full border border-gray-400 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none px-3"
        onFocus={() => setLabelTop(true)}
        onBlur={() => !state && setLabelTop(false)}
        onChange={func ? func : (e) => set(e.target.value)}
        autoComplete="new-password"
      />
    </div>
  );
}
