/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import Title from "../../components/Title";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Button from "../../components/Button";
import Axios from "../../api";
import { handleError, handleSuccess } from "../../utils/toastify";
import { UserContext } from "../../context/userContext";
import Loading from "../../components/loading/Loading";

export default function Quizzes({
  details,
  rightAnswers,
  setRightAnswers,
  activity_id,
}) {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [counter, setCounter] = useState(0);
  const [submission, setSubmission] = useState(null);
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

  const next = () => {
    setCounter(counter + 1);
  };

  const prev = () => {
    setCounter(counter - 1);
  };

  const selectAnswer = (index) => {
    const updatedAnswers = [...rightAnswers];
    updatedAnswers[counter].userAnswer = index;
    setRightAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    let newNote = 0;
    rightAnswers.forEach((ra) => {
      if (ra.rightAnswer === ra.userAnswer) {
        newNote += 1;
      }
    });
    const formData = new FormData();
    formData.append("note", newNote);
    formData.append("student_id", user.id);
    formData.append("student_name", `${user.lname} ${user.fname}`);
    formData.append("activity_id", activity_id);
    if (rightAnswers.filter((ra) => ra.userAnswer).length > 0) {
      try {
        const { data } = await Axios.post("/add_submission", formData);
        setSubmission(data);
        handleSuccess("Submission Added With Success");
      } catch (error) {
        console.log(error);
      }
    } else {
      handleError("You do not add any answer");
    }
    setLoadingSubmit(false);
  };

  return (
    <div className="sc:w-1/3 md:w-2/3 w-[97%] mx-auto">
      <Title text={"Quiz Activity"} />
      <div className="space-y-3">
        {loadingPage ? (
          <Loading />
        ) : !submission ? (
          <>
            <div className="bg-white shadow p-2 pb-4 space-y-2">
              <h3 className="font-bold text-lg">
                {details.data[counter].question}
              </h3>
              {details.data[counter].answers.map((a, index) => (
                <div key={index} className="flex gap-2">
                  <div
                    className="flex items-center gap-2"
                    onClick={() => selectAnswer(index)}
                  >
                    <div className="w-5 h-5 rounded border-[1px] border-black center">
                      {rightAnswers[counter]?.userAnswer === index && (
                        <span className="bg-primary w-4 h-4 rounded"></span>
                      )}
                    </div>
                    <h4>{a}</h4>
                  </div>
                </div>
              ))}
              <div className="center gap-3 my-4">
                <FaArrowLeft
                  className={`bg-gray-100 h-10 w-10 p-3 rounded-full ${
                    counter === 0
                      ? "text-gray-500 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={counter !== 0 && prev}
                />
                <FaArrowRight
                  className={`bg-gray-100 h-10 w-10 p-3 rounded-full ${
                    counter === Object.keys(details.data).length - 1
                      ? "text-gray-500 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={
                    counter !== Object.keys(details.data).length - 1 && next
                  }
                />
              </div>
              {counter === Object.keys(details.data).length - 1 && (
                <Button
                  text={"Submit"}
                  loading={loadingSubmit}
                  clickFunc={handleSubmit}
                />
              )}
            </div>
            <p className="text-center text-gray-500 text-lg font-semibold">
              You added{" "}
              <span className="font-bold text-primary text-xl">
                {rightAnswers.filter((ra) => ra.userAnswer).length}
              </span>{" "}
              answer from{" "}
              <span className="font-bold text-primary text-xl">
                {rightAnswers.length}
              </span>
            </p>
          </>
        ) : (
          <div className="bg-white shadow p-2 pb-4 space-y-2">
            <h1 className="no-result">You already answer this Quiz</h1>
            <h1 className="font-semibold">
              Your Note :{" "}
              <span className="font-bold text-gray-900 text-2xl">
                {submission.mark}/{rightAnswers.length}
              </span>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
