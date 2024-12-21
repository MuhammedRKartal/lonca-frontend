import React, { useCallback, useEffect, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { orders } from "../urls";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SalesGraphProps {
  vendorName: string;
  year: string;
}

const SalesGraph = ({ vendorName, year }: SalesGraphProps) => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState<{ month: string; totalQuantitySold: number }[]>([]);

  const fetchChartData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}${orders.getMonthlySellingRatesByVendor(vendorName, year)}`
      );

      if (response.ok) {
        const data = await response.json();

        setChartData(data);
      } else {
        const error = await response.json();

        navigate("/error", { state: { code: error.code, message: error.message } });
      }
    } catch {
      navigate("/error", { state: { message: "An unexpected error occurred." } });
    }
  }, [navigate, vendorName, year]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: `Monthly Sales for ${vendorName} (${year})` },
    },
  };

  const data = {
    labels: chartData.map(item => item.month),
    datasets: [
      {
        label: "Total Quantity Sold",
        data: chartData.map(item => item.totalQuantitySold),
        backgroundColor: "rgba(46, 125, 50, 1)",
        borderColor: "rgba(46, 125, 50, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={chartOptions} />;
};

export default React.memo(SalesGraph);
