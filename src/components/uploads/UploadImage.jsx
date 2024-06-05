import { BiEdit } from "react-icons/bi";
import { MdUploadFile } from "react-icons/md";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { handleError } from "../../utils/toastify";

export default function UploadImage({ file, setFile }) {
  const [fileName, setFileName] = useState(file ? file.name : "");

  const handleFileChange = (files) => {
    const selectedFile = files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      handleError("Please select a valid image file.");
    }
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
              <input {...getInputProps()} accept="image/*" />
              <label
                htmlFor="file"
                className="cursor-pointer flex items-center justify-center flex-col gap-3 p-4 text-gray-600"
              >
                {!file ? (
                  <>
                    <MdUploadFile size={35} />
                    <span className="capitalize text-lg">
                      Select or drag an image here
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
