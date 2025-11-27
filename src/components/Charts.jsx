// src/components/Charts.jsx
import React, { useMemo } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Charts({ transactions, chartType }) {

  const { pieData, barData } = useMemo(() => {

    const categories = {};
    transactions.forEach((t) => {
      if (t.type === "expense") {
        categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
      }
    });

    const pie = {
      labels: Object.keys(categories),
      datasets: [
        {
          label: "Expenses",
          data: Object.values(categories),
          backgroundColor: [
            "#21c67a",
            "#1e90ff",
            "#f1c40f",
            "#e74c3c",
            "#9b59b6"
          ],
          borderWidth: 1
        }
      ]
    };

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const bar = {
      labels: ["Income", "Expense"],
      datasets: [
        {
          label: "Total",
          data: [income, expense],
          backgroundColor: ["#21c67a", "#e74c3c"]
        }
      ]
    };

    return { pieData: pie, barData: bar };

  }, [transactions]);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1200,
    easing: "easeOutCubic"
  },
  plugins: {
    legend: {
      labels: {
        color: "#e6f1ff",
        font: {
          size: 13,
          weight: "bold"
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255,255,255,0.03)"
      },
      ticks: { color: "#999" }
    },
    y: {
      grid: {
        color: "rgba(255,255,255,0.03)"
      },
      ticks: { color: "#999" }
    }
  }
};

  if (chartType === "bar") {
    return <Bar data={barData} options={options} />;
  }

  if (chartType === "pie") {
    return <Pie data={pieData} options={options} />;
  }

  return null;
}
