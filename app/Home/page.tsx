"use client";

import AddNewListDialog from "@/components/AddNewListDialog";
import AddNewTaskDialog from "@/components/AddNewTaskDialog";
import CategoryChart from "@/components/CategoryChart";
import DueTasks from "@/components/DueTasks";
import OverdueTasks from "@/components/OverdueTasks";
import RecentlyAddedTasks from "@/components/RecentlyAddedTasks";
import Spinner from "@/components/Spinner";
import TaskCompleted from "@/components/TaskCompleted";
import UpcomingTasks from "@/components/UpcomingTasks";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function HomePage() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [redirecting, setRedirecting] = useState<boolean>(false);

  useEffect(() => {
    if (!user && !loading) {
      setRedirecting(true);
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || redirecting) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="flex flex-row gap-2 h-1/5 w-full">
        <div className="w-1/4">
          <TaskCompleted />
        </div>
        <div className="w-1/4">
          <DueTasks />
        </div>
        <div className="w-1/4">
          <OverdueTasks />
        </div>
        <div className="w-1/4 flex flex-col gap-4 items-center justify-center">
          <AddNewTaskDialog>
            <button className="bg-white border-2 border-black p-4 flex flex-row gap-2 w-full rounded shadow-lg hover:bg-gray-200 hover:font-bold font-semibold items-center justify-center">
              <Plus />
              Add new task
            </button>
          </AddNewTaskDialog>

          <AddNewListDialog>
            <button className="bg-white border-2 border-black p-4 flex flex-row gap-2 w-full rounded shadow-lg hover:bg-gray-200 hover:font-bold font-semibold items-center justify-center">
              <Plus />
              Add new list
            </button>
          </AddNewListDialog>
        </div>
      </div>
      <div className="flex flex-row h-4/5 pt-2">
        <div className="w-1/2 pr-1">
          <UpcomingTasks />
        </div>
        <div className="w-1/2 flex flex-col h-full pl-1">
          <div className="h-1/2">
            <CategoryChart />
          </div>
          <div className="h-1/2">
            <RecentlyAddedTasks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
