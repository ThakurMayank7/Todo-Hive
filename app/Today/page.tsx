"use client";

import Spinner from "@/components/Spinner";
import TaskDetailedView from "@/components/TaskDetailedView";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypingAnimation from "@/components/ui/typing-animation";
import { useUserContext } from "@/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
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
    <>
      <TypingAnimation className="font-serif text-center">
        Your Tasks for Today :
      </TypingAnimation>
      <ScrollArea className="">
        {userData && userData.tasks && userData.tasks.length > 0 ? (
          userData.tasks.map((task) => (
            <TaskDetailedView key={task.taskId} task={task} />
          ))
        ) : (
          <div className="mt-96">
            <span className="text-2xl font-semibold">No Tasks for Today</span>
          </div>
        )}
      </ScrollArea>
    </>
  );
}

export default Today;
