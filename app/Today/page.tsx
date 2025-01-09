"use client";

import Spinner from "@/components/Spinner";
import TaskDetailedView from "@/components/TaskDetailedView";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypingAnimation from "@/components/ui/typing-animation";
import { useUserContext } from "@/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import { CheckCurrentDate } from "@/lib/utils/functions";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Today() {
  const { userData } = useUserContext();

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
    <ScrollArea className="h-full w-full">
      <div className="sticky top-0 bg-gray-700 bg-opacity-95 z-10 flex items-center justify-center py-2">
        <TypingAnimation className="text-gray-100 font-serif text-center">
          Your Tasks for Today:
        </TypingAnimation>
      </div>

      <div className="px-4">
        {userData && userData.tasks && userData.tasks.length > 0 ? (
          userData.tasks
            .filter((task) => CheckCurrentDate(task.dueDate))
            .sort((a, b) => Number(a.status) - Number(b.status))
            .map((task) => <TaskDetailedView key={task.taskId} task={task} />)
        ) : (
          <div className="mt-96 flex justify-center">
            <span className="text-2xl font-semibold">No Tasks for Today</span>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

export default Today;
