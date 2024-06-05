/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UploadFile from "../../components/uploads/UploadFile";
import images from "../../constants/images";

import { Link } from "react-router-dom";
import Button from "../../components/Button";

export default function Tests({ details }) {
  const [file, setFile] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [answerLink, setAnswerLink] = useState("");

  useEffect(() => {
    const handleSubmit = () => {
      if (file) {
        const uploadedLink = "http://example.com/your-uploaded-file";
        setAnswerLink(uploadedLink);
        setSubmitted(true);
      }
    };
    handleSubmit();
  }, [file]);

  return (
    <div className="p-5 md:w-2/3 w-11/12 mx-auto">
      <h1 className="text-gray-600 font-bold mb-3">
        {details.data.section.module.name} &gt; {details.data.name}
      </h1>
      <div className="bg-white shadow rounded-md p-4">
        <Link
          to={details.data.drive_link}
          target="_blank"
          className="flex items-center gap-1 font-bold text-xl text-primary mb-6"
        >
          <img src={images.devoir} alt="" className="w-12" />
          {details.data.name}
        </Link>
        {details.data.description && (
          <pre className="text-base bg-slate-100 p-3 rounded-lg mb-4">
            {details.data.description}
          </pre>
        )}
        <h1 className="font-bold text-xl">Your Answer :</h1>
        <form className="space-y-3">
          <UploadFile file={file} setFile={setFile} />
          <Button text={"Add Answer"} />
        </form>
        <div className="bg-white rounded-md p-4 mt-6">
          <h2 className="font-bold mb-2 text-xl">Submission Details</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">State</th>
                <th className="border-b p-2">Answer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b p-2">
                  {submitted ? "Submitted" : "Not Submitted"}
                </td>
                <td className="border-b p-2">
                  <a
                    href={answerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Answer
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
