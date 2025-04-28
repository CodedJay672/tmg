"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const InfoDoughnut = ({ title, info }: { title: string; info: number[] }) => {
  const data = {
    labels: ["failed", "processing", "successful"],
    datasets: [
      {
        label: title,
        data: info,
        backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 205, 86)", "#4caf50"],
        hoverOffset: 4,
        rotation: 180,
        cutout: 20,
      },
    ],
  };

  return (
    <div className="flex gap-1">
      <div className="size-16">
        <Doughnut
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
          data={data}
        />
      </div>
      <div className="flex-1 ml-2 lg:ml-4 flex-center flex-col">
        {info.map((item, idx) => (
          <div key={idx} className="w-full flex items-center gap-2">
            <div className="p-1 rounded-full bg-primary" />
            <span className="text-xs text-dark-300 font-medium">
              {item} <span className="font-normal">completed</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoDoughnut;
