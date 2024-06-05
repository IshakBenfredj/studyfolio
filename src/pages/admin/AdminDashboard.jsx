/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { DataContext } from "../../context/dataContext";
import Axios from "../../api";
import Loading from "../../components/loading/Loading";
import { handleError, handleSuccess } from "../../utils/toastify";
import { MdDeleteForever } from "react-icons/md";
import images from "../../constants/images";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import batches from "../../constants/batches";

export default function DashboardHome() {
  const { promos, setPromos, students, loading } = useContext(DataContext);

  const [barData, setBarData] = useState({
    labels: batches,
    datasets: [
      {
        label: "Students Number",
        data: batches.map(
          (b) => students.filter((s) => s.group.promo.name === b).length
        ),
        backgroundColor: [
          "rgb(75,192,192,1)",
          "red",
          "#50AF95",
          "yellow",
          "orange",
        ],
      },
    ],
  });

  return (
    <div className="p-6 relative min-h-screen">
      <h1 className="text-center text-5xl font-bold text-primary mb-16 relative">
        StudyFolio Dashboard
      </h1>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="w-1/2 space-y-3">
            <p className="p-2 capitalize shadow border-l-4 border-primary bg-white font-semibold text-xl">
              students number is :{" "}
              <span className="font-bold text-primary">{students.length}</span>
            </p>
            <Bar data={barData} />
          </div>
        </div>
      )}
    </div>
  );
}
