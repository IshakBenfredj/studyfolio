import { useContext, useEffect, useState } from "react";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Axios from "../../api";
import { handleError, handleSuccess } from "../../utils/toastify";
import { DataContext } from "../../context/dataContext";
import { UserContext } from "../../context/userContext";

export default function AddQuizzes() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [quizzes, setQuizzes] = useState({});
  const [name, setName] = useState("");
  const [id_section, setIdSection] = useState("null");
  const [section_name, setSectionName] = useState("");
  const [id_module, setIdModule] = useState("");
  const [sections, setSections] = useState([]);

  const { modules, roles } = useContext(DataContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getSections = async () => {
      const { data } = await Axios.post("/get_module_sections", { id_module });
      setSections(data);
    };
    id_module && getSections();
  }, [id_module]);

  const handleAddQuiz = (e) => {
    e.preventDefault();

    const newQuiz = {
      question: question,
      answers: answers,
      correctAnswerIndex: correctAnswerIndex,
    };

    const id = Object.keys(quizzes).length;

    setQuizzes({
      ...quizzes,
      [id]: newQuiz,
    });
    setQuestion("");
    setAnswers(["", "", "", ""]);
    setCorrectAnswerIndex(null);
  };

  const handleDeleteQuiz = (id) => {
    const newQuizzes = quizzes.filter((q) => q.id != id);
    setQuizzes(newQuizzes);
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  useEffect(() => {
    console.log(correctAnswerIndex);
  }, [correctAnswerIndex]);

  const handleSaveQuizzes = async () => {
    try {
      const { data } = await Axios.post("/add_quizz", {
        quizzes,
        id_module,
        id_section,
        section_name,
        name,
      });
      handleSuccess(data.message);
      setQuestion("");
      setAnswers(["", "", "", ""]);
      setCorrectAnswerIndex(null);
      setQuizzes({});
      setName("");
      setIdSection("null");
      setSectionName("");
      setIdModule("");
      setSections([]);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 h-full">
      <div className="p-5 border-r-2 border-gray-400">
        <Title text={"add Question"} />
        <form className="space-y-3">
          <Input
            type={"text"}
            name={"question"}
            label={"question"}
            state={question}
            set={setQuestion}
          />
          {answers.map((answer, index) => (
            <div key={index} className="space-y-2">
              <Input
                type={"text"}
                name={`answer ${index + 1}`}
                label={`answer ${index + 1}`}
                state={answer}
                func={(e) => handleAnswerChange(index, e.target.value)}
              />
              <div
                className="flex items-center gap-2"
                onClick={() => setCorrectAnswerIndex(index)}
              >
                <div className="w-5 h-5 rounded border-[1px] border-black center">
                  {correctAnswerIndex === index && (
                    <span className="bg-primary w-4 h-4 rounded"></span>
                  )}
                </div>
                <span>Correct Answer</span>
              </div>
            </div>
          ))}
          <div className="pt-4 w-[60%] mx-auto">
            <Button text={"Add Question"} clickFunc={handleAddQuiz} />
          </div>
        </form>
      </div>
      <div className="p-5 border-r-2 border-gray-400 md:h-screen overflow-y-scroll space-y-3">
        <Title text={"Quiz"} />
        <div className="space-y-2">
          <Input selectBox set={setIdModule}>
            <option disabled selected={!id_module}>Select Module</option>
            {modules.map((m) => {
              if (
                roles.find(
                  (r) =>
                    r.module.id == m.id &&
                    r.teacher.id == user.id &&
                    r.permission === "W"
                )
              )
                return (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                );
            })}
          </Input>
          {sections.length > 0 && (
            <Input selectBox set={setIdSection}>
              <option disabled selected>
                Select Section
              </option>
              <option value={"null"}>New Section</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Input>
          )}
          {(!sections.length || id_section === "null") && id_module && (
            <Input
              type={"text"}
              name={"sectionName"}
              label={"new section"}
              state={section_name}
              set={setSectionName}
            />
          )}
          <Input
            type={"text"}
            name={"name"}
            label={"Quiz Name"}
            state={name}
            set={setName}
          />
        </div>
        {!Object.keys(quizzes).length ? (
          <div className="no-result text-center">No Questions Added</div>
        ) : (
          Object.keys(quizzes).map((q, index) => (
            <div
              key={quizzes[q].id}
              className="border-2 border-primary p-2 rounded-md shadow-sm bg-white"
            >
              <h1 className="font-semibold">
                {index + 1}- {quizzes[q].question}
              </h1>
              <ul>
                {quizzes[q].answers.map((a, index) => (
                  <li
                    key={index}
                    className={`${
                      index == quizzes[q].correctAnswerIndex && "text-green-600"
                    }`}
                  >
                    - {a}
                  </li>
                ))}
              </ul>
              <div className="w-1/3 mx-auto mt-3">
                <Button
                  danger
                  text={"Delete"}
                  clickFunc={() => handleDeleteQuiz(quizzes[q].id)}
                />
              </div>
            </div>
          ))
        )}
        {Object.keys(quizzes).length > 0 && (
          <Button text={"Add Quiz"} clickFunc={() => handleSaveQuizzes()} />
        )}
      </div>
    </div>
  );
}
