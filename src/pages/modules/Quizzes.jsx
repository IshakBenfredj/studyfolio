/* eslint-disable react/prop-types */
import { useState } from "react";
import Title from "../../components/Title";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Button from "../../components/Button";
import Axios from "../../api";

export default function Quizzes({ details, rightAnswers, setRightAnswers }) {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [counter, setCounter] = useState(0);

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
    try {
      await Axios.post("/add_note", { note: newNote });
    } catch (error) {
      console.log(error);
    }
    setLoadingSubmit(false);
  };

  return (
    <div className="sc:w-1/3 md:w-2/3 w-[97%] mx-auto">
      <Title text={"Quiz Activity"} />
      <div className="space-y-3">
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
              onClick={counter !== Object.keys(details.data).length - 1 && next}
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
      </div>
    </div>
  );
}
