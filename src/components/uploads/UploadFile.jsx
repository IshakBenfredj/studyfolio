/* eslint-disable react/prop-types */
import { BiEdit } from "react-icons/bi";
import { MdUploadFile } from "react-icons/md";
import Dropzone from "react-dropzone";
import { useState } from "react";

export default function UploadFile({ file, setFile }) {
  const [fileName, setFileName] = useState(file ? file.name : "");

  const handleFileChange = (files) => {
    const file = files[0];
    setFile(file);
    console.log(file);
    setFileName(file.name);
  };

  return (
    <div className="relative">
      <div className="flex mt-5 gap-2 bg-white">
        <Dropzone multiple={false} onDrop={handleFileChange}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="cursor-pointer w-full border-gray-600 border-2 border-dashed rounded-md"
            >
              <input {...getInputProps()} />
              <label
                htmlFor="file"
                className="cursor-pointer flex items-center justify-center flex-col gap-3 p-4 text-gray-600"
              >
                {!file ? (
                  <>
                    <MdUploadFile size={35} />
                    <span className="capitalize text-lg">
                      select or drag file here to add students
                    </span>
                  </>
                ) : (
                  <>
                    <BiEdit size={24} />
                    <p>{fileName.slice(0, 15)}...</p>
                  </>
                )}
              </label>
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
}
