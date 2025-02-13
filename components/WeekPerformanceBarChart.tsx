import { Task } from "@/lib/types";
import React from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import { CheckDateBeforeDays } from "@/lib/utils/functions";

function WeekPerformanceBarChart({ tasks }: { tasks: Task[] }) {
  const completed: number[] = [];
  const missed: number[] = [];
  const labels: string[] = [];
  const curr = new Date().getTime();
  for (let i = 0; i < 7; i++) {
    completed.push(
      tasks.filter(
        (task) => CheckDateBeforeDays(task.dueDate, i) && task.status === true
      ).length
    );

    missed.push(
      tasks.filter(
        (task) => CheckDateBeforeDays(task.dueDate, i) && task.status === false
      ).length
    );

    labels.push(new Date(curr - i * 86400000).toLocaleDateString());
  }

  const uData = missed;
  const pData = completed;
  const xLabels = labels;

  return (
    <>
      <h1 className="text-2xl font-bold text-white text-center my-2">
        Week Performance
      </h1>
      <BarChart
        className="bg-gray-100 rounded"
        height={500}
        series={[
          { data: pData, label: "Completed Tasks", id: "pvId" },
          { data: uData, label: "Missed Tasks", id: "uvId" },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </>
  );
}

export default WeekPerformanceBarChart;
