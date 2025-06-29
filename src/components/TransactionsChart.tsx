"use client";

import React, { useRef, useEffect, useState } from "react";
import type { ChartData, ChartArea } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { colors } from "@/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const createGradientColors = (
  ctx: CanvasRenderingContext2D,
  area: ChartArea
) => {
  const colorLow = colors.RED;
  const colorNeutal = colors.AMBER;
  const colorHigh = colors.GREEN;

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorLow);
  gradient.addColorStop(0.5, colorNeutal);
  gradient.addColorStop(1, colorHigh);

  return gradient;
};

const TransactionsChart = ({ data }: { data: ChartData }) => {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) return;

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        borderColor: createGradientColors(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  }, [data]);

  return (
    <Chart
      ref={chartRef}
      type="line"
      data={chartData}
      options={{
        aspectRatio: 2,
        plugins: {
          legend: {
            display: false,
          },
          filler: {
            propagate: true,
          },
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => `${Number(value) / 1000}K`,
            },
            grid: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  );
};

export default TransactionsChart;
