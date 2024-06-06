/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/dataContext";
import Axios from "../../api";
import Loading from "../../components/loading/Loading";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import batches from "../../constants/batches";

export default function DashboardHome() {
  const { roles, students, teachers } = useContext(DataContext);

  const [loadingCharts, setLoadingCharts] = useState(true);
  const [data, setData] = useState([]);
  const [circleData, setCircleData] = useState({
    labels: [],
    datasets: [],
  });
  const [teachersData, setTeachersData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const handleGet = async () => {
      setLoadingCharts(true);
      try {
        const response = await Axios.get("/promo_counts");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoadingCharts(false);
    };
    handleGet();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const labels = data.map((d) => d.promo_name);

      const courseCount = {
        label: "Course Number",
        data: data.map((d) => d.Cours_Count),
        backgroundColor: [
          "#FF6384", // Pink
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Turquoise
          "#9966FF", // Purple
        ],
      };

      const datasets = [
        {
          label: "TP/TD Number",
          data: data.map((d) => d["TD/TP_Count"]),
          backgroundColor: [
            "#FF9F40", // Orange
            "#FF6384", // Pink
            "#36A2EB", // Blue
            "#FFCE56", // Yellow
            "#4BC0C0", // Turquoise
          ],
        },
        {
          label: "Activities Number",
          data: data.map((d) => d.Activity_Count),
          backgroundColor: [
            "#9966FF", // Purple
            "#FF9F40", // Orange
            "#FF6384", // Pink
            "#36A2EB", // Blue
            "#FFCE56", // Yellow
          ],
        },
      ];

      const teachersDataset = {
        label: "Teachers Number",
        data: data.map((d) => d.Teacher_Count),
        backgroundColor: [
          "#FF6384", // Pink
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Turquoise
          "#9966FF", // Purple
        ],
      };

      setCircleData({ labels, datasets: [courseCount, ...datasets] });
      setTeachersData({ labels, datasets: [teachersDataset] });
    }
  }, [data]);

  const teachersCountByBatch = batches.map((batch) => {
    const teachersInBatch = roles.filter(
      (role) => role.module.acronym === batch && role.type_charge === "COURS"
    );
    return teachersInBatch.length;
  });

  const [barData, setBarData] = useState({
    labels: batches,
    datasets: [
      {
        label: "Students Number",
        data: batches.map(
          (b) => students.filter((s) => s.group?.promo.name === b).length
        ),
        backgroundColor: [
          "#FF6384", // Pink
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Turquoise
          "#9966FF", // Purple
          "#FF9F40", // Orange
          "#C9CBCF", // Grey
          "#E7E9ED", // Light Grey
          "#9B59B6", // Amethyst
          "#F39C12", // Yellow-Orange
        ],
      },
    ],
  });

  return (
    <div className="p-6 relative h-screen w-full overflow-y-auto">
      <h1 className="text-center text-5xl font-bold text-primary mb-16 relative">
        StudyFolio Dashboard
      </h1>
      {loadingCharts ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 items-end">
            <div className="space-y-3">
              <p className="p-2 capitalize shadow border-l-4 border-primary bg-white font-semibold text-xl">
                students number is :{" "}
                <span className="font-bold text-primary">
                  {students.length}
                </span>
              </p>
              <Bar data={barData} />
            </div>
            <div>
              <Bar data={circleData} />
            </div>
          </div>
          <div className="space-y-3 w-1/3 mx-auto mt-4">
            <p className="p-2 capitalize shadow border-l-4 border-primary bg-white font-semibold text-xl">
              Teachers number is :{" "}
              <span className="font-bold text-primary">{teachers.length}</span>
            </p>
            <Doughnut data={teachersData} />
          </div>
        </>
      )}
    </div>
  );
}
