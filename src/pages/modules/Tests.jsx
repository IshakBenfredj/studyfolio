/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import UploadFile from "../../components/uploads/UploadFile";
import images from "../../constants/images";

import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { UserContext } from "../../context/userContext";
import Axios from "../../api";
import { handleError, handleSuccess } from "../../utils/toastify";
import Loading from "../../components/loading/Loading";

export default function Tests({ details, activity_id }) {
  const [file, setFile] = useState("");
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const handleSubmite = async () => {
      try {
        const { data } = await Axios.post("/get_submissions", { activity_id });
        const sb = data.filter((d) => d.student.id == user.id);
        setSubmission(sb[0]);
        console.log(sb[0]);
      } catch (error) {
        console.log(error);
      }
      setLoadingPage(false);
    };
    handleSubmite();
  }, [activity_id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("student_id", user.id);
    formData.append("student_name", `${user.lname} ${user.fname}`);
    formData.append("activity_id", activity_id);
    if (file) {
      try {
        const { data } = await Axios.post("/add_submission", formData);
        setSubmission(data);
        handleSuccess("Submission Added With Success");
      } catch (error) {
        console.log(error);
      }
    } else {
      handleError("File is Required");
    }
    setLoading(false);
  };

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
        {loadingPage ? (
          <Loading />
        ) : (
          <>
            <h1 className="font-bold text-xl">Your Answer :</h1>
            {
              !submission ? <form className="space-y-3" onSubmit={handleSubmit}>
              <UploadFile file={file} setFile={setFile} />
              <Button text={"Add Answer"} loading={loading} />
            </form> : <div className="no-result text-green-500">You have already answered this Test.</div>
            }
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
                      {submission ? "Submitted" : "Not Submitted"}
                    </td>
                    <td className="border-b p-2">
                      {submission ? (
                        <Link
                          to={submission?.drive_link}
                          target="_blank"
                          className="text-blue-500 underline"
                        >
                          View Answer
                        </Link>
                      ) : (
                        <p className="text-gray-500">No Answer</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
