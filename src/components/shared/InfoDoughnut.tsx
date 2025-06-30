"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const InfoDoughnut = ({ info }: { info: ChartData<"doughnut"> }) => {
  return (
    <Doughnut
      options={{
        aspectRatio: 1,
        cutout: 50,
        rotation: 180,
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      data={info}
    />
  );
};

export default InfoDoughnut;
