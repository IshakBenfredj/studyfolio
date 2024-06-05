import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../api";
import Loading from "../../components/loading/Loading";
import Quizzes from "./Quizzes";
import Tests from "./Tests";

export default function ActivityDetails() {
  const { id_act } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [rightAnswers, setRightAnswers] = useState([]);

  useEffect(() => {
    const getDetails = async () => {
      const { data } = await Axios.post("/get_activity", { id: id_act });
      setDetails(data);
      console.log(data);
      const answers = Object.keys(data.data).map((a) => ({
        userAnswer: "",
        rightAnswer: data.data[a].correctAnswerIndex,
      }));
      setRightAnswers(answers);
      setLoading(false);
    };
    getDetails();
  }, [id_act]);

  return (
    <div className="py-4">
      {loading ? (
        <Loading />
      ) : details.type === "quizz" ? (
        <Quizzes
          rightAnswers={rightAnswers}
          setRightAnswers={setRightAnswers}
          details={details}
        />
      ) : (
        <Tests details={details}/>
      )}
    </div>
  );
}
