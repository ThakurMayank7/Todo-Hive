import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useUserContext } from "@/context/UserContext";
import { useAuth } from "@/hooks/useAuth";

function CategoryChart() {
  const { user } = useAuth();

  const { userData } = useUserContext();

  useEffect(() => {
    if (user && userData) {
      setData([]);
      userData.lists.forEach((list, index) => {
        const value: number = userData.tasks.filter(
          (task) => task.list === list && task.status === false
        ).length;

        setData((prev) => [
          ...prev,
          { id: Date.now() + index, value, label: list },
        ]);
      });
    }
  }, [user, userData]);

  const [data, setData] = useState<
    { id: number; value: number; label: string }[]
  >([]);

  return (
    <div className="flex items-center justify-center h-full">
      {data.length === 0 || data.filter((d) => d.value !== 0).length === 0 ? (
        <div className="flex items-center justify-center h-full w-full">
          <h1>No Active Tasks</h1>
        </div>
      ) : (
        <PieChart
          className="h-full w-full p-2"
          series={[
            {
              data: data,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
        />
      )}
    </div>
  );
}

export default CategoryChart;
