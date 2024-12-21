import React, { useCallback, useEffect, useState } from "react";
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
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
  initialYear?: string;
}

const SalesGraph = ({ vendorName, initialYear }: SalesGraphProps) => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [chartData, setChartData] = useState<{ month: string; totalQuantitySold: number }[]>([]);
  const [year, setYear] = useState(initialYear || currentYear.toString());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchChartData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}${orders.getMonthlySellingRatesByVendor(vendorName, year)}`
      );

      if (response.ok) {
        const data = await response.json();

        setChartData(data);
        setErrorMessage(null);
      } else {
        const error = await response.json();

        setChartData([]);
        setErrorMessage(error.message || "An error occurred while fetching the data.");
      }
    } catch {
      navigate("/error", { state: { message: "An unexpected error occurred." } });
    }
  }, [navigate, vendorName, year]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setYear(event.target.value);
  };

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

  const yearOptions = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

  return (
    <div>
      <Bar data={data} options={chartOptions} />
      <Box mt={3} display="flex" flexDirection="column" alignItems="center">
        {errorMessage && (
          <Typography color="error" variant="body2" gutterBottom>
            {errorMessage}
          </Typography>
        )}
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="body1" sx={{ mr: 2 }}>
            Select Year:
          </Typography>
          <Select
            value={year}
            onChange={handleYearChange}
            variant="outlined"
            size="small"
            sx={{ minWidth: 120 }}
          >
            {yearOptions.map(yearOption => (
              <MenuItem key={yearOption} value={yearOption}>
                {yearOption}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </div>
  );
};

export default React.memo(SalesGraph);
