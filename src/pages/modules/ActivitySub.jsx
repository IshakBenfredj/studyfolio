import { useEffect, useState } from "react";
import Axios from "../../api";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import images from "../../constants/images";

export default function ActivitySub() {
  const { id_act } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSubmite = async () => {
      try {
        const { data } = await Axios.post("/get_submissions", {
          activity_id: id_act,
        });
        setSubmissions(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    handleSubmite();
  }, [id_act]);

  return (
    <div className="p-5 md:w-2/3 w-11/12 mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-gray-600 font-bold mb-3">
            {submissions[0].activity.name} &gt; Answers
          </h1>
          <div className="mt-4 bg-gray-200 w-full p-4 rounded-lg">
            {!submissions.length ? (
              <div className="no-result">No answers until Now</div>
            ) : (
              <>
                {submissions.map((s) =>
                  !s.mark ? (
                    <Link
                      target="_blank"
                      to={s.drive_link}
                      className="bg-white shadow p-2 flex items-center gap-2"
                      key={s.id}
                    >
                      <img src={images.devoir} alt="" className="w-10" />
                      <span>
                        {s.student.lname} {s.student.fname}
                      </span>
                    </Link>
                  ) : (
                    <div
                      className="bg-white shadow p-2 flex items-center gap-2"
                      key={s.id}
                    >
                      <img src={images.devoir} alt="" className="w-10" />
                      <span>
                        {s.student.lname} {s.student.fname}
                      </span>
                      <span className="font-bold text-2xl text-green-500 ml-6">
                        Mark: {s.mark}
                      </span>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
